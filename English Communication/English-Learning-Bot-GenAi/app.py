from flask import Flask, request, jsonify, send_file, render_template, redirect, url_for
from gtts import gTTS
import whisper
from groq import Groq
from deep_translator import GoogleTranslator
import nltk
from nltk.corpus import wordnet
from datetime import date
import json
import os
import logging
import traceback
import tempfile
import time
import uuid
import re
import json5  # make sure to install this


# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

nltk.download('wordnet')

app = Flask(__name__)

# Load Whisper model
try:
    logger.info("Loading Whisper model...")
    model = whisper.load_model("base")
    logger.info("Whisper model loaded successfully")
except Exception as e:
    logger.error(f"Error loading Whisper model: {str(e)}")
    traceback.print_exc()

# Initialize Groq client
try:
    client = Groq(api_key="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")
except Exception as e:
    logger.error(f"Error initializing Groq client: {str(e)}")
    traceback.print_exc()

DATA_DIR = "data"
AUDIO_DIR = "audio_uploads"
GRAMMAR_FILE = os.path.join(DATA_DIR, "grammar_challenges.json")
VOCAB_FILE = os.path.join(DATA_DIR, "vocabulary_words.json")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Utility to extract the first JSON block from model response
def extract_json_from_text(text):
    try:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception as e:
        logger.error(f"Failed to parse JSON: {e}")
    return None

# Generate daily grammar challenge
def generate_grammar_challenge():
    try:
        messages = [
            {"role": "system", "content": "You are an English grammar teacher."},
            {"role": "user", "content": (
                "Give a daily English grammar MCQ. Respond ONLY with a JSON object (no markdown or explanation):\n"
                "{\n"
                "  \"question\": \"...\",\n"
                "  \"options\": {\"A\": \"...\", \"B\": \"...\"},\n"
                "  \"correct\": \"A\",\n"
                "  \"explanation\": \"...\"\n"
                "}"
            )}
        ]
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=messages
        )

        raw_content = response.choices[0].message.content.strip()
        logger.info(f"[DEBUG] Raw grammar response:\n{raw_content}")

        # Clean up model response
        cleaned_content = re.sub(r'```(?:json)?|```', '', raw_content).strip()

        # Extract JSON object using json5 for robustness
        json_match = re.search(r'{.*}', cleaned_content, re.DOTALL)
        if json_match:
            json_str = json_match.group()
            logger.info(f"[DEBUG] Extracted JSON:\n{json_str}")
            parsed = json5.loads(json_str)

            # Validate required keys
            for key in ['question', 'options', 'correct', 'explanation']:
                if key not in parsed:
                    raise ValueError(f"Missing key in JSON: {key}")
            return parsed
        else:
            raise ValueError("No JSON found in model response.")

    except Exception as e:
        logger.error(f"[ERROR] Failed to generate grammar challenge: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "question": "Which sentence is correct?",
            "options": {
                "A": "He do his homework every day.",
                "B": "He does his homework every day."
            },
            "correct": "B",
            "explanation": "He does is correct because in the third person singular form of 'do' we say 'does'."
        }


def generate_vocabulary_word():
    try:
        messages = [
            {"role": "system", "content": "You are an English tutor."},
            {"role": "user", "content": "Respond ONLY with a JSON object like this (no explanation):\n"
                                        "{\n"
                                        "  \"word\": \"...\",\n"
                                        "  \"part_of_speech\": \"...\",\n"
                                        "  \"meaning\": \"...\",\n"
                                        "  \"example_sentence\": \"...\"\n"
                                        "}"},
        ]
        response = client.chat.completions.create(model="llama3-70b-8192", messages=messages)
        content = response.choices[0].message.content.strip()
        logger.info(f"Raw vocab response:\n{content}")

        match = re.search(r'\{.*\}', content, re.DOTALL)
        if match:
            return json.loads(match.group())
        else:
            raise ValueError("No valid JSON found in response.")
    except Exception as e:
        logger.error(f"Error generating vocabulary word: {str(e)}")
        logger.error(traceback.format_exc())
        return {
            "word": "Exemplify",
            "part_of_speech": "verb",
            "meaning": "To show or illustrate by example.",
            "example_sentence": "She exemplified good behavior in the classroom."
        }


# Get or create today's challenges
def get_or_create_daily_challenges():
    today = str(date.today())

    if not os.path.exists(GRAMMAR_FILE):
        with open(GRAMMAR_FILE, "w") as f:
            json.dump({}, f)
    if not os.path.exists(VOCAB_FILE):
        with open(VOCAB_FILE, "w") as f:
            json.dump({}, f)

    with open(GRAMMAR_FILE, "r") as gf:
        grammar_data = json.load(gf)
    with open(VOCAB_FILE, "r") as vf:
        vocab_data = json.load(vf)

    updated = False

    if today not in grammar_data:
        grammar_data[today] = generate_grammar_challenge()
        updated = True
        logger.info(f"Generated new grammar challenge for {today}")

    if today not in vocab_data:
        vocab_data[today] = generate_vocabulary_word()
        updated = True
        logger.info(f"Generated new vocabulary word for {today}")

    if updated:
        with open(GRAMMAR_FILE, "w") as gf:
            json.dump(grammar_data, gf, indent=2)
        with open(VOCAB_FILE, "w") as vf:
            json.dump(vocab_data, vf, indent=2)

    grammar_today = grammar_data[today]
    grammar_today["options"] = list(grammar_today["options"].items())

    return grammar_today, vocab_data[today]


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/daily-challenges')
def daily_challenges():
    grammar_challenge, vocab_word = get_or_create_daily_challenges()
    return render_template('daily.html', grammar=grammar_challenge, vocab=vocab_word)

@app.route('/tts-page')
def tts_page():
    return render_template('tts.html')

@app.route('/tts', methods=['POST'])
def tts():
    try:
        text = request.form['text']
        tts = gTTS(text=text, lang='en')
        output_path = os.path.join(tempfile.gettempdir(), f"output_{uuid.uuid4().hex}.mp3")
        tts.save(output_path)
        return send_file(output_path, as_attachment=False)
    except Exception as e:
        logger.error(f"Error in TTS: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/chat-page')
def chat_page():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    file = request.files.get('audio')
    if not file:
        return jsonify({"feedback": "No audio file received."}), 400

    ext = ".webm" if file.filename.endswith(".webm") else ".wav"
    filepath = os.path.join(AUDIO_DIR, f"temp_audio_{uuid.uuid4().hex}{ext}")

    try:
        file.save(filepath)
        result = model.transcribe(filepath)
        user_input = result.get('text', '').strip()
        logger.info(f"Transcription result: {user_input}")

        if not user_input:
            return jsonify({"feedback": "Could not transcribe audio properly."}), 400

        messages = [
            {"role": "system", "content": """
            You are an advanced English grammar tutor.

            Return grammar feedback in this exact JSON format:
            {
            "grammar_issues": [
                {
                "error": "wrong phrase here",
                "correction": "corrected phrase here",
                "explanation": "explain why it's wrong in simple terms"
                }
            ]
            }

            Only reply with valid JSON. No extra text.
            If there are no issues, respond with:
            { "grammar_issues": [] }
            """},

            {"role": "user", "content": f"Please review this sentence: '{user_input}'"}
        ]

        response = client.chat.completions.create(model="llama3-70b-8192", messages=messages)
        raw_feedback = response.choices[0].message.content.strip()
        logger.info(f"Raw LLM output: {raw_feedback}")

        try:
            grammar_data = json.loads(raw_feedback)
        except json.JSONDecodeError:
            logger.warning("Failed to parse JSON from LLM output. Returning empty grammar issues.")
            grammar_data = {"grammar_issues": []}

        # Generate a paragraph summary for TTS
        if grammar_data["grammar_issues"]:
            para = ""
            for issue in grammar_data["grammar_issues"]:
                para += f"The phrase '{issue['error']}' should be '{issue['correction']}' because {issue['explanation']}. "
        else:
            para = "Great job! No grammar issues were found."

        tts = gTTS(text=para, lang='en')
        audio_filename = f"feedback_{uuid.uuid4().hex}.mp3"
        audio_path = os.path.join("static", "tts", audio_filename)
        os.makedirs(os.path.dirname(audio_path), exist_ok=True)
        tts.save(audio_path)

        return jsonify({
            "grammar_issues": grammar_data["grammar_issues"],
            "transcription": user_input,
            "audio_url": url_for('static', filename=f"tts/{audio_filename}")
        })

    except Exception as e:
        logger.error(f"Error processing chat: {str(e)}")
        traceback.print_exc()
        return jsonify({"feedback": f"Server error: {str(e)}"}), 500
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)


logger = logging.getLogger(__name__)

@app.route('/synonym-page')
def synonym_page():
    return render_template('synonym.html')


@app.route('/synonym', methods=['POST'])
def synonym():
    try:
        word = request.form['word'].strip().lower()
        synsets = wordnet.synsets(word)

        if not synsets:
            return jsonify({"error": f"No meanings found for '{word}'."}), 404

        results = []

        for syn in synsets:
            # Get the definition
            definition = syn.definition()

            # Get synonyms for this meaning (excluding duplicates and the queried word)
            synonyms = sorted(set(
                lemma.name().replace('_', ' ')
                for lemma in syn.lemmas()
                if lemma.name().lower() != word
            ))

            # Translate each synonym into Kannada
            kannada_synonyms = []
            for synonym in synonyms:
                try:
                    translated = GoogleTranslator(source='en', target='kn').translate(synonym)
                    kannada_synonyms.append(translated)
                except Exception as te:
                    kannada_synonyms.append("[Translation Error]")

            # Add to result
            results.append({
                "definition": definition,
                "english_synonyms": synonyms,
                "kannada_translations": kannada_synonyms
            })

        return jsonify({"word": word, "meanings": results})

    except Exception as e:
        return jsonify({"error": "Server error while processing synonyms."}), 500

chapters = {
    "Grammar": [
        {"title": "Parts of Speech", "lessons": [
            "Nouns", "Pronouns", "Verbs", "Adjectives", "Adverbs",
            "Prepositions", "Conjunctions", "Interjections"
        ]},
        {"title": "Tenses", "lessons": [
            "Present Tense", "Past Tense", "Future Tense"
        ]},
        {"title": "Sentence Structure", "lessons": [
            "Subject-Verb Agreement", "Simple, Compound, Complex Sentences", "Clauses"
        ]},
        {"title": "Articles and Determiners", "lessons": [
            "A, An, The", "Quantifiers, Demonstratives, Possessives"
        ]},
        {"title": "Voice and Narration", "lessons": [
            "Active and Passive Voice", "Direct and Indirect Speech"
        ]},
        {"title": "Conditionals", "lessons": [
            "Zero, First, Second, Third Conditionals", "Mixed Conditionals"
        ]},
        {"title": "Modal Verbs", "lessons": [
            "Can, Could, Should, Would, Must, Might, etc."
        ]},
        {"title": "Punctuation Rules", "lessons": [
            "Periods, Commas, Colons, Semicolons, etc."
        ]},
        {"title": "Common Grammar Mistakes", "lessons": [
            "Run-ons, Fragments, Misplaced Modifiers"
        ]}
    ],
    "Vocabulary": [
        {"title": "Daily Use Vocabulary", "lessons": [
            "Common Words", "Useful Phrases", "Everyday Expressions"
        ]},
        {"title": "Synonyms & Antonyms", "lessons": [
            "Common Synonyms", "Common Antonyms", "Usage Tips"
        ]},
        {"title": "Phrasal Verbs", "lessons": [
            "Phrasal Verbs with Get", "Phrasal Verbs with Take", "Phrasal Verbs with Make"
        ]},
        {"title": "Idioms & Expressions", "lessons": [
            "Common Idioms", "Business Idioms", "Idioms in Daily Speech"
        ]},
        {"title": "Collocations", "lessons": [
            "Verb-Noun Collocations", "Adjective-Noun Collocations", "Common Collocations"
        ]},
        {"title": "Homophones & Homonyms", "lessons": [
            "Frequently Confused Words", "Homophone Examples", "Homonym Examples"
        ]},
        {"title": "Commonly Confused Words", "lessons": [
            "There, Their, They're", "Its vs. It's", "Effect vs. Affect"
        ]},
        {"title": "Business Vocabulary", "lessons": [
            "Office Terms", "Business Communication", "Finance Vocabulary"
        ]},
        {"title": "Academic Vocabulary", "lessons": [
            "Formal Words", "Academic Phrases", "Writing Vocabulary"
        ]},
        {"title": "Slang & Informal Words", "lessons": [
            "Popular Slang", "Informal Phrases", "Do's and Don'ts"
        ]}
    ],
    "Spoken English": [
        {"title": "Greetings and Introductions", "lessons": [
            "Basic Greetings", "Introducing Yourself", "Asking About Others"
        ]},
        {"title": "Talking About Yourself", "lessons": [
            "Talking about Hobbies", "Talking about Family", "Talking about Work"
        ]},
        {"title": "Daily Conversations", "lessons": [
            "At the Store", "At a Restaurant", "At the Doctor"
        ]},
        {"title": "Expressing Opinions and Feelings", "lessons": [
            "Agreeing and Disagreeing", "Sharing Feelings", "Giving Reasons"
        ]},
        {"title": "Making Requests and Offers", "lessons": [
            "Polite Requests", "Offering Help", "Accepting and Declining"
        ]},
        {"title": "Asking and Answering Questions", "lessons": [
            "WH Questions", "Yes/No Questions", "Clarification Questions"
        ]},
        {"title": "Giving Directions and Instructions", "lessons": [
            "Asking for Directions", "Giving Directions", "Following Instructions"
        ]},
        {"title": "Agreeing and Disagreeing Politely", "lessons": [
            "Polite Disagreement", "Finding Common Ground", "Expressing Different Opinions"
        ]},
        {"title": "Debate and Discussion Practice", "lessons": [
            "Starting a Debate", "Making Arguments", "Concluding a Discussion"
        ]},
        {"title": "Telephone and Online Conversation Skills", "lessons": [
            "Answering Calls", "Leaving Messages", "Online Chat Etiquette"
        ]},
        {"title": "Interview and Presentation Skills", "lessons": [
            "Common Interview Questions", "Presentation Tips", "Body Language"
        ]}
    ]
}

@app.route('/lesson/<section>/<chapter>/', defaults={'lesson': None})
@app.route('/lesson/<section>/<chapter>/<lesson>')
def lesson_page(section, chapter, lesson):
    try:
        prompt = f"""
        You are an expert English tutor. Create a structured and beginner-friendly lesson on the topic: "{lesson}" under the section "{section}" and chapter "{chapter}".

        Respond ONLY with valid JSON (no markdown, no comments). Use this format:
        {{
            "title": "{lesson}",
            "objective": "A clear and concise learning goal (2–3 sentences).",
            "explanation": "A simple, detailed explanation with at least 200 words.",
            "examples": ["Example sentence 1", "Example sentence 2", "Example sentence 3", "Example sentence 4", "Example sentence 5"],
            "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
            "common_mistakes": [
                "Mistake 1: Correction and brief explanation.",
                "Mistake 2: Correction and brief explanation.",
                "Mistake 3: Correction and brief explanation."
            ],
            "mini_quiz": [
                {{
                    "question": "What is the correct usage of ___?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct_answer": "Option B"
                }},
                {{
                    "question": "Which sentence is grammatically correct?",
                    "options": ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
                    "correct_answer": "Sentence 2"
                }},
                {{
                    "question": "Fill in the blank: ___ is an example of ___",
                    "options": ["A", "B", "C", "D"],
                    "correct_answer": "C"
                }}
            ]
        }}
        """

        messages = [
            {"role": "system", "content": "You are a helpful English tutor."},
            {"role": "user", "content": prompt}
        ]

        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=messages,
            temperature=0.7
        )

        content = response.choices[0].message.content.strip()
        match = re.search(r'\{.*\}', content, re.DOTALL)
        if match:
            lesson_data = json.loads(match.group())
        else:
            raise ValueError("No valid JSON found in response.")

        return render_template("lesson.html", lesson=lesson_data, section=section, chapter=chapter)

    except Exception as e:
        logger.error(f"Failed to load lesson content: {str(e)}")
        traceback.print_exc()
        return render_template("lesson.html", error="Failed to load lesson content.", section=section, chapter=chapter, lesson=None)


@app.route('/chapters')
def chapters_page():
    return render_template('chapters.html', chapters=chapters)

if __name__ == '__main__':
    app.run(debug=True)

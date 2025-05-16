import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file
load_dotenv(dotenv_path=".env", override=True)

app = Flask(__name__)

# Configure CORS properly to allow requests from your React frontend
CORS(app, resources={r"/*": {"origins": "*"}})

# Get Gemini API key from environment
gemini_api_key = os.environ.get("GEMINI_API_KEY")
if not gemini_api_key:
    print("CRITICAL ERROR: GEMINI_API_KEY not found in environment variables. Chat functionality will be disabled.")
else:
    try:
        genai.configure(api_key=gemini_api_key)
        gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        print("Gemini model initialized successfully.")
        # print([m.name for m in genai.list_models()])
    except Exception as e:
        print(f"--- CRITICAL ERROR initializing Gemini: {str(e)} ---")

def get_hist_data(symbol):
    """Get historical stock data for a given symbol"""
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1y")
        # Reset index to get the Date as a column
        hist.reset_index(inplace=True)
        # Convert Date to string format to ensure JSON serializable
        hist['Date'] = hist['Date'].dt.strftime('%Y-%m-%d')
        return hist.to_dict(orient='records')
    except Exception as e:
        raise ValueError(f"Error fetching data for {symbol}: {str(e)}")

@app.route('/get_historical_data', methods=['GET'])
def get_historical_data():
    """API endpoint to get historical stock data"""
    print("--- /get_historical_data ENDPOINT HIT ---") # DEBUG
    symbol = request.args.get('symbol')
    if symbol is None:
        return jsonify({"status": "error", "message": "Symbol parameter is missing"}), 400
    
    try:
        historical_data = get_hist_data(symbol)
        return jsonify({"status": "success", "data": historical_data})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def chatwithbot(txt: str):
    """Process user input and get response from the language model"""
    print("chatwithbot function called with text: ", txt)
    if not gemini_api_key:
        return "[ERROR] Gemini API key not configured."
    try:
        response = gemini_model.generate_content(txt)
        # The Gemini SDK returns a response object; get the text content
        if hasattr(response, 'text'):
            return response.text
        elif hasattr(response, 'candidates') and response.candidates:
            return response.candidates[0].content.parts[0].text
        else:
            return "[ERROR] Gemini did not return a valid response."
    except Exception as e:
        print(f"Error in Gemini chatwithbot: {str(e)}")
        return f"[ERROR] Gemini error: {str(e)}"

@app.route('/api/llm/inference', methods=["POST"])
def inference():
    """API endpoint for chatbot interactions that matches the frontend's expected endpoint"""
    print("--- /api/llm/inference ENDPOINT HIT ---") # DEBUG
    try:
        # Get request data - handle both JSON and form data
        if request.is_json:
            data = request.get_json()
            user_text = data.get('message', '')
        else:
            user_text = request.form.get('message', '')
            
            # If no message found in form data, try to parse the request body as JSON
            if not user_text:
                try:
                    data = json.loads(request.data.decode('utf-8'))
                    user_text = data.get('message', '')
                except:
                    pass
        
        if not user_text:
            return jsonify({
                "status": "error", 
                "message": "Missing 'message' parameter"
            }), 400
        
        print(f"Received message: {user_text}")
        response = chatwithbot(user_text)
        response = response.strip()
        
        return jsonify({
            "status": "success",
            "text": response  # Changed to 'text' to match what the frontend expects
        })
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": f"Error processing request: {str(e)}"
        }), 500

# Keep the original endpoint for backward compatibility
@app.route('/chat', methods=["POST"])
def chat():
    print("--- /chat ENDPOINT HIT ---") # DEBUG
    try:
        user_text = "" # Initialize
        if request.is_json:
            data = request.get_json()
            user_text = data.get('text', '')
            print(f"--- Extracted user_text from JSON in /chat: '{user_text}' ---") 
        else:
            user_text = request.form.get('text', '')
            print(f"--- Extracted user_text from form in /chat: '{user_text}' ---")
        
        if not user_text:
            print("--- No user_text found in /chat ---") # DEBUG
            return jsonify({
                "status": "error", 
                "message": "Missing 'text' parameter"
            }), 400
        
        print(f"--- Calling chatwithbot with: '{user_text}' ---") # DEBUG
        response_content = chatwithbot(user_text)
        print(f"--- Response from chatwithbot: '{response_content}' ---") # DEBUG
        
        # response_content = response_content.strip() # Not needed if just echoing
        # last_inst_index = response_content.rfind("</s>") # Not needed
        # if last_inst_index != -1: # Check if found
        #     response_content = response_content[last_inst_index + len("</s>"):].strip()
        
        print(f"--- Final response to be sent: '{response_content}' ---") # DEBUG
        return jsonify({
            "status": "success",
            "response": response_content # This matches what llmslice.js expects for /chat
        })
    except Exception as e:
        print(f"--- CRITICAL ERROR in /chat route: {str(e)} ---") # DEBUG
        # Log the full traceback for more details
        import traceback
        print(traceback.format_exc())
        return jsonify({
            "status": "error", 
            "message": f"Error processing request: {str(e)}"
        }), 500

# Add endpoint for PDF handling
@app.route('/api/upload-pdf', methods=['POST'])
def upload_pdf():
    """API endpoint for handling PDF uploads"""
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        try:
            # Here you would process the PDF file
            # For now, just return a success message
            return jsonify({
                "status": "success",
                "message": f"PDF '{file.filename}' uploaded successfully"
            })
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": f"Error processing PDF: {str(e)}"
            }), 500
    else:
        return jsonify({
            "status": "error",
            "message": "Uploaded file is not a PDF"
        }), 400

if __name__ == '__main__':
    # In production, set debug=False
    is_production = os.environ.get('FLASK_ENV') == 'production'
    app.run(debug=not is_production, host='0.0.0.0', port=5000)
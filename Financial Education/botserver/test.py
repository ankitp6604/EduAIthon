import os
from dotenv import load_dotenv
from huggingface_hub import HfApi, InferenceClient # Ensure InferenceClient is imported

load_dotenv() 

token = os.environ.get("HUGGINGFACEHUB_API_TOKEN")
repo_id = "gpt2" # The model you are trying to use

if not token:
    print("HUGGINGFACEHUB_API_TOKEN not found in environment variables.")
else:
    print(f"Using token (first 10 chars): {token[:10]}...") 

    # Test 1: Get model info using HfApi
    try:
        print(f"\nAttempting to fetch model info for {repo_id} using HfApi...")
        api = HfApi()
        model_info = api.model_info(repo_id=repo_id, token=token)
        print(f"Successfully fetched model info for {repo_id}:")
        print("Model ID from HfApi:", model_info.modelId)
    except Exception as e:
        print(f"Error fetching model info for {repo_id} using HfApi: {e}")

    # Test 2: Basic inference using InferenceClient
    # This is a more direct test of what HuggingFaceEndpoint might be doing.
    try:
        print(f"\nAttempting basic inference with {repo_id} using InferenceClient...")
        # You can explicitly pass the model to the client or set it as default
        # client = InferenceClient(token=token) 
        # response = client.text_generation("Hello, who are you?", model=repo_id, max_new_tokens=10)
        
        # Or initialize client directly with the model
        client = InferenceClient(model=repo_id, token=token)
        response = client.text_generation("Hello, who are you?", max_new_tokens=10)

        print("InferenceClient response:", response)
        print("InferenceClient test successful!")
    except Exception as e:
        print(f"Error during basic inference with {repo_id} using InferenceClient: {e}")

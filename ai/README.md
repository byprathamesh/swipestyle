# AI Scripts

This directory contains Python scripts for AI-powered features such as outfit generation and virtual try-on.

## Scripts

- `sample_outfit_generator.py`: A sample script demonstrating how to call AI APIs (e.g., OpenArt AI, Replicate.com) for outfit generation or virtual try-on. 

## Setup

1.  Install Python 3.
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install required libraries:
    ```bash
    pip install -r requirements.txt 
    ```
    (You will need to create a `requirements.txt` file with libraries like `openartapi`, `replicate`, `python-dotenv`)
4.  Set your API keys as environment variables (e.g., in a `.env` file):
    ```
    OPENART_API_KEY="your_openart_api_key"
    REPLICATE_API_TOKEN="your_replicate_api_token"
    ```

## Running Scripts

```bash
python sample_outfit_generator.py
``` 
(Details about available AI scripts and how to run them will be added here.) 
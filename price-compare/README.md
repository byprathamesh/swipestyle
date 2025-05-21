# Price Comparison Scripts

This directory contains Python scripts for price scraping and comparison logic.

## Scripts

- `sample_price_scraper.py`: A sample script demonstrating how to fetch product prices (e.g., using SerpAPI) and deals (e.g., Cuelinks) and rank them.

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
    (You will need to create a `requirements.txt` file with libraries like `google-search-results`, `requests`, `python-dotenv`)
4.  Set your API keys as environment variables (e.g., in a `.env` file):
    ```
    SERPAPI_API_KEY="your_serpapi_api_key"
    CUELINKS_API_KEY="your_cuelinks_api_key"
    ```

## Running Scripts

```bash
python sample_price_scraper.py
``` 
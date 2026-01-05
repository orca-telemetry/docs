#!/bin/bash

# IndexNow API submission script
# Usage: ./indexnow.sh <url1> <url2> <url3> ...
# Example: ./indexnow.sh "https://www.orc-a.io/blog/new-post"

# Configuration
HOST="www.orc-a.io"
API_KEY="2176be2d9b3348e8820fed62a2997e3f"
KEY_LOCATION="https://www.orc-a.io/2176be2d9b3348e8820fed62a2997e3f.txt"

# Check if URLs were provided
if [ $# -eq 0 ]; then
    echo "Error: No URLs provided"
    echo "Usage: $0 <url1> [url2] [url3] ..."
    echo ""
    echo "Examples:"
    echo "  $0 \"https://www.orc-a.io/blog/new-post\""
    echo "  $0 \"https://www.orc-a.io/docs/quickstart\" \"https://www.orc-a.io/docs/api\""
    exit 1
fi

# Get URLs from command line arguments
URLS=("$@")

# Convert URL array to JSON format
url_json=$(printf ',"%s"' "${URLS[@]}")
url_json="[${url_json:1}]"

# Create JSON payload
json_payload=$(cat <<EOF
{
  "host": "$HOST",
  "key": "$API_KEY",
  "keyLocation": "$KEY_LOCATION",
  "urlList": $url_json
}
EOF
)

echo "Payload:"
echo "$json_payload"
echo ""
echo "Submitting ${#URLS[@]} URL(s) to IndexNow..."
echo ""

# Submit to IndexNow API via Bing (follow redirects)
response=$(curl -L -s -w "\n%{http_code}" -X POST \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$json_payload" \
    "https://www.bing.com/indexnow")

# Parse response
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

# Display result
echo "HTTP Status: $http_code"
if [ "$http_code" = "200" ]; then
    echo "✓ URLs successfully submitted to IndexNow"
    echo ""
    echo "Submitted:"
    for url in "${URLS[@]}"; do
        echo "  - $url"
    done
elif [ "$http_code" = "202" ]; then
    echo "✓ URLs accepted for processing"
    echo ""
    echo "Submitted:"
    for url in "${URLS[@]}"; do
        echo "  - $url"
    done
else
    echo "✗ Submission failed"
    echo "Response body: $body"
    exit 1
fi

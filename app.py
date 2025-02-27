from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
import requests
import os

load_dotenv

app = Flask(__name__)
CORS(app)

AVIATIONSTACK_API_URL = "http://api.aviationstack.com/v1"
API_KEY = os.getenv('API_KEY')

@app.route('/')
def home():
    return "Welcome to the Flight Tracker API! Use the /flights endpoint to search for flights."

@app.route('/flights', methods=['GET'])
def get_flights():
  airline = request.args.get('airline') # get airline code from query params
  params = {
        'access_key': API_KEY,
        'airline_name': airline,
        'flight_status': 'active'  # fetch only active flights
    }
  response = requests.get(f"{AVIATIONSTACK_API_URL}/flights", params=params)
  if response.status_code != 200:
     return jsonify({"error": "Failed to fetch data from AviationStack"}), 500
  data = response.json()
  return jsonify(data['data'])

if __name__ == '__main__':
  app.run(debug=True)
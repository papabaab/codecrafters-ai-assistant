#!/bin/bash

# Navigate to the backend folder
cd api

# Install dependencies
npm install

# Start the backend service
node dist/main.js &

# Navigate to the ai-assistant folder
cd ../ai

# Install dependencies
npm install

# Start the ai-assistant service
node dist/main.js 


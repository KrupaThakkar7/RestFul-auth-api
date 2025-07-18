# Use base image with Node.js
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

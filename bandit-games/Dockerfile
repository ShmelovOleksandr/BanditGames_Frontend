# Base image for Node.js
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose Vite's default development server port
EXPOSE 5173

# Command to start Vite in dev mode
CMD ["npm", "run", "dev"]

# Stage 1: Build the React application
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React application
FROM node:18

# Set working directory
WORKDIR /app

# Install a lightweight HTTP server (Express.js)
RUN npm install express

# Copy the build output from the first stage
COPY --from=build /app/build ./build

# Copy a minimal server script
COPY server.js .

# Expose port 3000 for the React app
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

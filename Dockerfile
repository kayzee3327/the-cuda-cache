# Use Node 20 as the base image (matches your GitHub Actions workflow)
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (optimizes Docker build caching)
COPY package*.json ./

# Clean install dependencies
RUN npm ci

# Expose the port Docusaurus uses
EXPOSE 3001
EXPOSE 3000

# Start the development server. 
# --host 0.0.0.0 allows access from outside the container.
# --poll 1000 forces file polling (essential for Windows volume mounts to detect file changes).
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "3001", "--poll", "1000"]
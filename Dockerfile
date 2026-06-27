# 1. Base Image: Use Node.js version 22 (Alpine Linux is used because it's lightweight and secure)
FROM node:22-alpine

# 2. Set Working Directory: Define where the app code will live inside the container
WORKDIR /usr/src/app

# 3. Copy package metadata: Copy package.json and package-lock.json first.
# This is a Docker optimization! Docker caches layers; if package.json hasn't changed, 
# Docker will skip running 'npm install' on subsequent builds.
COPY package*.json ./

# 4. Install dependencies: Run npm install inside the container environment
RUN npm install

# 5. Copy Source Code: Copy all local files (except those listed in .dockerignore) into the container
COPY . .

# 6. Expose Port: Inform Docker that the container listens on port 5000 at runtime
EXPOSE 5000

# 7. Command: Define the default command to execute when the container starts
CMD ["npm", "start"]

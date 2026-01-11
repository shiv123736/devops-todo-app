# 1 The Base Imaage (The OS + Node.js)
FROM node:20-alpine

# 2 Set the Working Directory inside the container
WORKDIR /app

# 3 Copy package.json and package-lock.json to the Working Directory
COPY package*.json ./

# 4 Install the dependencies
RUN npm install

# 5 Copy the rest of the application code to the Working Directory
COPY . .

# 6 Build the TypeScript code -> JavaScript
RUN npm run build

# 7 Expose the port the app runs on
EXPOSE 3000

# 8 Start the application
CMD ["npm", "start"]
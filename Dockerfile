# STAGE 1: The Builder (Name it 'builder')
# 1 The Base Imaage (The OS + Node.js)
FROM node:20-alpine As builder

# 2 Set the Working Directory inside the container
WORKDIR /app

# 3 Copy package.json and package-lock.json to the Working Directory
COPY package*.json ./

# 4 Install the dependencies
RUN npm install

# 5 Copy the rest of the application code to the Working Directory
COPY . .

RUN npx prisma generate

# 6 Build the TypeScript code -> JavaScript
RUN npm run build


# STAGE 2: The Production Runner
# Production stage
FROM node:20-alpine AS runner

# Set the Working Directory inside the container
WORKDIR /app

# Install OpenSSL so Prisma can run on Alpine
RUN apk add --no-cache openssl

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Install only production dependencies
RUN npm install --only=production

# 7 Expose the port the app runs on
EXPOSE 3000

# 8 Start the application
#CMD ["npm", "start"]

# Run the compiled JavaScript code
CMD ["node", "dist/server.js"]
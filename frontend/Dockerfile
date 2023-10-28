# Use Node 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the code
COPY . ./

# Expose port 5173
EXPOSE 5173

# Run the application
CMD ["yarn", "dev", "--host"]
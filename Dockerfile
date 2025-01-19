# Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY . .
RUN npm install 
RUN npm run build

# Use Nginx for serving the built React app
FROM nginx:alpine

# Copy the built React files to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
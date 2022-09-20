FROM node:14

# Create app directory
#RUN mkdir -p /usr/src/app

# Set working directory
#WORKDIR /usr/src/app

# Copy package.json and package-lock.json
#COPY package*.json /

# Install dependencies
#RUN npm install

# Copy app source code
#COPY . .

# Expose port 3000
#EXPOSE 3000

#Start app
#CMD [ "npm", "run","build", "&&", "npm", "run","start" ]
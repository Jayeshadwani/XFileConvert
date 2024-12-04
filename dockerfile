# Use AWS Lambda base image for Node.js 18
FROM public.ecr.aws/lambda/nodejs:18

# Set working directory inside the container
WORKDIR /var/task

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# Define the Lambda function handler file
CMD ["server.handler"]

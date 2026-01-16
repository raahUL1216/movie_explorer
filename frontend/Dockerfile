# Build Stage
FROM node:22.0.0-alpine AS build

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Quality Gate 1: Linting
RUN npm run lint

# Quality Gate 2: Running Vitest in CI mode
RUN npm run test

RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Use the requested Node 22.0.0 alpine version
FROM node:22.0.0-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# RUN ES LINT: This acts as a quality gate
RUN npm run lint

RUN npm run build

FROM nginx:alpine
# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html

# ADD THIS: Copy your custom nginx config to prevent 404s on refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
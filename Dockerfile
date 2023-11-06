# Build stage and installation Prep.
FROM node:18-alpine AS builder
# Env variable
ARG REACT_APP_GRAPHQL_API
ENV REACT_APP_GRAPHQL_API $REACT_APP_GRAPHQL_API
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

# Serving the app via the imgae from nginx
FROM nginx:1.25.3
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM node:16.17.0-alpine as BUILDER

WORKDIR /app
COPY . .
RUN npm install --prod

FROM node:16.17.0-alpine
WORKDIR /app
COPY --from=BUILDER /app .

ENV DB_HOST=db

ENV PORT=8000
EXPOSE 8000

CMD [ "npm", "start"]
FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm install --production

COPY backend ./ 
COPY frontend ../frontend

EXPOSE 5000

CMD ["npm", "start"]
# Geliştirme ortamı için Node.js
FROM node:20-alpine

WORKDIR /app

# Bağımlılıkları yükle
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli

# Kodları kopyala
COPY . .

# 4200 portunu aç
EXPOSE 4200

# Hot Reload (Canlı Güncelleme) ile çalıştır
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
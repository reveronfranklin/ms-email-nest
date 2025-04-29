# Usa una imagen oficial de Node.js
FROM node:22.15-alpine

# Instalar el paquete tzdata (contiene las zonas horarias)
RUN apk add --no-cache tzdata

# Establecer la zona horaria de Caracas
ENV TZ=America/Caracas
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Puerto expuesto (debe coincidir con el PORT del .env)
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
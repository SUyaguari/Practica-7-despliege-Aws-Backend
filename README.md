# Backend - Gestion de empleados

API REST para gestionar empleados usando Node.js, Express, TypeScript, MongoDB y Mongoose.

## Requisitos

- Node.js 20.6 o superior. El proyecto usa `--env-file-if-exists` para cargar variables desde `.env`.
- npm
- Una base de datos MongoDB disponible, local o en MongoDB Atlas.

## Configuracion inicial

1. Instala las dependencias:

```bash
npm install
```

2. Crea tu archivo de variables de entorno.

El archivo `.env` ya esta ignorado por Git para evitar exponer credenciales. Si necesitas recrearlo, copia `.env.example` y reemplaza los valores:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Configura las variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/usuarios_db?retryWrites=true&w=majority&appName=Cluster0
```

## Levantar el proyecto

Para ejecutar el servidor en modo desarrollo con recarga automatica:

```bash
npm run dev
```

Por defecto, la API queda disponible en:

```text
http://localhost:3000/api/v1
```

## Ejecutar pruebas

```bash
npm test
```

## Scripts disponibles

- `npm run dev`: levanta el servidor en modo desarrollo y carga `.env`.
- `npm start`: levanta el servidor sin modo watch y carga `.env`.
- `npm test`: ejecuta las pruebas unitarias con Jest.

## Notas de seguridad

- No subas el archivo `.env` al repositorio.
- Comparte solamente `.env.example`, porque no contiene credenciales reales.
- Si una credencial ya fue expuesta publicamente, cambiala en MongoDB Atlas y actualiza el `.env` local.

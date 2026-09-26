// src/config/database.ts
import dns from 'node:dns';
import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('La variable de entorno MONGO_URI no esta configurada');
    }

    await mongoose.connect(mongoUri);
    console.log('[Database]: Conexion exitosa a MongoDB');
  } catch (error) {
    console.error('Error critico al conectar a la base de datos:', error);
    process.exit(1);
  }
};

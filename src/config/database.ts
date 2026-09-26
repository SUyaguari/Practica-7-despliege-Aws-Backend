// src/config/database.ts
import dns from 'node:dns';
import mongoose from 'mongoose';
import { notifySlack } from '../utils/slack-notifier.js';

let databaseListenersRegistered = false;

const getAppName = (): string => process.env.APP_NAME || 'backend';

const registerDatabaseEventNotifications = (): void => {
  if (databaseListenersRegistered) {
    return;
  }

  databaseListenersRegistered = true;

  mongoose.connection.on('disconnected', () => {
    const message = `[${getAppName()}] ALERTA: MongoDB se desconecto`;
    console.error(`[Database]: ${message}`);
    void notifySlack(message);
  });

  mongoose.connection.on('error', (error) => {
    const message = `[${getAppName()}] ERROR: MongoDB reporto un error - ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error(`[Database]: ${message}`);
    void notifySlack(message);
  });
};

export const connectDatabase = async (): Promise<void> => {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  registerDatabaseEventNotifications();

  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('La variable de entorno MONGO_URI no esta configurada');
    }

    await mongoose.connect(mongoUri);
    const message = `[${getAppName()}] OK: Conexion exitosa a MongoDB`;
    console.log(`[Database]: ${message}`);
    void notifySlack(message);
  } catch (error) {
    console.error('Error critico al conectar a la base de datos:', error);
    await notifySlack(
      `[${getAppName()}] CRITICO: No se pudo conectar a MongoDB - ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    process.exit(1);
  }
};

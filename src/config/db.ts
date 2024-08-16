import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
  try {
    // Creamos una conecxión con el método de mongoose connect() y le pasamos la string de conexión de MongoDB
    const {connection} = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.bgBlue.bold(`MongoDB conectado en: ${url}`));
  } catch (error) {
    console.log(colors.bgRed.bold('Error al conectar a MongoDB'));
    // Le pedimos al proceso que salga con exit() pasandole 1 para indicarle que finalizó incorrectamente.
    exit(1);
  }
};
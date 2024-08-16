import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db';
import { corsMiddleware } from './config/cors';
import clientRoutes from './routes/clientRoutes';

// Llamamos la dependencia de dotenv para usarla en la API.
dotenv.config();
// Conexión a la Base de Datos
connectDB();

// Inicializamos la aplicación instanciandolo con express()
const app = express();

// Configuración de CORS
app.use(corsMiddleware());

// Para registrar todas las llamadas de la API utilizamos esta dependencia llamada Morgan, a la que le pasamos 'dev' para indicarle el formato que queremos usar.
app.use(morgan('dev'));

// Habilitar con express la lectura de datos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Definir las rutas
app.use('/api/clients', clientRoutes);

// Exportar la app
export default app;
// import { CorsOptions } from "cors";
import cors from 'cors';

// // Vamos a definir un objeto de configuración para el cors, en el que vamos a definir una lista de origenes permitidas para las peticiones, que va a inicializar con las url's permitidas por la aplicación.
// export const corsConfig: CorsOptions = {
//   // origin nos permite establecer el arreglo de origenes permitidos para las peticiones.
//   origin: function (origin, callback) {
//     // Definimos la lista de origenes permitidos.
//     const whiteList = [process.env.FRONTEND_URL];

//     // Revisamos si existe la bandera que establecimos en el script del package, con el que revisaremos si estamos en desarrollo, para permitir el origen indefinido.
//     if (process.argv[2] === '--api') {
//       whiteList.push(undefined);
//     }

//     // Ahora revisamos que la lista de origenes permitidos contenga el origen que está haciendo la petición. En caso de ser afirmativo, usamos el callback para decirle que no hay error, y que está autorizado.
//     if (whiteList.includes(origin)) {
//       callback(null, true);
//     } else {
//       // En el caso de que no sea un origen autorizado, lanzamos un error
//       callback(new Error('Error de CORS'));
//     }
//   }
// };


const ACCEPTED_ORIGINS = [
  process.env.FRONTEND_URL
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // CORS

    if (acceptedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(origin);

    if (!origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
});
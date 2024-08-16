import colors from 'colors';
import server from './server';

// Creamos el puerto que usaremos para el servidor.
const port = process.env.PORT || 4000;

// Importamos la instancia de express con la información que configuramos para el servidor, y lo ponemos a escuchar con el método listen(). Le pasamos el puerto que definimos y una función con un mensaje de conexión exitosa.
server.listen(port, () => {
  console.log(colors.bgBlack.bold(`Aplicación funcionando en el puerto: ${port}`));
});
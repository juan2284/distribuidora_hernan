import {Request, Response, NextFunction} from 'express';
import Client, { IClient } from '../models/Client';

// Para poder almacenar información en la request, debemos modificar el interface de la request, agregando el campo que vamos a anexar, tipandolo con el interface que creamos en el modelo.
declare global {
  namespace Express {
    interface Request {
      client: IClient
    }
  }
}

// Con este middleware vamos a verificar que el cliente existe en la BDD. 
export async function clientExists(req: Request, res: Response, next: NextFunction) {
  try {

    // Capturamos el ID del cliente, que se pasa en la URL
    const { clientId } = req.params;
    // Ubicamos el cliente usando su ID
    const client = await Client.findById(clientId);

    // Si no existe el cliente, devolvemos un status de error con un mensaje. Si existe lo almacenamos en la request de la petición.
    if (!client) {
      const error = new Error('Cliente no encontrado');
      return res.status(404).json({error: error.message});
    }
    req.client = client;
    next();
  } catch (error) {
    res.status(500).json({error: 'Ha ocurrido un error'})
  }
}
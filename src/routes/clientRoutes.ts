import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { ClientController } from "../controllers/ClientController";
import { clientExists } from '../middlewares/client';
// import uploadMiddleware from "../middlewares/multer";

// Definir el router de Express
const router = Router();
// Ruta para crear clientes
router.post('/', 
  // Validación
  body('telephone')
    .notEmpty().withMessage('El teléfono del cliente es obligatorio'),
  body('service_date')
    .notEmpty().withMessage('Debe indicar la fecha del servicio'),
  // Manejo de los errores de validación
  handleInputErrors,

  // Controller
  ClientController.createClient
);

// Ruta para carga masiva
// router.post('/massive',
//   uploadMiddleware,
//   ClientController.massiveClient
// );

// Ruta para obtener los clientes
router.get('/', ClientController.getAllClients);

// Ruta para obtener los recordatorios
router.get('/reminders', ClientController.getReminders);

// Ruta para obtener los contactos
router.get('/contacts', ClientController.getContacts);

// Ruta para obtener un cliente por ID
router.get('/:clientId',
  param('clientId').isMongoId().withMessage('Id no válido'),
  handleInputErrors,
  ClientController.getClientById
);

// Ruta para obtener los registros de un cliente por teléfono
router.get('/search/:telephone', ClientController.getClientByTelephone);

// Usamos el middleware que creamos para verificar si el cliente que estamos buscando existe. Se aplicará en las rutas que contengan el parámetro clientId
router.param('clientId', clientExists);

// Ruta para eliminar un cliente con su id
router.delete('/:clientId',
  param('clientId').isMongoId().withMessage('ID no válido'),
  handleInputErrors,
  ClientController.deleteClient
);

// Ruta para actualizar un cliente por ID
router.put('/:clientId',
  param('clientId').isMongoId().withMessage('ID no válido'),
  body('telephone')
    .notEmpty().withMessage('El teléfono del cliente es obligatorio'),
  handleInputErrors,
  ClientController.updateClient
);

// Ruta para actualizar el contacto de un cliente
router.patch('/:clientId/contact',
  param('clientId').isMongoId().withMessage('ID no válido'),
  body('contact')
    .notEmpty().withMessage('Es necesario indicar un motivo de contacto.'),
  handleInputErrors,
  ClientController.updateContact
);

export default router;
import { Request, Response } from "express";
import xlsx from 'xlsx';
import Client, { IClient } from "../models/Client";
import Contact from "../models/Contact";

export class ClientController {
  static createClient = async (req: Request, res: Response) => {
    const client = new Client(req.body);
    const fecha_servicio = Date.parse(req.body.service_date) + 4 * 60 * 60 * 1000;
    client.service_date = new Date(fecha_servicio);

    try {
      await client.save();
      res.send('Cliente creado correctamente.');
    } catch (error) {
      console.log(error);
    }
  };

  static getAllClients = async (req: Request, res: Response) => {
    // const page = req.query.page;
    // const cantData = 25;

    try {
      const clients = await Client.find().select('-contact, -__v -createdAt -updatedAt').sort('-createdAt');
      // const clients = await Client.find().skip(cantData * (Number(page) - 1)).limit(cantData);
      
      res.json(clients);
    } catch (error) {
      console.log(error);
    }
  };

  static getContacts = async (req: Request, res: Response) => {
    try {
      const contactos = await Contact.find().sort('-createdAt').select('-updatedAt').populate('client');
      
      res.json(contactos);
    } catch (error) {
      console.log(error);
    }
  };

  static getReminders = async (req: Request, res: Response) => {
    const fecha = Date.now();
    const twoMonths = 61*24*60*60*1000;

    try {
      const reminders = await Client.find()
        .select('-__v -createdAt -updatedAt')
        .where('contact')
        .equals('-')
        .where('service_date')
        .lte(fecha - twoMonths);

      res.json(reminders);
    } catch (error) {
      console.log(error);
    }
  };

  // static getCantClients = async (req: Request, res: Response) => {
  //   try {
  //     const cantClients = await Client.find().estimatedDocumentCount();
      
  //     res.json(cantClients);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  static getClientById = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    try {
      const client = await Client.findById(clientId);
      if (!client) {
        const error = new Error('Cliente no encontrado');
        return res.status(404).json({error: error.message});
      }
      res.json(client);
    } catch (error) {
      console.log(error);
    }
  };

  static getClientByTelephone = async (req: Request, res: Response) => {
    const { telephone } = req.params;
    try {
      const results = await Client.find({telephone}).select('_id name last_name telephone vehicle type_oil brand_oil filter mileage service_date');
      if (!results) {
        const error = new Error('Cliente no encontrado');
        return res.status(404).json({error: error.message});
      }
      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }

  static deleteClient = async (req: Request, res: Response) => {
    try {
      await req.client.deleteOne();
      res.send('Cliente Eliminado');
    } catch (error) {
      console.log(error);
    }
  };

  static updateClient = async (req: Request, res: Response) => {
    try {
      req.client.name = req.body.name;
      req.client.last_name = req.body.last_name;
      req.client.telephone = req.body.telephone;
      req.client.vehicle = req.body.vehicle;
      req.client.type_oil = req.body.type_oil;
      req.client.brand_oil = req.body.brand_oil;
      req.client.filter = req.body.filter;
      req.client.mileage = req.body.mileage;

      await req.client.save();
      res.send('Cliente actualizado');
    } catch (error) {
      console.log(error);
    }
  };

  static updateContact = async (req: Request, res: Response) => {
    try {
      req.client.contact = req.body.contact;

      // Elaborar el objeto para guardar el contacto
      const datosContacto = {
        client: req.client.id,
        result: req.body.contact
      }
      const contacto = new Contact(datosContacto);

      await Promise.allSettled([req.client.save(), contacto.save()]);
      res.send('Contacto Actualizado');
    } catch (error) {
      console.log(error);
    }
  };

  // Función para agregar datos amsivamente. No he podido hacerlo funcionar en la vista. Sin embargo lo voy a dejar porque puedo ejecutarlo para añadir los datos desde thunder
  static massiveClient = async (req: Request, res: Response) => {
    // Pasar esto a un util
    const filePath = req.file.path;
    const excel = xlsx.readFile(filePath);

    const nombreHojas = excel.SheetNames;
    const datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHojas[0]]);

    // Agregar una validación para revisar si ya está cargado el cliente

    try {
      for (let i = 0; i < datos.length; i++) {
        // Instanciar al cliente
        const client: IClient = new Client(datos[i]);
        await client.save();
      }
      res.json({msg: 'Registros cargados.', cant: datos.length});
    } catch (error) {
      console.log(error);
    }
  };

}
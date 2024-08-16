import { Request, Response, NextFunction } from "express";
import multer from "multer";
import multerUpload from "../utils/cargaArchivo";

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const upload = multerUpload.single('carga');

  upload(req, res, function (error) {
      if (error instanceof multer.MulterError) {
        const error = new Error('Solo se pueden cargar archivos en formato .xls, .xlsx y .csv.');
        res.json({error: error.message});
        next(error);
      } else if (error) {
        console.log(error);
        next(error);
      }
      next();
    }
  );
};

export default uploadMiddleware;
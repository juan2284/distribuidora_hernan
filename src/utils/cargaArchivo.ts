import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath,  } from 'url';

// Definir las opciones para Multer
const CURRENT_DIR = require.main.path;
// Definir array con los mimetypes permitidos
const MIMETYPES = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

const multerUpload = multer({
  // Definir las configuraciones de Multer
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(CURRENT_DIR, '/cargas/'));
    },
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}${fileExtension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Solo se pueden cargar archivos en formato .xls, .xlsx y .csv.'));
  },
  limits: {
    fileSize: 2000000
  }
});

export default multerUpload;
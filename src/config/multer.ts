import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { S3 } from 'aws-sdk';
import multerS3 from 'multer-s3';

const storageTypes = {
  local: diskStorage({
    destination: './upload',
    filename: (_, file, cb) => {
      const { originalname } = file;
      const filename = `${Date.now()}_${originalname}`;
      cb(null, filename);
    },
  }),
  s3: multerS3({
    s3: new S3(),
    bucket: 'finance.io-dev',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (_, file, cb) => {
      const { originalname } = file;
      const filename = `${Date.now()}_${originalname}`;
      cb(null, filename);
    },
  }),
};

const storage =
  process.env.NODE_ENV === 'development' ? storageTypes.local : storageTypes.s3;

export const multerOptions: MulterOptions = {
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 5 MB
  },
};

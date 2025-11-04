import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dqm2c3om0',
  api_key: '433946938753738',
  api_secret: 'lGJTo3VnBckm4z60c1F8KeXhy0w',
});

export const storage = new CloudinaryStorage({ cloudinary });

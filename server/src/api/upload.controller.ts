import { Request, Response } from 'express';
import imageKit from 'imagekit';
import multer from 'multer';

const imgKit = new imageKit({
  publicKey: process.env.KIT_PUBLIC_KEY as string,
  privateKey: process.env.KIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.KIT_URL_ENDPOINT as string,
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else cb(new Error('Not an image! Please upload only images.'), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const imageFilter = upload.single('image');

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await imgKit.upload({
      file: req.file.buffer, //required
      fileName: req.file.originalname, //required
    });
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

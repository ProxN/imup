import { Router } from 'express';
import { uploadImage, imageFilter } from './upload.controller';

const router = Router();

router.route('/').post(imageFilter, uploadImage);

export default router;

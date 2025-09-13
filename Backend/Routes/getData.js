import express from 'express';
import { getVoice } from '../Controllers/getDataController.js';

const getRouter = express.Router();

getRouter.get('/data',getVoice );

export default getRouter;
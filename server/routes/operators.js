import express from 'express';
import { maths } from '../maths';
import { send } from '../helpers';

export const path = '/operators';
export const router = express.Router();

router.get('', (req, res) => {
  send(req, res, { operators: Object.keys(maths) });
});

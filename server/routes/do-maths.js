import express from 'express';
import { maths } from '../maths';
import { send, error } from '../helpers';

export const path = '/domaths';
export const router = express.Router();

// This is the server state!
let currentValue = 20;

router.get('', (req, res) => {
  send(req, res, { value: currentValue });
})

router.options('', send);
router.post('', (req, res) => {
  const { operator, input } = req.body;

  if (!maths[operator]) {
    error(req, res, 500, `Unknown operator "${error}"`);
  } else if (isNaN(input)) {
    error(req, res, 500, `${input} is not a number`);
  } else {
    const result = maths[operator](currentValue, parseInt(input))
    console.log(`${currentValue} ${operator} ${input} = ${result}`);
    currentValue = result;

    send(req, res, { value: currentValue });
  }
});

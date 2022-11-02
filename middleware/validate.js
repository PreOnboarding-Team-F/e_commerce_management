import { BadRequestException } from '../util/exception/index.js';
import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  throw new BadRequestException(error.array()[0].msg);
};

export default validate;

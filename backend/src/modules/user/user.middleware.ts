import { RequestHandler } from 'express';
import { z } from 'zod';

export const validateUserName: RequestHandler = (req, res, next) => {
  const schema = z.object({
    username: z.string(),
  });

  const body = schema.safeParse(req.params);

  if (!body.success) {
    return res.status(400).json({
      message: 'User Name is Required',
    });
  }

  return next();
};

import jwt from 'jsonwebtoken';
import type { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export const signAsync = (
  payload: string | object | Buffer,
  secret: Secret,
  options: SignOptions,
) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

export const verifyAsync = <T extends object>(
  token: string,
  secret: Secret,
  options?: VerifyOptions,
) => {
  return new Promise<T | undefined>((resolve, reject) => {
    jwt.verify(token, secret, options, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result as T);
    });
  });
};

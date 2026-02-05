import { HttpStatusCode } from 'axios';
import type { NextFunction, Request, Response } from 'express';

import z from 'zod';
import _ from 'lodash';

type Target = 'body' | 'query' | 'params';

function validatePayload(schema: z.ZodType, target: Target) {
   return (req: Request, res: Response, next: NextFunction) => {
      const payload = _.get(req, target);
      const validation = schema.safeParse(payload);

      if (!validation.success) {
         return res.status(HttpStatusCode.BadRequest).json({ error: z.formatError(validation.error) });
      }

      next();
   };
}

export default validatePayload;

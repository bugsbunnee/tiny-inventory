import { HttpStatusCode } from 'axios';
import type { NextFunction, Request, Response } from 'express';

function validateId(req: Request, res: Response, next: NextFunction) {
   const id = Number(req.params.id);

   if (isNaN(id)) {
      return res.status(HttpStatusCode.BadRequest).json({ message: 'Invalid ID provided!' });
   }

   next();
}

export default validateId;

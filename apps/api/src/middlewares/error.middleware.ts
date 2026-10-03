import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err.name === 'ZodError') {
    return res.status(400).json({ status: 'error', message: 'Validation Error', errors: err.errors });
  }
  
  if (err.message && err.message.includes('within 30 minutes')) {
    return res.status(400).json({ status: 'error', message: err.message });
  }

  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};

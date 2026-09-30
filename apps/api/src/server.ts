import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') }); // For local development without monorepo package setup, we just use relative path to root for now. Or we can just use process.env.API_PORT. Let's use simple dotenv setup.

const PORT = process.env.API_PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

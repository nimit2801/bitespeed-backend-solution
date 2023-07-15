import express, { Request, Response } from 'express';
import { connection } from './connection';

let dataApp;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

type ResponseType = {
  contact: {
    primaryContactId: string;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: string;
  };
};

app.post('/identify', (req: Request, res: Response) => {
  // Request from the client
  const resp = req.body;
  console.log('response: ', resp);

  // Response from the server
  const response: ResponseType = {
    contact: {
      primaryContactId: '123456789',
      emails: ['asd@gmail.com'],
      phoneNumbers: ['123456789'],
      secondaryContactIds: '123456789',
    },
  };

  res.json(response);
});

app.listen(PORT, async () => {
  dataApp = await connection();
  console.log(`Server is running on port ${PORT}`);
});

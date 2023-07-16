import express, { Request, Response } from 'express';
import { connection } from './connection';
import { DataSource, In } from 'typeorm';
import { LinkPrecedence, Contact } from './entity/Contact';

let dataApp: DataSource;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

type ResponseType = {
  primaryContactId: string;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: string[];
};

type RequestType = {
  email?: string;
  phoneNumber?: string;
};

app.post('/identify', async (req: Request, res: Response) => {
  try {
    // Request from the client
    const reqBody: RequestType = req.body;
    console.log('Request: ', reqBody);

    if (reqBody.email == undefined && reqBody.phoneNumber == undefined) {
      const response: ResponseType = {
        primaryContactId: '',
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      };
      // empty response when its null or something unidentified, phewwwwww
      return res.json({ contacts: response });
    }

    // Search for the contact in the database
    const contactsAnd = await dataApp.getRepository('Contact').find({
      where: { email: reqBody.email, phoneNumber: reqBody.phoneNumber },
    });
    console.log('contactsAnd: ', contactsAnd);

    if (contactsAnd.length === 0) {
      // If the contactAnd is not found, create a new contact

      console.log('AND');
      const newContact = await dataApp.getRepository('Contact').save({
        email: reqBody.email,
        phoneNumber: reqBody.phoneNumber,
        linkedPrecedence: LinkPrecedence.PRIMARY,
      });
      console.log('New contact: ', newContact);
    }

    const contactsMain = await dataApp.getRepository('Contact').find({
      where: [{ email: reqBody.email }, { phoneNumber: reqBody.phoneNumber }],
      order: {
        createAt: 'ASC',
      },
    });
    const searchFor = {
      emails: [],
      phoneNumbers: [],
    };
    contactsMain.forEach((contact) => {
      if (contact.email !== reqBody.email && contact.email !== null) {
        searchFor.emails.push(contact.email);
      }
      if (
        contact.phoneNumber !== reqBody.phoneNumber &&
        contact.phoneNumber !== null
      ) {
        searchFor.phoneNumbers.push(contact.phoneNumber);
      }
    });
    console.log('searchFor: ', searchFor);
    searchFor.emails.push(reqBody.email);
    searchFor.phoneNumbers.push(reqBody.phoneNumber);
    const contacts = await dataApp.getRepository('Contact').find({
      where: [
        { email: In(searchFor.emails) },
        { phoneNumber: In(['1231231234']) },
      ],
    });

    console.log(contacts);
    if (contacts.length === 0) {
      // If the contact is not found, create a new contact
      console.log('OR');
      const newContact = await dataApp.getRepository('Contact').save({
        email: reqBody.email,
        phoneNumber: reqBody.phoneNumber,
        linkedPrecedence: LinkPrecedence.PRIMARY,
      });
      console.log('New contact: ', newContact);
      // send new contact :)
      const response: ResponseType = {
        primaryContactId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      };

      res.json({ contact: { response } });
    } else {
      const response: ResponseType = {
        primaryContactId: contacts[0].id,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      };

      contacts.forEach((contact, i) => {
        console.log('Inside loop: ', contact.email, contact.phoneNumber, i);
        if (
          !response.emails.includes(contact.email) &&
          response.emails !== null
        )
          response.emails.push(contact.email);
        if (
          !response.phoneNumbers.includes(contact.phoneNumber) &&
          response.phoneNumbers !== null
        )
          response.phoneNumbers.push(contact.phoneNumber);
        if (i !== 0) {
          response.secondaryContactIds.push(contact.id);
          dataApp.getRepository('Contact').update(contact.id, {
            linkedId: contacts[0].id,
            linkPrecedence: LinkPrecedence.SECONDARY,
          });
        }
      });
      res.json({ contact: { response } });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(PORT, async () => {
  dataApp = await connection();
  console.log(`Server is running on port ${PORT}`);
});

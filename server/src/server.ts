import express from 'express';
import cors from 'cors';
import * as config from './config';
import * as contacts from './contacts';

const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Address Book API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /contacts
    DELETE /contacts/:id
    POST /contacts { name, handle, avatarURL }
  </pre>
  `;

  res.send(help);
});

app.use((req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        'Please provide an Authorization header to identify yourself (can be whatever you want)',
    });
  }
});

app.get('/contacts', (req, res) => {
  res.send(contacts.get(req.token));
});

app.delete('/contacts/:id', (req, res) => {
  res.send(contacts.remove(req.token, req.params.id));
});

app.post('/contacts', express.json(), (req, res) => {
  const { name, handle } = req.body;

  if (name && handle) {
    return res.send(contacts.add(req.token, req.body));
  }

  return res.status(403).send({
    error: 'Please provide both a name and a handle',
  });
});

app.listen(config.port, () => {
  console.log(
    `Server listening on http://localhost:${config.port}, Ctrl+C to stop`
  );
});

import { Contact } from '../typings';

const api =
  import.meta.env.VITE_APP_CONTACTS_API_URL || 'http://localhost:5001';

let token = localStorage.getItem('token');

if (!token) {
  token = Math.random().toString(36);
  localStorage.setItem('token', token);
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then(res => res.json())
    .then(data => data.contacts);

export const remove = (contact: Contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact);

export const create = (body: any) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());

import { Contact } from './types';

import clone from 'clone';
import * as config from './config';

const defaultData = {
  contacts: [
    {
      id: 'richard',
      name: 'Richard Kalehoff',
      handle: '@richardkalehoff',
      avatarURL: config.origin + '/richard.jpg',
    },
    {
      id: 'karen',
      name: 'Karen Isgrigg',
      handle: '@karen_isgrigg',
      avatarURL: config.origin + '/karen.jpg',
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      handle: '@tylermcginnis',
      avatarURL: config.origin + '/tyler.jpg',
    },
  ],
};

const db = {} as { [token: string]: { contacts: Contact[] } };

export const get = (token: string) => {
  let data = db[token];

  if (!data) {
    data = db[token] = clone(defaultData);
  }

  return data;
};

export const add = (token: string, contact: Contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36);
  }

  get(token).contacts.push(contact);

  return contact;
};

export const remove = (token: string, id: string) => {
  const data = get(token);
  const contact = data.contacts.find(c => c.id === id);

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact);
  }

  return { contact };
};

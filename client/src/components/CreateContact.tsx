import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import { Contact } from '../typings';
import { FC, FormEvent } from 'react';

interface Props {
  onCreateContact(contact: Contact): void;
}

const CreateContact: FC<Props> = ({ onCreateContact }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const values = serializeForm(e.target as HTMLFormElement, { hash: true });

    console.log(values);

    if (onCreateContact) {
      onCreateContact(values);
    }
  };

  return (
    <div>
      <Link className="close-create-contact" to="/">
        Close
      </Link>
      <form onSubmit={handleSubmit} className="create-contact-form">
        <ImageInput
          className="create-contact-avatar-input"
          name="avatarURL"
          maxHeight={64}
        />
        <div className="create-contact-details">
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="handle" placeholder="Handle" />
          <button>Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;

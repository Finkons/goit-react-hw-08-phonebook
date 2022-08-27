import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import { BiUserPlus } from 'react-icons/bi';
import { BsTelephonePlusFill } from 'react-icons/bs';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { FormBox, Button, Label, Input } from './ContactForm.styled';
import { useState } from 'react';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'redux/contactsApi';

const ContactForm = () => {
  const [createContact] = useCreateContactMutation();
  const { data = [] } = useGetContactsQuery();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contactFinder = data.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (!contactFinder) {
      createContact(contact);
      setName('');
      setNumber('');
    }
    if (contactFinder) {
      Report.failure(`${name} is already in contacts`, 'sorry');
    }
  };

  return (
    <Formik>
      <FormBox onSubmit={handleSubmit}>
        <Label>
          <BiUserPlus size={35} />
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleInputChange}
            required
            id={nameId}
          />
        </Label>

        <Label>
          <BsTelephonePlusFill size={25} />
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleInputChange}
            required
            id={numberId}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormBox>
    </Formik>
  );
};

export default ContactForm;

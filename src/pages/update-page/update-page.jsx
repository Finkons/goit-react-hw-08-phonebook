import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GrUpdate } from 'react-icons/gr';
import styles from './styles.module.css';
import { useUpdateContactMutation } from 'redux/contacts/contactsApi';

const UpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contactId } = useParams();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [url, setUrl] = useState(location.state.from);
  const [isDisabled, setIsDisabled] = useState(true);
  const [updateContact] = useUpdateContactMutation();

  const reset = () => {
    setName('');
    setNumber('');
  };

  useEffect(() => {
    name.length > 0 && number.length > 0
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [name, number]);

  const handleSubmit = e => {
    e.preventDefault();

    updateContact({ contactId, name, number });
    setUrl(null);
    navigate(url);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Update contact</h1>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Number:
          <input
            className={styles.input}
            type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            name="number"
            onChange={e => setNumber(e.currentTarget.value)}
            required
          />
        </label>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isDisabled}
          aria-label="update contact button"
        >
          update contact
          <GrUpdate size={18} className={styles.icon} />
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;

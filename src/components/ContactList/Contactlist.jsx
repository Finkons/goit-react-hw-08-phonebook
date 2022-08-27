import { FaUserAltSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import { List } from './Contactlist.styled';
import { SpinnerCircular } from 'spinners-react';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsApi';

const ContactList = () => {
  const { data = [], isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(getFilter);
  const filteredContacts = () => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };
  let rendered = filter === '' ? data : filteredContacts();

  return (
    <List>
      {isFetching && (
        <SpinnerCircular
          size={47}
          thickness={150}
          speed={98}
          color="rgba(57, 172, 59, 1)"
          secondaryColor="rgba(57, 158, 172, 0.58)"
        />
      )}
      {data &&
        rendered.map(({ id, name, number }) => (
          <li key={id} id={id}>
            {name}: {number}
            <button type="button" onClick={() => deleteContact(id)}>
              <FaUserAltSlash size={20} color={'red'} />
            </button>
          </li>
        ))}
    </List>
  );
};

export default ContactList;

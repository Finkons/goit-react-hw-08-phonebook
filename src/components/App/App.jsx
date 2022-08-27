import Container from './app.styled';
import ContactForm from 'components/ContactForm/';
import ContactList from 'components/ContactList/';
import Filter from 'components/Filter/';

export function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Container>
  );
}

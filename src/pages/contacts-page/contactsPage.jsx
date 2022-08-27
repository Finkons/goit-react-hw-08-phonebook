import styles from './styles.module.css';
import { toast } from 'react-toastify';
import ContactForm from 'components/ContactForm';
import Contacts from 'components/ContactsList';
import Filter from 'components/Filter';
import { useSelector } from 'react-redux';
import authSelectors from 'Redux/auth/auth-selectors';
import authOperations from 'Redux/auth/auth-operations';
import { useDispatch } from 'react-redux';
import LoadingScreen from 'components/LoadingScreen';
import { MdError } from 'react-icons/md';
import { useEffect } from 'react';

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
      .unwrap()
      .catch(() => {
        toast.error('Sorry, your authorization token expired, please relogin', {
          icon: () => (
            <>
              <MdError size={24} color="var(--toastify-color-error)" />
            </>
          ),
        });
        dispatch(authOperations.logOut());
      });
  }, [dispatch]);

  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser
  );
  if (isFetchingCurrentUser) return <LoadingScreen />;

  return (
    <div className={styles.wrapper}>
      <section>
        <h1>Phonebook</h1>
        <ContactForm />
      </section>
      <section>
        <h2>Contacts</h2>
        <Filter />
        <Contacts />
      </section>
    </div>
  );
};

export default ContactsPage;

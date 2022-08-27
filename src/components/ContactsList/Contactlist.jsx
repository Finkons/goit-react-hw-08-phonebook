import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FaUserAltSlash } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getFilter } from 'Redux/contacts/contactsSlice';
import { SpinnerCircular } from 'spinners-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'Redux/contacts/contactsApi';
import { useEffect } from 'react';

const Contacts = () => {
  const { data, isFetching, refetch } = useGetContactsQuery();
  const location = useLocation();
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(getFilter);

  const filteredContacts = () => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  let rendered = filter === '' ? data : filteredContacts();

  return (
    <>
      <ul>
        <TransitionGroup component={null}>
          {data &&
            rendered.map(({ name, id, number }) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <li key={id} id={id}>
                  <span>{name} : </span>
                  <span> {number}</span>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">Click to update</Tooltip>
                    }
                  >
                    <Link to={`update/${id}`} state={{ from: location }}>
                      <button
                        className={styles.contactButton}
                        type="button"
                        aria-label="link to update contact page"
                      >
                        <GrUpdate size={30} />
                      </button>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="button-tooltip-2">Click to delete</Tooltip>
                    }
                  >
                    <button
                      className={styles.contactButton}
                      type="button"
                      onClick={() => {
                        deleteContact(id);
                      }}
                      aria-label="delete contact button"
                    >
                      <FaUserAltSlash size={30} color={'red'} />
                    </button>
                  </OverlayTrigger>
                </li>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ul>
      {isFetching && (
        <SpinnerCircular
          size={47}
          thickness={150}
          speed={98}
          color="rgba(57, 172, 59, 1)"
          secondaryColor="rgba(57, 158, 172, 0.58)"
        />
      )}
    </>
  );
};

export default Contacts;

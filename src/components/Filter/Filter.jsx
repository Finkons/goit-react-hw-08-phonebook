import styles from './styles.module.css';
import { MdOutlineFindInPage } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, getFilter } from 'redux/contacts/contactsSlice';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <label className={styles.label}>
      <MdOutlineFindInPage size={30} />
      Find contacts by name
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="filter input tooltip">
            Type here to find a contact
          </Tooltip>
        }
      >
        <input
          className={styles.inputFiltr}
          name="filter"
          value={filter}
          onChange={e => dispatch(setFilter(e.currentTarget.value))}
        />
      </OverlayTrigger>
    </label>
  );
};

export default Filter;

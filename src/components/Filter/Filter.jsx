import React from 'react';
import { MdOutlineFindInPage } from 'react-icons/md';
import { Label } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, getFilter } from 'redux/contactsSlice';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <Label>
      <MdOutlineFindInPage size={30} /> Find contacts by name
      <input
        type="text"
        value={value}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
    </Label>
  );
};

export default Filter;

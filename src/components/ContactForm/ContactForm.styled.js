import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FormBox = styled(Form)`
  display:flex;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 120px;
  height: 30px;
  background-color: #e4e9ed;
  border: 1px solid #030e1845;
  border-radius: 10px;
  box-shadow: 0 0 3px 1px;
  margin-top: 10px;
  margin-bottom: 25px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover{
    background-color: rgb(173, 241, 167);
  }
`;

export const Label = styled.label`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: green;
  cursor: pointer;
  p{
    margin: 10px;
    color: red;
  };
  svg{
    margin: 10px;
  }
`;

export const Input = styled(Field)`
  margin: 10px;
  height: 25px;
  width: 220px;
  border: 1px solid #030e1845;
  border-radius: 3px;
  box-shadow: 0 0 3px 1px;
`;
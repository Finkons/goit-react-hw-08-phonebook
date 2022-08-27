import styled from '@emotion/styled';

export const Label = styled.label`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  width:300px;
  justify-content: center;
  align-items: center;
  color: green;
  cursor: pointer;
  input{
    margin: 10px;
    height: 25px;
    width: 220px;
    border: 1px solid #030e1845;
    border-radius: 3px;
    box-shadow: 0 0 3px 1px;}
  svg{
    padding: 3px;
  }
`;
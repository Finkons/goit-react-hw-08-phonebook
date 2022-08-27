import styled from '@emotion/styled';

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;
  padding-left: 20px;
  margin-bottom:30px ;
  li{
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  button{
    margin: 5px;
    margin-left: 35px;
    border: 1px solid #030e1845;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px;
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);
    :hover{
      background-color: rgb(255, 211, 211);
    }
  }
`;
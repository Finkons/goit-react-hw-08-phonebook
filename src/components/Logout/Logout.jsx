import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import { FaUserTie } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
function Logout() {
  const user = useSelector(authSelectors.getUsername);
  const dispatch = useDispatch();

  return (
    <div className="d-flex justify-content-center align-items-center  ">
      <FaUserTie color={'white'} size={25} style={{ marginRight: '10px' }} />
      <p className="text-white mb-0 me-3 ">{user}</p>
      <Button
        onClick={() => {
          dispatch(authOperations.logOut());
        }}
        variant="secondary"
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;

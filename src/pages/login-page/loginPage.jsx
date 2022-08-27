import { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authOperations from 'redux/auth/auth-operations';
import { FaRegEye } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password: pwd }));
    setEmail('');
    setPwd('');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <p
          ref={errRef}
          className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Email:</label>
          <div className={styles.inputWrapper}>
            {' '}
            <input
              autoComplete="off"
              type="email"
              id="email"
              ref={userRef}
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div className={styles.inputWrapper}>
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              onChange={e => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="password button tooltip">show password</Tooltip>
              }
            >
              <button
                className={styles.showPasswordButton}
                onClick={togglePassword}
                type="button"
              >
                <FaRegEye size={25} />
              </button>
            </OverlayTrigger>
          </div>
          <button className={styles.submitButton}>Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <NavLink className={styles.line} to={'/SignUp'}>
            Sign Up
          </NavLink>
        </p>
      </section>
    </div>
  );
};

export default Login;

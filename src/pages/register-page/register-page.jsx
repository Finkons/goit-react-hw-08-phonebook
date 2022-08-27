import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle, FaRegEye } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const USER_REGEX = /^[A-z][A-z0-9-_-\s?]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = e => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }

    dispatch(authOperations.register({ name: user, password: pwd, email }));
    setEmail('');
    setUser('');
    setPwd('');
    setMatchPwd('');
  };

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">
            Username:
            <FaCheck
              className={validName ? `${styles.valid}` : `${styles.hide}`}
            />
            <FaTimes
              className={
                validName || !user ? `${styles.hide}` : `${styles.invalid}`
              }
            />
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={e => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          <p
            id="uidnote"
            className={
              userFocus && user && !validName
                ? `${styles.instructions}`
                : `${styles.offscreen}`
            }
          >
            <FaInfoCircle />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="email">
            Email:
            <FaCheck
              className={validEmail ? `${styles.valid}` : `${styles.hide}`}
            />
            <FaTimes
              className={
                validEmail || !email ? `${styles.hide}` : `${styles.invalid}`
              }
            />
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              ref={userRef}
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>

          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail
                ? `${styles.instructions}`
                : `${styles.offscreen}`
            }
          >
            <FaInfoCircle />
            An email is a string separated into two parts by @ symbol. a
            "personal_info" and a domain, that is personal_info@domain Letters,
            numbers, underscores, hyphens allowed.
            <br />
            The domain name [for example com, org, net, in, us, info] part
            contains letters, digits, hyphens, and dots.
          </p>

          <label htmlFor="password">
            Password:
            <FaCheck
              className={validPwd ? `${styles.valid}` : `${styles.hide}`}
            />
            <FaTimes
              className={
                validPwd || !pwd ? `${styles.hide}` : `${styles.invalid}`
              }
            />
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={passwordShown2 ? 'text' : 'password'}
              id="password"
              onChange={e => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="password button tooltip">show password</Tooltip>
              }
            >
              <button
                className={styles.showPasswordButton}
                onClick={togglePassword2}
                type="button"
              >
                <FaRegEye size={25} />
              </button>
            </OverlayTrigger>
          </div>

          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd
                ? `${styles.instructions}`
                : `${styles.offscreen}`
            }
          >
            <FaInfoCircle />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{' '}
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FaCheck
              className={
                validMatch && matchPwd ? `${styles.valid}` : `${styles.hide}`
              }
            />
            <FaTimes
              className={
                validMatch || !matchPwd ? `${styles.hide}` : `${styles.invalid}`
              }
            />
          </label>
          <div className={styles.inputWrapper}>
            <input
              type={passwordShown1 ? 'text' : 'password'}
              id="confirm_pwd"
              onChange={e => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="password button tooltip">show password</Tooltip>
              }
            >
              <button
                className={styles.showPasswordButton}
                onClick={togglePassword1}
                type="button"
              >
                <FaRegEye size={25} />
              </button>
            </OverlayTrigger>
          </div>

          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch
                ? `${styles.instructions}`
                : `${styles.offscreen}`
            }
          >
            <FaInfoCircle />
            Must match the first password input field.
          </p>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!validName || !validPwd || !validMatch ? true : false}
          >
            Sign Up
          </button>
        </form>
        <p>
          Already registered?
          <br />
          <NavLink className={styles.line} to={'/LogIn'}>
            Sign In
          </NavLink>
        </p>
      </section>
    </div>
  );
};

export default Register;

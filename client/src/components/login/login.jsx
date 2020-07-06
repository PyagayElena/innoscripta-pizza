import React, { useState } from 'react'
import './login.scss'
import { useForm } from 'react-hook-form'
import UserService from '../../services/user'
import { useDispatch } from 'react-redux'
import { update } from '../../store/user-slice'

export default function Login({ handleClose }) {
  const [ isSignin, setIsSignin ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, errors, reset, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = async ({ confirmPassword, ...params }) => {
    setIsLoading(true);
    const userService = new UserService();

    const login = async () => {
      const result = await userService.login(params);
      if (!!result && !!result.id) {
        const user = await userService.getUserInfo(result.id);
        dispatch(update(user));
        setIsLoading(false);
        handleClose();
        reset();
      } else {
        setIsLoading(false);
        setError('Wrong password or email');
      }
    }

    if (isSignin) {
      await login()
    } else {
      const registrationResult = await userService.register(params);
      if (!!registrationResult) {
        await login();
      } else {
        setIsLoading(false);
        setError('Failed to register. Please, try again.');
      }
    }
  };

  const onChange = () => {
    if (!!error) {
      setError(null);
    }
  }

  const onCancel = () => {
    reset();
    setIsSignin(true);
  }

  const onSignUp = () => {
    onChange();
    reset();
    setIsSignin(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
      <label>
        Email
        <input
          type="email"
          name="email"
          ref={register({
            required: { value: true },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <div className='error'>{errors.email.message}</div>}
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          ref={register({
            required: { value: true },
            minLength: {
              value: 5,
              message: "Minimum length is 5"
            }
          })}
        />
      </label>
      {errors.password && <div className='error'>{errors.password.message}</div>}

      {!isSignin &&
        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            ref={register({
              required: { value: !isSignin },
              validate: value => value === watch('password')
            })}
          />
        </label>}
      {!isSignin && !!watch('password') && errors.confirmPassword &&
        <div className='error'>Passwords don't match.</div>}

      {!!error && <div className='error'>{error}</div>}

      {isSignin ?
        <div className='login-footer'>
          <button className={`cancel ${isLoading && 'disabled'}`} onClick={onSignUp}>Sign up</button>
          <button className={`submit ${!formState.isValid && 'disabled'} ${isLoading && 'disabled spinner'}`}
                  type="submit">
            SIGN IN
          </button>
        </div> :
        <div className='login-footer'>
          <button className={`cancel ${isLoading && 'disabled'}`} onClick={onCancel}>Cancel</button>
          <button className={`submit ${!formState.isValid && 'disabled'} ${isLoading && 'disabled spinner'}`}
                  type="submit">
            SIGN UP
          </button>
        </div>}
    </form>
  );
}
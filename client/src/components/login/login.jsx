import React, { useState } from 'react'
import './login.scss'
import { useForm } from 'react-hook-form'

export default function Login() {
  const [ isSignin, setIsSignin ] = useState(true);

  const { register, handleSubmit, watch, errors, reset, formState } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {isSignin ?
        <div className='login-footer'>
          <button className='cancel' onClick={() => setIsSignin(false)}>Sign up</button>
          <button className={`submit ${!formState.isValid && 'disabled'}`} type="submit">
            SIGN IN
          </button>
        </div> :
        <div className='login-footer'>
          <button className='cancel' onClick={() => setIsSignin(true)}>Cancel</button>
          <button className={`submit ${!formState.isValid && 'disabled'}`} type="submit">
            SIGN UP
          </button>
        </div>}
    </form>
  );
}
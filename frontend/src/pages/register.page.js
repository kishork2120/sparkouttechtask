import React, { useState, useEffect } from 'react';
import ButtonLoader from '../components/buttonLoader.component';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import TextInput from '../components/textInput.component';
import { responseHandler } from '../common/helper';
import { registerUserService } from '../services/user.service';
/**
 * @function RegisterPage
 * @description - user register page
 * @return {JSX} - return jsx component
 */
const RegisterPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const [isButtonLoader, setIsButtonLoader] = useState();

  // Register user
  const registerUser = async (data) => {
    try {
      data = JSON.stringify(data);
      setIsButtonLoader(true);
      let response = await registerUserService(data);
      setIsButtonLoader(false);
      console.log(response)
      if (response.status === 200) {
        history.push('/');
      } else {
        responseHandler(response, history);
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) }, history);
    }
  }

  useEffect(() => {
    // Chech if the user logged in or not
    if (JSON.parse(sessionStorage.getItem('user'))?.id) {
      history.push('/notes')
    }
  }, [])

  return (
    <form className="box column is-half center-box" onSubmit={handleSubmit(registerUser)} noValidate>
      <h1 className="title">Register</h1>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <TextInput className="input" name="name" type="text" placeholder="Name" forwardRef={register({ required: true, minLength: 3, maxLength: 30 })} />
          <p className="help is-danger">{errors?.name?.type === 'required' && 'Name required'}</p>
          <p className="help is-danger">{errors?.name?.type === 'minLength' && 'Minimum 3 characters allowed'}</p>
          <p className="help is-danger">{errors?.name?.type === 'maxLength' && 'Maximum 30 characters allowed'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <TextInput className="input" name="email" type="email" placeholder="Email" forwardRef={register({ required: true, pattern: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })} />
          <p className="help is-danger">{errors?.email?.type === 'required' && 'Email required'}</p>
          <p className="help is-danger">{errors?.email?.type === 'pattern' && 'Invalid email'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Phone</label>
        <div className="control">
          <TextInput className="input" name="phone" type="text" placeholder="Phone" forwardRef={register({ required: true, pattern: /^([0-9]){4,12}$/ })} />
          <p className="help is-danger">{errors?.phone?.type === 'required' && 'Phone required'}</p>
          <p className="help is-danger">{errors?.phone?.type === 'pattern' && 'Invalid phone number'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Age</label>
        <div className="control">
          <TextInput className="input" name="age" type="number" min={13} max={150} placeholder="Age" forwardRef={register({ required: true, min: 13, max: 150 })} />
          <p className="help is-danger">{errors?.age?.type === 'required' && 'Age required'}</p>
          <p className="help is-danger">{errors?.age?.type === 'min' && 'Minimum age allowed 13'}</p>
          <p className="help is-danger">{errors?.age?.type === 'max' && 'Maximum age allowed 150'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Industry</label>
        <div className="control">
          <TextInput className="input" name="industry" type="text" min={13} max={150} placeholder="Industry" forwardRef={register({ minLength: 3, maxLength: 30 })} />
          <p className="help is-danger">{errors?.name?.type === 'minLength' && 'Minimum 3 characters allowed'}</p>
          <p className="help is-danger">{errors?.name?.type === 'maxLength' && 'Maximum 30 characters allowed'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <TextInput className="input" name="password" type="password" placeholder="Password" forwardRef={register({ required: true, minLength: 8, maxLength: 12 })} />
          <p className="help is-danger">{errors?.password?.type === 'required' && 'Password required'}</p>
          <p className="help is-danger">{errors?.password?.type === 'minLength' && 'Password must be atleast 8 charaters long'}</p>
          <p className="help is-danger">{errors?.password?.type === 'maxLength' && 'Password must not exceed 12 charaters'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <TextInput className="input" name="confirmPassword" type="password" placeholder="Confim password" forwardRef={register({
            required: true,
            validate: (value) => {
              return value === watch('password');
            }
          })} />
          <p className="help is-danger">{errors?.password?.type === 'required' && 'Confirm Password required'}</p>
          <p className="help is-danger">{errors?.confirmPassword?.type === 'validate' && 'Password dont match'}</p>
        </div>
      </div>
      <div className="field has-text-centered">
        <ButtonLoader props={{ isButtonLoader, buttonClass: "button is-primary", buttonName: "Register" }} />
      </div>
      <hr />
      <div className="field has-text-centered">
        Already have an account?
      <Link to="/">Login</Link>
      </div>
    </form>
  )
}

// Export the component
export default RegisterPage;
import React, { useState, useEffect } from 'react';
import ButtonLoader from '../components/buttonLoader.component';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import TextInput from '../components/textInput.component';
import { loginUserService } from '../services/user.service';
import { responseHandler } from '../common/helper';

/**
 * @function LoginPage
 * @description - login page for user
 * @return {JSX} - return jsx component
 */
const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [isButtonLoader, setIsButtonLoader] = useState();

  // Login user
  const loginUser = async (data) => {
    try {
      data = JSON.stringify(data)
      setIsButtonLoader(true)
      let response = await loginUserService(data);
      setIsButtonLoader(false)
      console.log(response);
      if (response.status === 200) {
        let session_data = atob(response.session_data).split('_');
        sessionStorage.setItem('user', JSON.stringify({ id: session_data[0], email: session_data[1] }));
        history.push('/notes');
      } else {
        responseHandler(response, history)
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) }, history)
    }
  }

  useEffect(() => {
    // Chech if the user logged in or not
    if (JSON.parse(sessionStorage.getItem('user'))?.id) {
      history.push('/notes')
    }
  }, [])

  return (
    <form className="box column is-half center-box" onSubmit={handleSubmit(loginUser)} noValidate>
      <h1 className="title">Login</h1>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <TextInput className="input" name="username" type="email" placeholder="Username" forwardRef={register({ required: true, pattern: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ })} />
          <p className="help is-danger">{errors?.username?.type === 'required' && 'Username required'}</p>
          <p className="help is-danger">{errors?.username?.type === 'pattern' && 'Invalid Username'}</p>
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
      <div className="field has-text-centered">
        <ButtonLoader props={{ isButtonLoader, buttonClass: "button is-primary", buttonName: "Login" }} />
      </div>
      <hr />
      <div className="field has-text-centered">
        <Link className="button" to="/register">
          Regiter
        </Link>
      </div>
    </form>

  )
}

// Export the component
export default LoginPage;
import React from 'react';
import TextArea from './textArea.component';
import { useForm } from 'react-hook-form';
import TextInput from './textInput.component';
import ButtonLoader from './buttonLoader.component';

/**
 * @function NoteForm
 * @description - form for add/edit notes
 * @param {String} props.buttonName - button name for the form add/edit
 * @param {Function} props.submitFunction - callback when form is submitted
 * @param {Boolean} props.loading - boolean value for loading 
 * @return {JSX} - returns a jsx component
 */
const NoteForm = ({ props }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="column" onSubmit={handleSubmit(props.submitFunction)} noValidate>
      <div className="field">
        <label className="label">Note Name</label>
        <div className="control">
          <TextInput className="input" name="noteName" type="text" placeholder="Note name" forwardRef={register({ required: true, minLength: 3, maxLength: 30 })} />
          <p className="help is-danger">{errors?.noteName?.type === 'required' && 'Note name required'}</p>
          <p className="help is-danger">{errors?.noteName?.type === 'minLength' && 'Minimum 3 characters allowed'}</p>
          <p className="help is-danger">{errors?.noteName?.type === 'maxLength' && 'Maximum 30 characters allowed'}</p>
        </div>
      </div>
      <div className="field">
        <label className="label">Note Content</label>
        <div className="control">
          <TextArea className="input" name="content" type="text" placeholder="Note content" forwardRef={register({ required: true, minLength: 1, maxLength: 50 })} rows="10"/>
          <p className="help is-danger">{errors?.content?.type === 'required' && 'Content must not be empty'}</p>
          <p className="help is-danger">{errors?.content?.type === 'minLength' && 'Minimum 1 characters allowed'}</p>
          <p className="help is-danger">{errors?.content?.type === 'maxLength' && 'Maximum 50 characters allowed'}</p>
        </div>
      </div>
      <div className="field has-text-centered">
        <ButtonLoader props={{ isButtonLoader: props.loading, buttonClass: "button is-primary", buttonName: props.buttonName }} />
      </div>
    </form>
  )
}

// Export component
export default NoteForm;
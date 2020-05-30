import React from 'react';
import Modal from './modalWrapper.component';
import NoteForm from './noteForm.component';

/**
 * @function AddEditNotes
 * @description - add/edit notes popup
 * @param {Function} props.closePopup - function triggerd while closing the popup
 * @param {Boolean} props.modalState - triggers the popup ( open or close )
 * @param {String} props.type - popup type ( add | edit )
 * @return {JSX} returns a jsx component
 */
const AddEditNotes = ({ props }) => {
  const popupTypeMapper = {
    add:'Add Note',
    edit:'Edit Note'
  }

  // Submit function
  const submitFunction = (data) => {
    console.log(data)
  }

  return (
    <Modal
      closeModal={props.closePopup}
      modalState={props.modalState}
      title={popupTypeMapper[props.type]}
    >
      <NoteForm props={{ submitFunction, buttonName: popupTypeMapper[props.type], loading: false }} />
    </Modal>
  )
}

// Export component
export default AddEditNotes;

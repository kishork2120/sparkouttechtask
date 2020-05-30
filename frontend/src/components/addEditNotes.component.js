import React, { useState, useEffect } from 'react';
import Modal from './modalWrapper.component';
import NoteForm from './noteForm.component';
import { addNotes, editNotes } from '../services/notes.service';
import { responseHandler } from '../common/helper';

/**
 * @function AddEditNotes
 * @description - add/edit notes popup
 * @param {Function} props.closePopup - function triggerd while closing the popup
 * @param {Boolean} props.modalState - triggers the popup ( open or close )
 * @param {String} props.type - popup type ( add | edit )
 * @return {JSX} returns a jsx component
 */
const AddEditNotes = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState();
  const popupTypeMapper = {
    add: {
      title: 'Add Note',
      function: addNotes
    },
    edit: {
      title: 'Edit Note',
      function: editNotes
    }
  }

  // Submit function
  const submitFunction = async (data) => {
    try {
      if (props.type === 'edit') data.id = noteData._id;
      data = JSON.stringify(data);
      setLoading(true);
      let response = await popupTypeMapper[props.type].function(data);
      setLoading(false);
      console.log(response)
      if (response.status === 200) {
        props.getNotesList();
        props.closePopup();
      } else {
        responseHandler(response);
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) });
    }
  }

  useEffect(() => {
    setNoteData(props.noteData)
  }, [props.noteData])

  return (
    <Modal
      closeModal={props.closePopup}
      modalState={props.modalState}
      title={popupTypeMapper[props.type]?.title}
    >
      {noteData && <NoteForm props={{ submitFunction, buttonName: popupTypeMapper[props.type]?.title, loading, noteData }} />}
    </Modal>
  )
}

// Export component
export default AddEditNotes;

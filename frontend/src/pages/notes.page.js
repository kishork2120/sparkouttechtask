import React, { useEffect, useState } from 'react';
import { getNotesListService } from '../services/notes.service';
import NavBar from '../components/navbar.component';
import { responseHandler } from '../common/helper';
import { useHistory } from 'react-router-dom';
import NotesCard from '../components/noteCard.component';
import NoData from '../components/nodata.component';
import Modal from '../components/modalWrapper.component';
import AddEditNotes from '../components/addEditNotes.component';

/**
 * @function NotesPage
 * @description - managing notes
 */
const NotesPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [isOpenModal, setIsOpenModel] = useState(false);
  const [popupType, setPopupType] = useState('');

  // Get note list
  const getNotesList = async () => {
    try {
      let data = {};
      setIsLoading(true);
      let response = await getNotesListService(data);
      setIsLoading(false);
      console.log(response);
      if (response.status === 200) {
        setNotesList(response.notesList);
      } else {
        responseHandler(response, history);
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) }, history);
    }
  }

  // Close popup
  const closePopup = ()=>{
    setIsOpenModel(false)
  }

  // Open popup
  const openPopup = (type)=>{
    setPopupType(type);
    setIsOpenModel(true);
  }

  useEffect(() => {
    getNotesList()
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="list_heading box">
        <button className="button is-primary" onClick={()=>openPopup('add')}>Add Notes</button>
      </div>
      {!isLoading && (notesList.length != 0) &&
        <div class="columns is-multiline">
          <div class="column is-one-third">
            <NotesCard />
          </div>
        </div>
      }
      <NoData props={{ condition: !notesList.length && !isLoading }} />
      <AddEditNotes props={{ closePopup, modalState:isOpenModal, type:popupType}}/>
    </div>
  )
}
export default NotesPage;
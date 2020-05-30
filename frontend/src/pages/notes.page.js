import React, { useEffect, useState } from 'react';
import { getNotesListService, deleteNotesService } from '../services/notes.service';
import NavBar from '../components/navbar.component';
import { responseHandler } from '../common/helper';
import { useHistory } from 'react-router-dom';
import NotesCard from '../components/noteCard.component';
import NoData from '../components/nodata.component';
import AddEditNotes from '../components/addEditNotes.component';
import Loader from '../components/loader.component';

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
  const [noteData, setNoteData] = useState();

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

  // Delete note
  const deleteNotes = async ({ _id }) => {
    try {
      if (!window.confirm('Are you sure you want to delete the note')) return
      let data = { id: _id };
      setIsLoading(true);
      let response = await deleteNotesService(JSON.stringify(data));
      setIsLoading(false);
      console.log(response);
      if (response.status === 200) {
        getNotesList();
      } else {
        responseHandler(response, history);
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) }, history);
    }
  }

  // Close popup
  const closePopup = () => {
    setIsOpenModel(false)
  }

  // Open popup
  const openPopup = (type, data) => {
    setPopupType(type);
    setIsOpenModel(true);
    data ? setNoteData(data) : setNoteData({ name: "", content: "" });
  }

  useEffect(() => {
    getNotesList()
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="list_heading box">
        <button className="button is-primary" onClick={() => openPopup('add')}>Add Notes</button>
      </div>
      <Loader props={{isLoading}}/>
      {!isLoading && (notesList.length != 0) &&
        <div className="columns is-multiline">
          {notesList.map((d, i) =>
            <div className="column is-one-third" key={i}>
              <NotesCard
                props={{
                  ...d,
                  editCallback: () => openPopup('edit', notesList[i]),
                  deleteCallback: () => deleteNotes(notesList[i])
                }}
              />
            </div>
          )}
        </div>
      }
      <NoData props={{ condition: !notesList.length && !isLoading }} />
      <AddEditNotes props={{ closePopup, modalState: isOpenModal, type: popupType, getNotesList, noteData }} />
    </div>
  )
}
export default NotesPage;
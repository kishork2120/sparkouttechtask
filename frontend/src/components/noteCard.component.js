import React from 'react';

/**
 * @function NotesCard
 * @description - card wrapper for notes
 * @param {String} props.noteName - name of the note
 * @param {String} props.noteContent - content of the note
 * @param {Function} props.editCallback - edit callback
 * @param {Function} props.deleteCallback - delete callback
 * @param {JSX} - returns a jsx component
 */
const NotesCard = ({ props }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          {props.name}
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          {props.content}
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item" onClick={props.editCallback}>Edit</a>
        <a className="card-footer-item" onClick={props.deleteCallback}>Delete</a>
      </footer>
    </div>
  )
}

// Export component
export default NotesCard;

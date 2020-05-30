import React from 'react';

/**
 * @function NotesCard
 * @description - card wrapper for notes
 * @param {String} props.noteName - name of the note
 * @param {String} props.noteContent - content of the note
 * @param {JSX} - returns a jsx component
 */
const NotesCard = ({ props }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{props?.noteName}</strong>
              <br />
              {props?.noteContent}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

// Export component
export default NotesCard;

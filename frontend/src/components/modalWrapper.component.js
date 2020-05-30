import React from 'react';

/**
 * @function Modal
 * @description - modal wrapper for bulma
 * @param {JSX} children - child component - content of the modal 
 * @param {Function} closeModal - triggered when modal closes
 * @param {Boolean} modalState - triggers the modal ( open or close )
 * @param {String} title - title for the modal
 * @return {JSX} - returns jsx components
 */
const Modal = ({ children, closeModal, modalState, title }) => {
    if(!modalState) {
      return null;
    }
    
    return(
      <div className="modal is-active is-fullwidth">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={closeModal} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              {children}
            </div>
          </section>
        </div>
      </div>
    );
}

//Export component
export default Modal;

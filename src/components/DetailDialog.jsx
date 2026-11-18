
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './DetailDialog.css';

export default function DetailDialog({ title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleBackdropClick = (event) => {
    if (event.target !== dialogRef.current) return;

    const rect = dialogRef.current.getBoundingClientRect();
    const { clientX, clientY } = event;

    const clickedOutside =
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom;

    if (clickedOutside) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      aria-label={title}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="dialog-content">

        <div className="dialog-header">
          <h2>{title}</h2>

          <button
            className="dialog-close"
            type="button"
            aria-label="Close dialog"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="dialog-body">
          {children}
        </div>

      </div>
    </dialog>
  );
}

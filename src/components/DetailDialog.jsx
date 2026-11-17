import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './DetailDialog.css';

export default function DetailDialog({ title, onClose, children }) {
  const dialog = useRef(null);

  useEffect(() => {
    dialog.current.showModal();
  }, []);

  return (
    <dialog ref={dialog} className="detail-dialog" aria-label={title} onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <div className="dialog-content">
        <button className="dialog-close" type="button" autoFocus aria-label="Close details" onClick={() => dialog.current.close()}><X /></button>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

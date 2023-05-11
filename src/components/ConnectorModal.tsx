import React, { ReactNode, useState } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  const { isOpen, toggle, children } = props;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">{children}</div>
        </div>
      )}
      {/* <button onClick={toggle}>Open Modal</button> */}
    </>
  );
}

export function ConnectorModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <div>
          <h2>Connectors Modal</h2>
          <p>This is the content of the modal.</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </Modal>
    </>
  );
}









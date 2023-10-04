import { useState } from "react";
import Modal, { ModalContent } from "../Modal/Modal";
import "./Footer.css";

export default function Footer() {
  const [dialogModal, setDialogModal] = useState<boolean>(false);

  return (
    <footer>
      Salut, petite question:{" "}
      <button onClick={() => setDialogModal(true)}>Tu vas bien ?</button>
      <Modal
        isOpen={dialogModal}
        fullSize={false}
        fireCloseEvent={() => setDialogModal(false)}
      >
        <ModalContent>
          <div className="footerModalContent">
            <button onClick={() => setDialogModal(false)}>Oui</button>
            <button onClick={() => setDialogModal(false)}>Non</button>
          </div>
        </ModalContent>
      </Modal>
    </footer>
  );
}

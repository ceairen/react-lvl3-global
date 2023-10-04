import { createPortal } from "react-dom";
import "./Modal.css";

type ModalProps = {
  fullSize: boolean;
  isOpen: boolean;
  children: React.ReactNode;
  fireCloseEvent: () => void;
};

type ModalGlobalContentProps = {
  children: React.ReactNode;
};

export function ModalTitle({ children }: ModalGlobalContentProps) {
  return <div className="modalTitle">{children}</div>;
}

export function ModalContent({ children }: ModalGlobalContentProps) {
  return <div className="modalContent">{children}</div>;
}

export function ModalFooter({ children }: ModalGlobalContentProps) {
  return <div className="modalFooter">{children}</div>;
}

export default function Modal({
  children,
  isOpen,
  fullSize,
  fireCloseEvent,
}: ModalProps) {
  function handleCloseModal(e: React.MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.classList.contains("modalOverlay")) {
      fireCloseEvent();
    }
  }

  function setupModal() {
    return (
      <div
        onClick={handleCloseModal}
        className={`modalOverlay ${fullSize ? "fullsize" : ""}`}
      >
        <div className="modal">{children}</div>
      </div>
    );
  }

  const modal = setupModal();

  const modalPortal = createPortal(modal, document.body);

  return isOpen ? (fullSize ? modalPortal : modal) : null;
}

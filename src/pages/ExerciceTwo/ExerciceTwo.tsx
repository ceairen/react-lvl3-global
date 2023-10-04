import { useState } from "react";
import Footer from "../../components/ExerciceTwo/Footer/Footer";
import Modal, {
  ModalContent,
  ModalTitle,
  ModalFooter,
} from "../../components/ExerciceTwo/Modal/Modal";

export default function ExerciceTwo() {
  const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(true);
  const [catModalOpen, setCatModalOpen] = useState<boolean>(false);
  const [currentCat, setCurrentCat] = useState<string | null>(null);

  async function handleGetCat() {
    setCatModalOpen(true);
    const url = "https://cataas.com/cat";
    const response = await fetch(url);
    const cat = await response.blob();
    const catUrl = URL.createObjectURL(cat);
    setCurrentCat(catUrl);
  }
  return (
    <section className="ExerciceTwo">
      <h1>Exercice 2</h1>
      <button onClick={handleGetCat}>Voir une photo de chat</button>
      <div>
        <Footer />
        <Modal
          isOpen={catModalOpen}
          fullSize={true}
          fireCloseEvent={() => {
            setCurrentCat(null);
            setCatModalOpen(false);
          }}
        >
          <ModalContent>
            {currentCat === null ? (
              <label>Chargement...</label>
            ) : (
              <img src={currentCat} />
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={welcomeModalOpen}
          fullSize={true}
          fireCloseEvent={() => setWelcomeModalOpen(false)}
        >
          <ModalTitle>
            <h3>Bienvenue</h3>
          </ModalTitle>
          <ModalContent>
            <p>Profitez bien de ce superbe site!</p>
          </ModalContent>
          <ModalFooter>
            <button onClick={() => setWelcomeModalOpen(false)}>OK</button>
          </ModalFooter>
        </Modal>
      </div>
    </section>
  );
}

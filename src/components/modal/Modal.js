import "./styles.css";
import Card from "../card/Card";
import Button from "../button/Button";


const Modal = ({ onClose }) => {
    return (
        <div className="modal-bg">
            <Card>
                <h2>Nový Záznam</h2>
                <input placeholder="Město"></input>
                <input placeholder="Ulice"></input>
                <input placeholder="GPS"></input>
                <input placeholder="Počet slotů"></input>
                <div>
                    <Button>Vytvořit</Button>
                    <Button onClick={onClose}>Zrušit</Button>
                </div>
            </Card>
        </div>
    );
}

export default Modal;
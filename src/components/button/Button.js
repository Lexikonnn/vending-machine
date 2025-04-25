import "./styles.css";

const Button = ({ children, className = "", ...props }) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

export default Button;
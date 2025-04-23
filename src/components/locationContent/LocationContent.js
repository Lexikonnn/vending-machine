import "./styles.css";

const LocationContent = ({ city, amount, maxAmount }) => {
    return (
        <div className="content-wrapper">
            <h2>{city}</h2>
            <div>
                <p>{amount}/</p>
                <p>{maxAmount}</p>
            </div>
        </div>
    );
}

export default LocationContent;
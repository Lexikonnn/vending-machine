import "./styles.css";


const SearchBar = ({ value, onChange, placeholder = "Hledat..." }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="search-input"
        />
    );
}

export default SearchBar;
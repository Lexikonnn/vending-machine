import "./styles.css";

const Tag = ({children, state}) => {
    return ( 
        <div className={`tag-wrapper ${state}`}>
            {children}
        </div>
     );
}
 
export default Tag;
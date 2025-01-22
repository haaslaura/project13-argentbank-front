import "./featureItem.css"
import PropTypes from "prop-types"


/**
 * Displays a feature item with an icon, title, and description.
 * 
 * Used to highlight a key feature or selling point, typically on the homepage.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.img - URL of the feature's icon or image
 * @param {string} props.title - Title of the feature
 * @param {string} props.text - Description of the feature
 * 
 * @returns {JSX.Element} A feature item component
 */
const FeatureItem = ({ img, title, text }) => {
    
    return (
        <div className="feature-item">
            <img
                src={img}
                alt=""
                className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {text}
            </p>
        </div>
    )
}

FeatureItem.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
}

export default FeatureItem
import "./featureItem.css"
import PropTypes from "prop-types"


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
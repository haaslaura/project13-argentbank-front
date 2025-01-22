import './hero.css'


/**
 * Displays an hero section with an image (in CSS) and some text
 * 
 * @returns {JSX.Element} An hero component
 */
const Hero = () => {
    return (
        <div className="hero">
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
            </section>
        </div>
    )
}

export default Hero
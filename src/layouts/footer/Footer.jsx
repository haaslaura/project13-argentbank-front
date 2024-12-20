import './footer.css'

const Footer = () => {

    const date = new Date();
    const currentYear = date.getFullYear()
    
    return (
        <>
            <footer className="footer">
                <p className="footer-text">Copyright {currentYear} Argent Bank</p>
            </footer>
        </>
    )
}

export default Footer
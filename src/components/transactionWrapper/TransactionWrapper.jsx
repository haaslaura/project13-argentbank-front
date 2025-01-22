import './TransactionWrapper.css'


/**
 * Displays a transaction summary with a title, amount, description, 
 * and a button to view more details.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title of the transaction, such as the account type or name.
 * @param {string | number} props.amount - The amount associated with the transaction (e.g., balance or total).
 * @param {string} props.description - A brief description of the transaction or account.
 * 
 * @returns {JSX.Element} A styled section summarizing the transaction with a button to view more details.
 */
const TransactionWrapper = ({ title, amount, description }) => {

    return (
        <>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
                </div>
                <div className="account-content-wrapper cta">
                <button
                    className="transaction-button"
                    type="button"
                >
                    View transactions
                </button>
                </div>
            </section>
        </>
    )
}

export default TransactionWrapper
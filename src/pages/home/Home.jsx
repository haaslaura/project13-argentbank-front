import './home.css'

import Hero from "../../components/hero/Hero"
import FeatureItem from "../../components/featureItem/FeatureItem"

import chatIcon from "../../assets/icon-chat.svg"
import moneyIcon from "../../assets/icon-money.svg"
import securityIcon from "../../assets/icon-security.svg"

const featuresItemContent = [
    {
        img: chatIcon,
        title: "You are our #1 priority",
        text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        img: moneyIcon,
        title: "More savings means higher rates",
        text: "The more you save with us, the higher your interest rate will be!",
    },
    {
        img: securityIcon,
        title: "Security you can trust",
        text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
]

const Home = () => {
    
    return (
        <>
            <Hero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {
                    featuresItemContent.map((item, index) => (
                        <FeatureItem
                            key={`feature-item-${index}`}
                            img={item.img}
                            title={item.title}
                            text={item.text}                            
                        />
                    ))
                }
            </section>
        </>
    )
}

export default Home
import HomeContainer from "../components/HomeContainer"
import HomeNav from "../components/HomeNav"
import Footer from "../components/Footer"

function Home() {
    const headings = ["What do we offer?", "How does the device work?", "About us"]
    const descriptions = ["Our application provides a low cost, premade option for car insurance companies that are looking to expand into the telematics insurance market. We have designed a website with full integration to our black boxes, meaning that client businesses can install our devices in cars easily and start receiving data onto their accounts instantly. Our goal is to allow smaller companies that would not normally have the funding or research capabilities to develop their own telematics integration, to enter this market and compete with the big name insurance companies. It is our hope that this will foster more competition and better rates for drivers, especially young drivers.", 
    "Installation is easy, you plug the device into the car and switch it on. Then as you drive, the box will collect data. Some of the data we collect includes car acceleration, average speed, and information on steering. This data then goes into a customizable algorithm which can be weighted differently to reflect your company’s policies. This algorithm then produces a simple driving score, allowing your company to use this information to adjust insurance rates and premiums. The gathered data is also stored in a database for your company to be able to look at directly.", 
    "We are a team of six students at the University of Aberdeen. This website came about as the result of a year-long software engineering project for one of our classes. We wanted to fix an issue that plagues young adults and students like us. What came to mind was the high insurance rates for new drivers, so we thought what if we could find a way to reduce that? And so DriveGauge was born, allowing new drivers to reduce their insurance rates by proving their driving skill and reducing their perceived risk. "]
    return (
        <div>
            <HomeNav />
            <div className="h-screen">
                <div className="bg-auto bg-gradient-to-r from-slate-800 to-blue-700">
                    <div className="pb-16">
                    <div className="text-center">
                        <div className="pt-24 text-8xl font-bold text-white">
                            <h1>DriveGauge</h1>
                        </div>
                        <div className="pt-2 text-2xl text-white">
                            <h2>An all-in-one solution for your clients</h2>
                        </div>

                    {headings.map((heading, index) => {
                        return (
                            <HomeContainer key={heading}>
                                <div className="text-2xl text-left ml-2 font-semibold text-white uppercase">
                                    <h3>{heading}</h3>
                                </div>
                                <div className="ml-2 mr-2 text-lg text-white text-justify">
                                    <p>{descriptions[index]}</p>

                                    </div>
                            </HomeContainer>
                        )
                    })}
                    
                    </div>
                </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Home

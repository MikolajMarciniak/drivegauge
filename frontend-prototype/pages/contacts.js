import HomeNav from "../components/HomeNav"
import Footer from "../components/Footer"
import HomeContainer from "../components/HomeContainer"

function Contacts() {
    const headings = ["Phone number:", "Email:", "Address:"]
    const descriptions = ["+44 123456789", "drivegauge@abdn.ac.uk", "23 DriveGauge Street, Aberdeen, United Kingdom"]
    return (
        <div>
            <HomeNav />
            <div>
                <div className="bg-auto bg-gradient-to-r from-slate-800 to-blue-700">
                    <div className="pb-16">
                    <div className="text-center">
                        <div className="pt-24 text-5xl font-bold text-white">
                            <h1>Contact us</h1>
                        </div>
                        <HomeContainer>
                            {headings.map((heading, index) => {
                                return (
                                    <div key={heading}>
                                        <div className="text-2xl text-left ml-2 font-semibold text-white">
                                            <h3>{heading}</h3>
                                        </div>
                                        <div className="ml-2 mr-2 text-lg text-white text-justify">
                                            <p>{descriptions[index]}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </HomeContainer>
                    </div>
                    </div>
                </div>
                <Footer />
            </div>
          </div>
  );
}

export default Contacts;

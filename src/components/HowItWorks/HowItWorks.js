//components
import OverlayedTitle from "../OverlayedTitle/OverlayedTitle"
//images
import howItSvg from "../../img/howitworks.svg"
import howItPng from "../../img/howItImage.png"

const HowItWorks = () => {
    return(
        <div className="container-fluid howIt">
            <OverlayedTitle>how it works?</OverlayedTitle>
            
            <div className="glass">
                {/* <img src={"./img/howItImage.png"} alt=""/> */}
                {/* <img src={howItPng} alt=""/> */}
                <object id="my-svg" type="image/svg+xml" className="howItSvg" data={howItSvg}></object>
            </div>
        </div>
    )
}

export default HowItWorks
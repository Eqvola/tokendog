//components
import Card from "../components/Card/Card";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ColoredButton from "../components/ColoredButton/ColoredButton";
import Header from "../components/Header/Header";
import React, { useState, Component } from "react";
//images
import dod001 from "../img/dod001.png";
import dod002 from "../img/dod002.png";
import dod003 from "../img/dod003.png";
import dod004 from "../img/dod004.png";
import dod005 from "../img/dod005.png";
import dod006 from "../img/dod006.png";
import dod007 from "../img/dod007.png";
import dod008 from "../img/dod008.png";
import nft from "../img/nft.png";
import { dogsURL, dogChildrenURL,settingsURL } from "../constants/URLs";
import Metamask from "../components/Metamask/Metamask.js";
import cookie from "react-cookies";
import { price, unity } from "../constants/Price"

const metamask = new Metamask();
const METAMASK_COOKIE = "metamask_connected";

const axios = require("axios");
function GetDogParam() {
  let url = window.location.href;
  let dogid = url.substr(
    url.lastIndexOf("/") + 1,
    url.length - url.lastIndexOf("/") - 1
  );

  return dogid;
}
class DogPage extends Component {
  componentDidMount() {
    // fire your action here
  }
  constructor(props) {
    super();
    let dogid = GetDogParam();
    console.log(props);
    this.state = {
      dogid: dogid,
      ownerid:0,
      age: "",
      races: 0,
      gen: 0,
      name: "",
      profileName:"User ID: ", 
      img: "",
      text: "",
      DNA: "",
      Race_EXP: 0,
      isVisibleSaleBlock:false, 
      isVisibleNFT:false, 
      isVisbleMint:false,
      isNFT:false,
      price:"",
      /*mom_name:"",
            mom_img:"",
            mom_text:"",
            mom_dogid:"",
            dad_name:"",
            dad_img:"",
            dad_text:"",
            dad_dogid:"",*/
      children: [],
    };
    this.getDog(dogid);

    this.getChildren(dogid);
    /*this.setState({
            name:((props.name==undefined)?props.name:"")
          });*/
  }
  getQuality(str) {
    let result = "100";
    if (str.indexOf("%") > -1) {
        let last_index = str.lastIndexOf(" ");
        let end_index = str.lastIndexOf("%");
        result = str.substr(last_index + 1, (end_index - last_index-1));
    }
    return result;

}
  async getDog(_dogID) {
    try {
      // TODO: make url's via config
      /*try {
        const { data } = await axios.get(
          `https://coindogs.com/WebService.asmx/UnityGet?dog_id=${_dogID}`
        );
        if (data) {
          this.setState({ img: `https://coindogs.com/${data.img}` });
          this.setState({ bio: data.bio });
        }
      } catch (error) {
        console.error(error);
      }
*/
      axios.get(dogsURL + "/" + _dogID).then((resp) => {
        this.setState({ name: resp.dataю });
        this.setState({ img: resp.data.CurImage });
        this.setState({ bio: resp.data.BIO });
        this.setState({ age: resp.data.AgeInWords });
        if (!this.state.img) {
          this.setState({ img: resp.data.CurImage });
        }
        this.setState({ ownerid:resp.data.Owner_ID });
        
        this.setState({ profileName:"User ID: "+resp.data.Owner_ID });
        this.setState({ races: resp.data.Races });
        this.setState({ gen: resp.data.Generation });
        this.setState({ Race_EXP: resp.data.Race_EXP });
        this.setState({ text: resp.data.TopBreedComposition_FullInfo });
        this.setState({ DNA: resp.data.DNA });
        this.setState({ isNFT: (resp.data.IsNFT==1)});
       
        let quality= parseInt(this.getQuality(resp.data.TopBreedComposition_FullInfo));
        let priceQuality = price[quality]+" "+ unity;
        this.setState({ price: priceQuality});
       let isVisibleSaleBlock= (
        (resp.data.Owner_ID==localStorage.getItem("userID"))
        || (resp.data.IsOnSale==1)
        || (resp.data.IsNFT==1)
     );
     let isVisibleNFT=  (
      (resp.data.Owner_ID==localStorage.getItem("userID"))
      || ((resp.data.IsNFT==1)&&(resp.data.IsOnSale==1))
   );
   let isVisbleMint= (
    (resp.data.Owner_ID==localStorage.getItem("userID"))
    || ((resp.data.IsNFT!=1)&&(resp.data.IsOnSale==1))
 );
 let isBuyNFT =(
  (resp.data.Owner_ID!=localStorage.getItem("userID"))
  && ((resp.data.IsNFT==1)&&(resp.data.IsOnSale==1))
);
/*console.log((resp.data.Owner_ID!=localStorage.getItem("userID")));
 console.log( isVisibleNFT);
 console.log( isBuyNFT);*/
        this.setState({ 
          isVisibleSaleBlock:isVisibleSaleBlock });
        this.setState({ isVisibleNFT:isVisibleNFT});
        this.setState({ isVisbleMint: isVisbleMint });
        this.setState({ isBuyNFT: isBuyNFT });
        

        this.getParentForDog(resp.data.Mom_ID, "mom");
        this.getParentForDog(resp.data.Dad_ID, "dad");
        this.getOwner(resp.data.Owner_ID);
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getParentForDog(_dogID, m_o_d) {
    try {
      axios.get(dogsURL + "/" + _dogID).then((resp) => {
        const { data } = resp;
        if (m_o_d == "mom") {
          this.setState({ mom_name: resp.data.Name });
          this.setState({ mom_img: resp.data.CurImage });
          this.setState({ mom_text: resp.data.TopBreedComposition_FullInfo });
          this.setState({ mom_dogid: _dogID });
        } else {
          this.setState({ dad_name: resp.data.Name });
          this.setState({ dad_img: resp.data.CurImage });
          this.setState({ dad_text: resp.data.TopBreedComposition_FullInfo });
          this.setState({ dad_dogid: _dogID });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getChildren(_dogID) {
    try {
      console.log("Children");
      axios.get(dogChildrenURL + "/" + _dogID).then((resp) => {
        this.setState({ children: resp.data });
        console.log(resp.data);
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getOwner(_userID) {
    try {
      
      axios.get(settingsURL + "/" + _userID).then((resp) => {
      
        this.setState({ profileName:resp.data.UserName });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async mintDog(id) {
    if (cookie.load(METAMASK_COOKIE)) {
      metamask.metaMaskClientCheck();
    }
    if (!metamask.isConnected) return false;
    const result = await metamask.mintDog(
      metamask.accounts[0],
      id,
      document.location.href
    );
    console.log("Mint result: ", result);
  }

  render() {
    let parents = [];
    if (this.state.mom_dogid) {
      parents.push(
        <Card
          dogPage={true}
          dogid={this.state.mom_dogid}
          name={this.state.mom_name}
          img={this.state.mom_img}
          text={this.state.mom_text}
        />
      );
    }
    if (this.state.dad_dogid && this.state.mom_dogid != this.state.dad_dogid) {
      parents.push(
        <Card
          dogPage={true}
          dogid={this.state.dad_dogid}
          name={this.state.dad_name}
          img={this.state.dad_img}
          text={this.state.dad_text}
        />
      );
    }
    //console.log(parents);
    return (
      <>
        <Header />
        <div className="bodyWrapper dog-page">
          <div class="container-lg dogPageContainer">
            <div class="row dpRow">
              <div class="col-xs col-lg-5">
                <div class="card dogImgContainer">
                  <div class="card-img-bg ">
                    <div style={this.state.isNFT?{}:{display:"none"}}  class="dogImgBage">
                      <img src="./img/nft.png" alt=""></img>
                    </div>
                    <img src={this.state.img} class="" alt="..."></img>
                  </div>
                </div>
                <div style={this.state.isVisibleSaleBlock?{}:{display:"none"}} class="sellBlock">
                  <a style={this.state.isVisbleMint?{}:{display:"none"}}
                    href={"/convertNTF/" + this.state.dogid}
                    class="gradientButton"
                  >
                    Mint
                  </a>
                  <a style={(this.state.isVisibleNFT&&!this.state.isBuyNFT)?{}:{display:"none"}} href="#" class="gradientButton">
                    Sell no-NFT
                  </a>
                  <a style={(this.state.isVisibleNFT&&this.state.isBuyNFT)?{}:{display:"none"}} href="#" class="gradientButton">
                    Buy NFT
                  </a>
                  
                </div>
                <div style={{marginLeft:'30%'}} className="priceBottom">
                    <div style={(this.state.isVisibleSaleBlock)?{}:{display:"none"}} className="regPrice">{this.state.price}</div>
                </div>
              </div>
              <div class="col-xs col-lg-6">
                <div class="dogName">{this.state.name}</div>
                <div class="owner">
                  Owned by <span class="owmerName">{this.state.profileName}</span>
                </div>
                <div class="ownerTextBottom">
                  {this.state.bio}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna
                  fringilla urna, porttitor rhoncus dolor purus non enim
                  praesent elementum facilisis leo, vel fringilla est
                  ullamcorper eget nulla facilisi etiam dignissim diam quis enim
                  lobortis scelerisque fermentum dui */}
                </div>
                <div class="dogAbout">
                  <div class="par">
                    <div class="parTitle">Purity</div>
                    <div class="parText">16%</div>
                  </div>
                  <div class="par">
                    <div class="parTitle">Age</div>
                    <div class="parText"> {this.state.age}</div>
                  </div>
                  <div class="par">
                    <div class="parTitle">Racing Exp</div>
                    <div class="parText">{this.state.Race_EXP}</div>
                  </div>
                </div>
                <div class="dogStats">
                  {this.state.text} | {this.state.races} races | Gen{" "}
                  {this.state.gen}
                </div>
                <div class="racingStats">
                  <div class="dpTitles">Racing Stats</div>
                  <div class="rsData">
                    <div class="rsCol">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td colspan="2">
                              1 races | <img src="#" alt=""></img>{" "}
                              <span class="goldM">0</span>{" "}
                              <img src="#" alt=""></img>{" "}
                              <span class="silverM">0</span>{" "}
                              <img src="#" alt=""></img>{" "}
                              <span class="bronzeM">0</span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">100% wins</td>
                          </tr>
                          <tr>
                            <td>Rank</td>
                            <td>32</td>
                          </tr>
                          <tr>
                            <td>Scheduled races</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="rsCol">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>Best Time</td>
                            <td>15.78 sec</td>
                          </tr>
                          <tr>
                            <td>Racing</td>
                            <td>0.15 Pts</td>
                          </tr>
                          <tr>
                            <td>Breeding</td>
                            <td>0.0 Pts</td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>0.15 Pts</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="dnaAnalys">
                  <div class="dpTitles">DNA Analysis</div>
                  <div class="dnaSeq">
                    DNA Sequence:{" "}
                    <span class="seqResult">{this.state.DNA}</span>
                  </div>
                </div>
                <div class="dogParents">
                  <div class="dpTitles">Parents</div>
                  <div class="parentsBlock">{parents}</div>
                </div>

                <div class="dogChildren">
                  <div class="dpTitles">Children</div>
                  <div class="childrenBlock">
                    {this.state.children.map((dog, i) => {
                      return (
                        <Card
                          dogPage={true}
                          dogid={dog.DogID}
                          name={dog.Name}
                          img={dog.Image}
                          text={dog.TopBreedComposition_FullInfo}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default DogPage;

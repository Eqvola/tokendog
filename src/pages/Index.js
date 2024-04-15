//components

import Features from "../components/Features/Features";
import HeroSection from "../components/HeroSection/HeroSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import LastBlock from "../components/LastBlock/LastBlock";
import LearnBlock from "../components/LearnBlock/LearnBlock";
import TodayMarket from "../components/TodayMarket/TodayMarket";
import { AuthProvider, AuthContext } from "../App";
import React, { useState,Component } from "react";
import { price, unity } from "../constants/Price"
import { dogsByOwnerURL, dogsURL, settingsURL } from "../constants/URLs"

const axios = require('axios');
class  Index extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dogsHeroSection:[],
        dogsRandomSection:[]
    };
      this.getAllDogs();

      
  } 

  componentDidMount() {
    // fire your action here
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
setQuality(arr) {
    arr.map((el, i) => {
       let quality= parseInt(this.getQuality(el.TopBreedComposition_FullInfo));
        el.Quality = quality;
        el.Price = price[quality]+" "+ unity;
    });
    arr = arr.sort((a, b) => a.Quality < b.Quality ? 1 : -1);
    return arr;

}
getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  async getAllDogs() {
    try {
        
        axios.get(dogsURL).then((resp) => {
            let alldogs = this.setQuality(resp.data);
            let dogs = [];
            let dogsHeroSection = [];
            let dogsRandomSection = [];
            alldogs.map((dog, i) => {
        
                    if (
                         dog.IsOnSale == 1
                    ) {
                      dogs.push(dog);
                    }
            });
            dogsHeroSection.push(dogs[0]);
            dogsHeroSection.push(dogs[1]);
            for(let i=0; i<8;i++)
            {
               let indexRandom = this.getRandomInt(0,(dogs.length-1));
               dogsRandomSection.push(dogs[indexRandom]);
            }
            console.log(dogsRandomSection);
            this.setState({ dogsHeroSection: dogsHeroSection });
            this.setState({ dogsRandomSection: dogsRandomSection });
            //console.log(dogs);
          
            //console.log(`this data ${resp.data}`);
        });
    } catch (error) {
        console.error(error)
    }

}

render() {
  //const { state, dispatch } = useContext(AuthContext);
  return (
    <>
      <HeroSection dogs={this.state.dogsHeroSection} />
      <Features />
      <HowItWorks />
      <TodayMarket dogs={this.state.dogsRandomSection} />
      <div className="container">
        <LearnBlock
          textPosition="left"
          title="Your Dog can worth Gold !"
          content="Our Token Dogs can be worth gold after breeding him well, adding some cool accessories, converting him into an NFT, and selling it to the world."
          link="#"
        />
        <LearnBlock
          textPosition="right"
          title="How to buy a Token Dog NFT"
          content="ETH is the cryptocurrency used for all transactions on the Ethereum blockchain network, and it’s the currency you use to buy NFTs on Token Dog, in addition to our native token DOG Token $DOG"
          link="#"
        />
      </div>
      <LastBlock />
    </>
  );
}
}

export default Index;

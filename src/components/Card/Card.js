import React, { Component } from "react"
//images
import dod001 from '../../img/dod001.png'
import dod002 from '../../img/dod002.png'
import dod003 from '../../img/dod003.png'
import dod004 from '../../img/dod004.png'
import dod005 from '../../img/dod005.png'
import dod006 from '../../img/dod006.png'
import dod007 from '../../img/dod007.png'
import dod008 from '../../img/dod008.png'
import dod009 from '../../img/dog-10-2.svg'
import dod010 from '../../img/dog-2-3.svg'
import dod011 from '../../img/dog-200-11.svg'
import dod012 from '../../img/dog-500-9.svg'
import nft from '../../img/nft.png'
//styles
import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props);
        this.imgArray = [dod001, dod002, dod003, dod004, dod005,dod006,dod007,dod008, dod009, dod010, dod011, dod012 ];
        this.state = {
            name:((props.name==undefined)?"":props.name),
            img:((props.img==undefined)?this.imgArray[Math.floor(Math.random()*12)]:props.img),
            text:((props.text==undefined)?"Sell":props.text),
            dogid:((props.dogid==undefined)?0:props.dogid),
            price:((props.price==undefined)?"":props.price),
            isOnSale:((props.isOnSale==undefined)?false:props.isOnSale),
            convertPage : props.convertShowPage
        };
        /*this.setState({
            name:((props.name==undefined)?props.name:"")
          });*/
    } 
    componentDidMount() {
        // fire your action here
    }
    componentWillReceiveProps(nextProps) {
        this.setState( {name:((nextProps.name==undefined)?"":nextProps.name)});
         this.setState( {img:((nextProps.img==undefined)?this.imgArray[Math.floor(Math.random()*12)]:nextProps.img)});
         this.setState( {text:((nextProps.text==undefined)?"Sell":nextProps.text)});
         this.setState( {dogid:((nextProps.dogid==undefined)?0:nextProps.dogid)});
         this.setState( {price:((nextProps.price==undefined)?"":nextProps.price)});
         this.setState( {isOnSale:((nextProps.isOnSale==undefined)?false:nextProps.isOnSale)});
           
      }
    
 render(){
    return (
        this.props.dogPage?
    <>
     <div className="card">
        
            <div className="card-img-bg">
                <div style={this.props.isNFT?{}:{display:"none"}} className="ready2nft">
                    <img src={nft} alt=""/>
                </div>
                <img src={this.state.img} className="card_img" alt="..."/>
            </div>
        
        <div className="card-body">
            <div className="cBodyLeft">
                
                    <h5 className="card-title">{this.state.name}</h5>
               
                <p className="card-text">{this.state.text}</p>
                <div className="priceBottom">
                    <div style={this.state.isOnSale?{}:{display:"none"}} className="regPrice">{this.state.price}</div>
                    
                </div>
            </div>
            <div className="cBoryRight ">
                <a href={"/dog-page/"+this.state.dogid} dog_id={this.state.dogid} className="dodRound">
                    <i className="fas fa-arrow-left"></i>
                </a>
            </div>
        </div>
    </div> 
    </>
    :
    <>
    <div className="col-md"><div className="card">
        <a href={"/dog-page/"+this.state.dogid} dog_id={this.state.dogid}>
            <div className="card-img-bg">
                <div style={this.props.isNFT?{}:{display:"none"}} className="ready2nft">
                    <img src={nft} alt=""/>
                </div>
                <img src={this.state.img} className="card_img" alt="..."/>
            </div>
        </a>
        <div className="card-body">
            <div className="cBodyLeft">
                <a href={"/dog-page/"+this.state.dogid} dog_id={this.state.dogid}>
                    <h5 className="card-title">{this.state.name}</h5>
                </a>
                <p className="card-text">{this.state.text}</p>
                <div className="priceBottom">
                    <div style={this.state.isOnSale?{}:{display:"none"}} className="regPrice">{this.state.price}</div>
                </div>
            </div>

            <div className="cBoryRight">

                {
                    this.state.convertPage?
                        <a href={"/convertNTF/"+this.state.dogid} className="dodRound">
                          <i className="fas fa-arrow-right"></i>
                        </a>:
                        <a href={"/dog-page/"+this.state.dogid} dog_id={this.state.dogid} className="dodRound">
                        {/* <a href={"/convertNTF/"+this.state.dogid} className="dodRound"> */}
                            <i className="fas fa-arrow-right"></i>
                        </a>
                }
            </div>
        </div>
    </div></div>
    </>
    
        )
    }

}

export default Card
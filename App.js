import React, { Component} from 'react';

import logo from './logo.svg';
import './App.css';



class Modal extends Component {
constructor (props){
super(props)
this.state = {
  modalOpen: true
}

}

render() {
  console.log("modal is open")
  const modalStyle = {
    height: "100vh",
    width: "100vh",
    position: "absolute",
    float: "center",
    backgroundColor: "rgb(3, 4, 2, 0.3)",

  }
  console.log( "modalOpen" + this.state.modalOpen)

  console.log(this.props.modalCardPicture)
 return  this.state.modalOpen? 
        <div style={modalStyle}
        onClick={this.props.unmountMe.bind(this)}>
        <img src={this.props.modalCardPicture}>
        </img></div>
        : this.componentWillUnmount.bind(this)

}}


class App extends Component {
constructor (props) {
super(props) 
this.state = {
  cards: ["inga kort ännu"],
  modalOpen: false,
  modalCardPicture: ""
}


}
componentDidMount() {
  return fetch ("https://api.magicthegathering.io/v1/cards")
  .then( response => response.json())
  .then(response => this.setState({
    cards: response.cards
  }))}


openModal(cardPicture) {
    this.setState({
      modalOpen: true,
      modalCardPicture: cardPicture
    })
  }

CloseModal(){
this.setState({
  modalOpen: false
})

}


render() {

const wrapperStyle = { display: "flex",
                    flexWrap: "wrap"
        
}

const cardStyle = { margin: "10px"

}

console.log(this.state.cards)

let cards = this.state.cards.slice()
.map(item => <div class="cardsWrapper" onClick={this.openModal.bind(this, item.imageUrl)}>

<img src={item.imageUrl}></img>
</div>)
console.log(cards)

console.log(this.state.modalOpen);


  


  return (
          <div style={wrapperStyle}>
          {cards} 
          {this.state.modalOpen &&
          <Modal modalCardPicture={this.state.modalCardPicture}
          unmountMe={this.CloseModal.bind(this)}
          ></Modal>}
           </div>
 
  )

}

}



export default App;

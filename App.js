import React, { Component} from 'react';

import logo from './logo.svg';
import './App.css';

const URL = "https://api.magicthegathering.io/v1/cards" 

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

class FilterForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
  /*   this.handleSubmit = this.handleSubmit.bind(this); */
  }
  handleChange(event) {
    event.preventDefault();
    
    this.setState({value: event.target.value});
    console.log(this.state.value)
  }

  render() {
    return (
      <form  onSubmit={this.props.search} >
      <select onChange={this.props.filter}>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="black">black</option>
        <option value="white">black</option>
      </select>
      <input type="submit" value="Submit" />
      
      </form>
      
    )
  }
}


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
  return fetch (URL)
  .then( response => response.json())
  .then(response => this.setState({
    cards: response.cards
  }))}


openModal(cardPicture) {
    this.setState({
      modalOpen: true,
      modalCardPicture: cardPicture,
      filterColor: ""
    })
  }

CloseModal(){
this.setState({
  modalOpen: false
})

}


filter(event){
  event.preventDefault();
  console.log("värdet" + event.target.value)
  this.setState({
    filterColor: event.target.value
  })
}

 search(event){
   event.preventDefault();
  return fetch (`${URL}?colors=${this.state.filterColor}`)
  .then( response => response.json())
  .then(response => this.setState({
    cards: response.cards
  }))}



render() {

  
console.log(this.state.filterColor)
const wrapperStyle = { display: "flex",
                    flexWrap: "wrap"

}

const cardStyle = { margin: "0px",
                    


}

console.log(this.state.cards)

let cards = this.state.cards.slice()
.map(item => <div class="cardsWrapper" onClick={this.openModal.bind(this, item.imageUrl)}>

<img src={item.imageUrl} style={cardStyle}></img>
</div>)
console.log(cards)

console.log(this.state.modalOpen);


  


  return (
          <div class="outerWrapper">
        
          <FilterForm filter={this.filter.bind(this)}
                       search={this.search.bind(this)}>
                       </FilterForm>
          <div style={wrapperStyle}>
          {cards} 
          {this.state.modalOpen &&
          <Modal modalCardPicture={this.state.modalCardPicture}
          unmountMe={this.CloseModal.bind(this)}
          ></Modal>}
           </div>
           </div>
 
  )

}

}



export default App;

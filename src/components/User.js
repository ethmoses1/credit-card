import React, { Component } from 'react';
import Header from './Header.js'
import firestore from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {setter: true, value: '', cardNameSearch: '' ,cardName: '', cardNumber: '', year: '', month: '', cvv: '', error: '' };
    this.cvvSelect = this.cvvSelect.bind(this);
    this.fetchCard = this.fetchCard.bind(this);
    this.updateInputValueCardName = this.updateInputValueCardName.bind(this);
    this.cvvSelectFront = this.cvvSelectFront.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

cvvSelect(e){
    this.setState({setter: false})
  }
cvvSelectFront(e){
  this.setState({setter: true})
}


fetchCard (e){
  e.preventDefault();

  //reset the input values
   document.querySelectorAll('input').forEach(
    input => (input.value = "")
  );
  if(this.state.cardName){
    this.setState({cardName: ''});
    this.setState({cardNumber: ''});
    this.setState({year: ''});
    this.setState({month: ''});
    this.setState({cvv: ''})
  }

  const db = firestore;
  const docRef = db.collection("users")
  docRef.get().then((querySnapShot) =>{
    const users = [];
    querySnapShot.forEach((user) => {

      if (user.data().cardName){
        if(user.data().cardName.toLowerCase() === this.state.cardNameSearch.toLowerCase()){
          // console.log(user.data())
          this.setState({cardName: user.data().cardName})
          this.setState({cardNumber: user.data().cardNumber})
          this.setState({year: user.data().year})
          this.setState({month:  user.data().title})
          this.setState({cvv: user.data().cvv});
          this.setState({setterForInput: false});
        }else{
          users.push(user.data().cardName);
        }
      }

    });

    //print error information
    this.state.cardName ?
        console.log("")

    : this.setState({error: 'No card information by that name'});;

  })

   setTimeout(
    function() {
        this.setState({ error: '' });
    }
    .bind(this),
    3000
);
}

updateInputValueCardName(e){
    this.setState({cardNameSearch: e.target.value})
}



  render() {
    const pageName = 'Storred Card Details';
    return (
      <div>
      <Header page = {pageName} className="header-heading-user"/>
      <p className="heading-error">{this.state.error}</p>
      <div className="container">

       <div className="card-details">
       </div>

      <div className="form-div">
        <form onSubmit={this.fetchCard}>
        <div className="form-control-searchCard">
          <div class="form-group">
          <label for="formGroupExampleInput2">Card Name</label>

          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="John Doves"  onChange={this.updateInputValueCardName}/>
          </div>
         <button className="submit-button">Submit</button>
        </div>
      </form>
      </div>

{this.state.setter ?
      <div className="cardDisplay">
       <div className="card-top">
         <img src="https://freepikpsd.com/wp-content/uploads/2019/10/credit-card-chip-png-4-Transparent-Images.png" alt="tht "  className="image"/>
         <h5 className="card-top-name" > DISCOVER</h5>
       </div>

      <div className="cardNumberDisplay">
      <h4 className="cardNumber-h4-title"> {this.state.cardNumber}</h4>
      </div>

        <div className="cardHolder">
          <p className="paragraph-card-holder"> Card Holder</p>
          <h5 className="heading-card-holder"> {this.state.cardName}</h5>
        </div>
        <div className="Expires">
          <p className="paragraph-card-holder"> Expires</p>
          <p className="expire-year-month-display"> {this.state.month + ' / ' + this.state.year } </p>
        </div>

      </div>
      :
      <div className="cardDisplay">
      <div className="cardDisplay-stripe">
        <img src="https://s3-eu-west-1.amazonaws.com/cdn.papermilldirect.co.uk/paper-card-images/black-250.jpg?mtime=20180417092957" className="image-stripe"alt=""/>
      </div>

      <div className="cardHolder-cvv">
        <p className="paragraph-card-holder-h"> CVV</p>
        <h5 className="heading-card-holder-h"> {this.state.cvv}</h5>
      </div>

       <div className="card-to-backSide">
         <h5 className="card-top-name-backSide" > DISCOVER</h5>
       </div>
       </div>
    }
    <div className="getCVV">
    { this.state.setter ?
        <button onClick={this.cvvSelect} className="getCVV-button">Get CVV</button>
      :
      <button onClick={this.cvvSelectFront} className="getCVV-button">Get Card</button>  }
    </div>
      </div>
      </div>
    );
  }

}

export default User;

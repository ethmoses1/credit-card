import React, { Component } from 'react';
import Header from './Header.js';
import DatePicker from "react-datepicker";
import MaskedInput from 'react-maskedinput'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import firestore from './firebase';

class Home extends Component {
    constructor() {
      super();
      const today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      this.state = {date: date, startDate: '',
                    months: ["01", "02", "03","04","05","06","07","08","09","10","11","12"],
                    years: ["2021","2022","2023","2024","2025","2026","2027","2028","2029", "2030"],
                     title: '06', year: '2021', cvv: '', cardNumber: '6011 2312 3890 4238', cardName: 'John Doves', card: '', expiry: '', setter: false, showMenu: false,
                   };
      this.handleSelectMonth = this.handleSelectMonth.bind(this);
      this.handleSelectYear = this.handleSelectYear.bind(this);
      this.updateInputValue = this.updateInputValue.bind(this);
      this.updateInputValueCardNumber = this.updateInputValueCardNumber.bind(this);
      this.updateInputValueCardName = this.updateInputValueCardName.bind(this);
      this.maxLengthCheck = this.maxLengthCheck.bind(this);
      this._onChange = this._onChange.bind(this);
      this.addUser = this.addUser.bind(this);
      this.showMenu = this.showMenu.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
    }

_onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({cardNumber: e.target.value});
        this.setState({setter: false});

      }

handleSelectMonth(e){
    console.log(e);
    this.setState({value: e});
    this.setState({title: e});
    this.setState({setter: false});
  }
  handleSelectYear(e){
      console.log(e);
      this.setState({value: e});
      this.setState({year: e});
      this.setState({setter: false});
    }

  updateInputValue(e){
    const input = e.target.value;
    this.setState({cvv: e.target.value});
    this.setState({setter: true});

  }

  updateInputValueCardNumber(e){
    console.log(e.target.value);
    let x = e.target.value;
    this.setState({cardNumber: e.target.value})
    this.setState({setter: false});

  }

  updateInputValueCardName(e){
    this.setState({cardName: e.target.value})
    this.setState({setter: false});
  }

  maxLengthCheck(object){
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
}

maxLengthCheckForCredit(object){
  if (object.target.value.length > object.target.maxLength) {
    object.target.value = object.target.value.slice(0, object.target.maxLength)
  }
}



addUser = event =>{
  alert(`A card was submitted:\n Name: ${this.state.cardName} \n card Number: ${this.state.cardNumber} \n Expire: ${this.state.title} / ${this.state.year} \n CVV: ${this.state.cvv}`)

  event.preventDefault();
  const db = firestore;
      db.settings({
        timestampsInSnapshots: true
      });
      const userRef = db.collection("users").add({
        cardName: this.state.cardName,
        cardNumber: this.state.cardNumber,
        title: this.state.title,
        year: this.state.year,
        cvv: this.state.cvv
      });
}

showMenu(event) {
  event.preventDefault();

  this.setState({ showMenu: true }, () => {
    document.addEventListener('click', this.closeMenu);
  });
 }
 closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }


  render() {
    const pageName = 'Stomble Saver'
    const defaultOption = this.state.months[5];
    return (
      <div>
        <div>
        <Header page = {pageName} />
        </div>

        <button onClick={this.showMenu}>
                Show menu
              </button>

              {
                this.state.showMenu
                  ? (
                    <div className="menu">
                      <button> Menu item 1 </button>
                      <button> Menu item 2 </button>
                      <button> Menu item 3 </button>
                    </div>
                  )
                  : (
                    null
                  )
              }


        <div className="container">

        <div >
          <h3 className="header-stomble">Save Your Card Details</h3>

         {this.state.setter ?
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

           :
          <div className="cardDisplay">
           <div className="card-top">
             <img src="https://freepikpsd.com/wp-content/uploads/2019/10/credit-card-chip-png-4-Transparent-Images.png" alt="tht "  className="image"/>
             <h5 className="card-top-name" > DISCOVER</h5>
           </div>

          <div className="cardNumberDisplay">
          <h4> {this.state.cardNumber}</h4>
          </div>

            <div className="cardHolder">
              <p className="paragraph-card-holder"> Card Holder</p>
              <h5 className="heading-card-holder"> {this.state.cardName}</h5>
            </div>
            <div className="Expires">
              <p className="paragraph-card-holder"> Expires</p>
              <p> {this.state.title + ' / ' + this.state.year } </p>
            </div>

          </div>
      }
        </div>

        <div className="form-div">
          <form className="form" onSubmit={this.addUser}>
              <div class="form-group">
                <label for="formGroupExampleInput">Card Number</label>
                <MaskedInput  class="form-control" mask="1111  1111  1111  1111"  size="20" placeholder="6011 2312 3890 423" onChange={this._onChange}/>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Card Name</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="John Doves"  onChange={this.updateInputValueCardName}/>
              </div>

           <div className="date-input">
            <div class="form-group-date">
                <DropdownButton title={this.state.title} id="menu-align-right" onSelect={this.handleSelectMonth}>{this.state.months.map((month) =>
                    <Dropdown.Item eventKey={month}>{month}</Dropdown.Item>
            )}</DropdownButton>
          </div>
          <div class="form-group-year">
              <DropdownButton title={this.state.year} id="menu-align-right" onSelect={this.handleSelectYear}>{this.state.years.map((year) =>

                  <Dropdown.Item eventKey={year}>{year}</Dropdown.Item>
              )}</DropdownButton>
          </div>
          <div className="form-group-cvv">
            <label >CVV</label>
            <input type="number" maxLength = "3" min={100} max="999" Styles={false} onInput={this.maxLengthCheck} required class="form-control" value={this.state.cvv} onChange={this.updateInputValue} placeholder="cvv" m/>
          </div>
         </div>
         <button className="submit-button">Submit</button>
      </form>
        </div>
        </div>
    </div>
    );
  }

}

export default Home;

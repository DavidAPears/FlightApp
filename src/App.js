import React, { Component } from "react";
import './styles/clock.css';
import './styles/dropdown.css';
import './styles/App.css';
import './styles/flight.css';
import './styles/search.css';
import plane from './styles/plane.gif';
import banner from './styles/banner2.png';


class App extends Component {

  state = {
    date: null,
    query: '',
    departuresActive: false,
    arrivalsActive: false,
    allFlightsActive: true
    };

  constructor(props) {
  super(props);
  this.getDepartures = this.getDepartures.bind(this);
  this.getArrivals = this.getArrivals.bind(this);
  this.getDataFromDb = this.getDataFromDb.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.searchFlightNo = this.searchFlightNo.bind(this);
  this.setDepartureTabActive = this.setDepartureTabActive.bind(this);
  this.setArrivalsTabActive = this.setArrivalsTabActive.bind(this);
  this.setAllFlightsTabActive = this.setAllFlightsTabActive.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
  }

// Method that uses backend api to fetch data from our data base
  getDataFromDb() {
    this.setAllFlightsTabActive()
    var self = this
    fetch("http://localhost:8000/flights")
      .then(data => data.json())
      .then(res => self.setState({ data: res }, function(){
      }));
  };

// Method to render all flights:
  renderAllFlights() {
    return this.state.data.map((flight, i) =>
    this.renderFlight(flight)
     )
  }

  setDepartureTabActive(){
    this.setState({
      departuresActive: true,
      arrivalsActive: false,
      allFlightsActive: false
    })
  }

  setArrivalsTabActive(){
    this.setState({
      departuresActive: false,
      arrivalsActive: true,
      allFlightsActive: false
    })
  }

  setAllFlightsTabActive(){
    this.setState({
      departuresActive: false,
      arrivalsActive: false,
      allFlightsActive: true
    })
  }

// Method to render all departures:
getDepartures() {
  this.setDepartureTabActive()
  var self = this
  fetch("http://localhost:8000/flights/departures")
    .then(data => data.json())
    .then(res => self.setState({ data: res }, function(){
    }));
};

// Method to render all arrivals:
getArrivals() {
  this.setArrivalsTabActive()
  var self = this
  fetch("http://localhost:8000/flights/arrivals")
    .then(data => data.json())
    .then(res => self.setState({ data: res }, function(){
    }));
};

// Method to search flight no:

handleInputChange(evt){
   this.setState({
     query: evt.target.value
   })
 }

 handleFlightNoSubmit(evt){

   var self = this
   evt.preventDefault()
   var fnArray = self.state.data.map((flight, i) =>
   flight.FlightNo
 )
  if (fnArray.includes(this.state.query)){
    this.searchFlightNo()
  }
 }

searchFlightNo() {
  var self = this
  fetch("http://localhost:8000/flights/flight/" + this.state.query)
    .then(data => data.json())
    .then(res => self.setState({ data: [res] }));
};




// Method to render a single flight
  renderFlight(flight) {
    return(

    <div className="wrapper">

      <div className="aside-1">
        <img src={plane} style={{ height: "100%", width:"100%", borderRadius:"20px" }}/>
        </div>
        <div className="main">
          <p className="flight-flightno"> Flight No: {flight.FlightNo}                </p>
          <p className="flight-airline">  {flight.Airline} to {flight.PortOfCallA}    </p>
          <p className="flight-time">     Flight Time: {flight.Time} on {flight.Date} </p>
          <p className="flight-arrdep">   Arrival (or) Departure: {flight.ArrDep}     </p>
          {/*<p className="flight-image">    Image: {flight.Image}           </p>*/}
        </div>
        <div className="main">
          <p className="flight-status">   Status: {flight.Status}                     </p>
          <p className="flight-arrhall">  Arriving At: {flight.ArrHall}               </p>
          <p className="flight-info">     Info: {flight.OtherInfo}                    </p>
          <p className="flight-info2">    Further Info: {flight.Additional}           </p>
        </div>
      </div>
  )
}


// Below is the UI:
  render() {
    if(this.state.data){
    return (

      <div className="homepage">

      {/*<img src={banner} style={{ height: "10%"}}/>*/}

      <div className="pageheader">
        <ul>
          <li>
            <h1>welcome</h1>
              <span class="foldable">
                <span>(EDN) Edinburgh Airport</span>
              </span>
          </li>
          <li>
            <h1>flight</h1>
              <span class="foldable">
                <span>CloudScanner</span>
              </span>
          </li>
          <li>
            <h1>date</h1>
              <span class="foldable">
                <span>Feb</span>
                <span>4</span>
                <span>2019</span>
              </span>
          </li>
          <li>
            <h1>time</h1>
              <span class="foldable">
              <span>10</span>
              <span>17</span>
              <span>am</span>
            </span>
          </li>
        </ul>
        </div>



        <form className="searchform cf">
          <input
            placeholder="Enter Flight No."
            onChange={this.handleInputChange}
            type="text"
          />
          <button
            onClick={(e) => this.handleFlightNoSubmit(e)}
            >Submit
          </button>
        </form>





        <div class="dropdown-container">
          <input type="checkbox" id="drop" />
            <label for="drop">Arrivals / Departures</label>
              <ul class="dropdowncontent">
                <li style={{color: this.state.arrivalsActive ? '#299ae1' : 'black'}} onClick={this.getArrivals}>Arrivals</li>
                <li style={{color: this.state.departuresActive ? '#299ae1' : 'black'}} onClick={this.getDepartures}>Departures</li>
                <li style={{color: this.state.allFlightsActive ? '#299ae1' : 'black'}} onClick={this.getDataFromDb}>All</li>
              </ul>
        </div>


      <div >
        <p>{this.renderAllFlights()}</p>
      </div>


      </div>

    )}

      else {
        return(
          <div>
            <p> Loading... </p>
          </div>
        )
        }
}}

export default App;

import React, { Component } from "react";
import './styles/clock.css';
import './styles/dropdown.css';
import './styles/App.css';
import './styles/flight.css';
import './styles/search.css';
import './styles/loading.css';
import plane from './styles/plane.gif';
import banner from './styles/banner2.png';


class App extends Component {

// STATE(S)
  state = {
    date            : null,
    query           : '',
    departuresActive: false,
    arrivalsActive  : false,
    allFlightsActive: true,
    curTime         : null
    };

// CONSTRUCTOR(S)
  constructor(props) {
  super(props);
  this.getDepartures            = this.getDepartures.bind(this);
  this.getArrivals              = this.getArrivals.bind(this);
  this.getDataFromDb            = this.getDataFromDb.bind(this);
  this.handleInputChange        = this.handleInputChange.bind(this);
  this.searchFlightNo           = this.searchFlightNo.bind(this);
  this.setDepartureTabActive    = this.setDepartureTabActive.bind(this);
  this.setArrivalsTabActive     = this.setArrivalsTabActive.bind(this);
  this.setAllFlightsTabActive   = this.setAllFlightsTabActive.bind(this);
  }

// COMPONENT DID MOUNT(S)
  componentDidMount() {
    this.getDataFromDb()
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000);
  }

// METHOD TO GET DATA FROM BACKEND API
  getDataFromDb() {
    this.setAllFlightsTabActive()
    var self = this
    fetch("http://localhost:8000/flights")
      .then(data => data.json())
      .then(res => self.setState({ data: res }, function(){
      }))
      .catch(function(e){
          console.log("Error:", e);
        })
      ;
  };

// METHOD TO DISPLAY ALL FLIGHTS
  renderAllFlights() {
    return this.state.data.map((flight, i) =>
    this.renderFlight(flight)
     )
  }

// METHOD TO RENDER ALL DEPARTURES
getDepartures() {
  this.setDepartureTabActive()
  var self = this
  fetch("http://localhost:8000/flights/departures")
    .then(data => data.json())
    .then(res => self.setState({ data: res }, function(){
    })).catch(function(e){
        console.log("Error:", e);
      })
    ;
};

// METHOD TO MARK ACTIVE TAB (DEPARTURES TAB)
  setDepartureTabActive(){
    this.setState({
      departuresActive: true,
      arrivalsActive: false,
      allFlightsActive: false
    })
  }

/// METHOD TO RENDER ALL ARRIVALS
getArrivals() {
  this.setArrivalsTabActive()
  var self = this
  fetch("http://localhost:8000/flights/arrivals")
    .then(data => data.json())
    .then(res => self.setState({ data: res }, function(){
    })).catch(function(e){
        console.log("Error:", e);
      })
    ;
};

// METHOD TO MARK ACTIVE TAB (ARRIVALS TAB)
  setArrivalsTabActive(){
    this.setState({
      departuresActive: false,
      arrivalsActive: true,
      allFlightsActive: false
    })
  }

// METHOD TO MARK ACTIVE TAB (ALL FLIGHTS TAB)
  setAllFlightsTabActive(){
    this.setState({
      departuresActive: false,
      arrivalsActive: false,
      allFlightsActive: true
    })
  }

// METHOD TO TURN SEARCH BAR TEXT INPUT TO 'QUERY'
handleInputChange(evt){
   this.setState({
     query: evt.target.value
   })
 }

// METHOD TO UTILISE FLIGHT NO.'QUERY'. Part 1 (THIS PRELOADS ALL FLIGHT NO's)
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

// METHOD TO UTILISE FLIGHT NO.'QUERY'. Part 2 (RETURNS FLIGHT AS AN OBJECT)
searchFlightNo() {
  var self = this
  fetch("http://localhost:8000/flights/flight/" + this.state.query)
    .then(data => data.json())
    .then(res => self.setState({ data: [res] }))
    .catch(function(e){
        console.log("Error:", e);
      })
    };


// METHOD TO RENDER/DISPLAY A SINGLE FLIGHT
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
          {/*<p className="flight-image">    Image: {flight.Image}                    </p>*/}
          {/*TODO: Figure how to render image from db as image, now string! */}
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


// -------------------  UI/RENDER SECTION (BELOW THIS LINE)   --------------------
  render() {
    if(this.state.data){
    return (

      <div className="homepage">

      {/*<img src={banner} style={{ height: "10%"}}/>*/}
      {/*NB: Indecisive as to whether this 'banner' is required, a design decision  to be made */}

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
            <h1>date / time</h1>
              <span class="foldable">
              <span>{this.state.curTime}</span>
            </span>
          </li>
        </ul>
        </div>

        <form className="searchform cf">
          <input
            placeholder="Enter Flight No. (NB: be exact!)"
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
                <li style={{color: this.state.arrivalsActive   ? '#299ae1' : 'black'}} onClick={this.getArrivals}>Arrivals</li>
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
          <main>
            <div className="loading">
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="container">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        </main>
        )
      }
    }
  }

export default App;

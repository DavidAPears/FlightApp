import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Anas", "Jean-Philippe"], ["Edmond", "Michael", "Jean-Philippe"], ["Anas", "Anas", "Jean-Philippe"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getDataFromDb", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Pierre Edouard", "Edmond", "Edmond"], ["George", "George", "Jean-Philippe"], ["George", "Jean-Philippe", "Jean-Philippe"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.getDataFromDb()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("renderAllFlights", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Pierre Edouard", "Edmond", "Michael"], ["Pierre Edouard", "Edmond", "Jean-Philippe"], ["Edmond", "Michael", "Pierre Edouard"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.renderAllFlights()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getDepartures", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Pierre Edouard", "George"], ["George", "George", "Michael"], ["Michael", "Edmond", "Jean-Philippe"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.getDepartures()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setDepartureTabActive", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Michael", "Jean-Philippe", "Michael"], ["Jean-Philippe", "Michael", "Michael"], ["Pierre Edouard", "Michael", "Anas"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.setDepartureTabActive()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getArrivals", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Jean-Philippe", "Anas"], ["Pierre Edouard", "Edmond", "Edmond"], ["Anas", "George", "George"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.getArrivals()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setArrivalsTabActive", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Michael", "Anas", "Jean-Philippe"], ["Pierre Edouard", "Jean-Philippe", "George"], ["Jean-Philippe", "George", "Edmond"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.setArrivalsTabActive()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setAllFlightsTabActive", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Michael", "Jean-Philippe"], ["Edmond", "Edmond", "Edmond"], ["George", "Jean-Philippe", "Pierre Edouard"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.setAllFlightsTabActive()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("handleInputChange", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "George", "Anas"], ["Michael", "Anas", "Pierre Edouard"], ["Anas", "Pierre Edouard", "Jean-Philippe"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.handleInputChange({ target: { value: "elio@example.com" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.handleInputChange({ target: { value: "Elio" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.handleInputChange({ target: { value: "Dillenberg" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.handleInputChange(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("handleFlightNoSubmit", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Michael", "Pierre Edouard", "Michael"], ["Edmond", "Anas", "George"], ["George", "Jean-Philippe", "Michael"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.handleFlightNoSubmit({ preventDefault: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.handleFlightNoSubmit({ preventDefault: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.handleFlightNoSubmit(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("searchFlightNo", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Jean-Philippe", "Edmond", "Pierre Edouard"], ["Pierre Edouard", "Edmond", "Anas"], ["Michael", "Pierre Edouard", "George"]]
        inst = new App.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.searchFlightNo()
        }
    
        expect(callFunction).not.toThrow()
    })
})

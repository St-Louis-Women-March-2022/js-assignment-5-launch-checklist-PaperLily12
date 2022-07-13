// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name} </li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance} </li>
        <li>Number of Moons: ${moons} </li>
    </ol>
    <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    } else if (isNaN(Number(testInput))) {
        return "Not a Number"
    } else {
        return "Is a Number"
    }
}

//checks all inputs for validity and displays an alert if it finds an invalid one
function checkAllInputs(inputsArray) {
    const expectedInputTypes = ["Not a Number", "Not a Number", "Is a Number", "Is a Number"]
    for (let i = 0; i < inputsArray.length; i++) {
        const inputType = validateInput(inputsArray[i])
        if (inputType !== expectedInputTypes[i]) {
            if (inputType === "Empty") {
                window.alert("All fields are required!")
                return false
            } else {
                window.alert("Please enter valid information for each field!")
                return false
            }
        }
    }
    return true
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const userInputs = [pilot, copilot, fuelLevel, cargoLevel]
    const faultyItems = document.getElementById("faultyItems")
    const launchStatus = document.getElementById("launchStatus")
    //stops the function from continuing if there is an invalid input
    if (checkAllInputs(userInputs) === false) {
        return
    }
    let shuttleReady = true
    list[0].innerHTML = `Pilot ${pilot} is ready for launch`
    list[1].innerHTML = `Copilot ${copilot} is ready for launch`
    if (Number(fuelLevel) < 10000) {
        list[2].innerHTML = "Fuel level too low for launch"
        shuttleReady = false
    }
    if (Number(cargoLevel) > 10000) {
        list[3].innerHTML = "Cargo mass too heavy for launch"
        shuttleReady = false
    }
    if (shuttleReady === true) {
        launchStatus.innerHTML = "Shuttle is ready for launch"
        launchStatus.style.color = "green"
    } else {
        launchStatus.innerHTML = "Shuttle not ready for launch"
        launchStatus.style.color = "red"
    }
    faultyItems.style.visibility = "visible"
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json()
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;

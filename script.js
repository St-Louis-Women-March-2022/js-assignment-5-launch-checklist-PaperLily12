// Write your JavaScript code here!

window.addEventListener("load", function () {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch()
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets)
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    })

    let submitButton = document.getElementById("formSubmit")
    submitButton.addEventListener("click", function (event) {
        event.preventDefault()
        let inputFields = Array.from(document.querySelectorAll("input[type=text]"))
        let answerValues = inputFields.map(item => item.value)
        let list = Array.from(document.querySelectorAll("li[data-testid]"))
        console.log(list)
        formSubmission(document, list, ...answerValues)
    })
});


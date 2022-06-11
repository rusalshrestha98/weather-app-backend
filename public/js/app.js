// returns the first Element within the document that matches the specified selector, or group of selectors
const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// addEventListener(name of event, function to run) sets up a function that will be called whenever 
// the specified event is delivered to the target
weatherform.addEventListener("submit", (e) => {
    // prevents server from refreshing the page which is the default event
    e.preventDefault()

    // Rendering some default text before the fetch for weather data occurs
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // extracts/stores the input the user types into the search field 
    const location = search.value

    // takes the users input and passes it into the URL being used by the fetch function
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})


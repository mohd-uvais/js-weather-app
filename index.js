const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");


async function fetchData(targetCity) {
    // Making the API Request

    try {

        const url = `https://api.weatherapi.com/v1/current.json?key=a34c6302aed0406da4011342241304&q=${targetCity}&aqi=no`

        const response = await fetch(url)

        const responseBody = await response.json()

        const currentTemp = responseBody.current.temp_c
        const currentCondition = responseBody.current.condition.text
        const locationName = responseBody.location.name
        const localTimeAndDate = responseBody.location.localtime
        const currentConditionEmoji = responseBody.current.condition.icon

        // Split localTime into date and time
        const localDate = localTimeAndDate.split(" ")[0]
        const localTime = localTimeAndDate.split(" ")[1]

        const localDateJS = (new Date(localDate)).toLocaleDateString('en-us', {
            weekday: 'long', year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        // Update the UI
        updateUI(currentTemp, locationName, `${localTime} ${localDateJS}`, currentConditionEmoji, currentCondition)
    } catch (error) {
        console.error(error)
    }

}

// Event listener to my submit button
form.addEventListener("submit", handleSearch)

// Get the value from the searchField and call FetchData
function handleSearch(e) {
    // This is done to prevent the default
    // Behavior of submitting a form i.e refreshing the page
    e.preventDefault()
    const cityName = searchField.value

    fetchData(cityName)
}

function updateUI(temp, locationName, time, emoji, conditionName) {
    temperatureField.innerText = temp
    cityField.innerText = locationName
    emojiField.src = emoji
    weatherField.innerText = conditionName
    dateField.innerText = time
}


// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json()
//             .then((data) => {
//                 console.log(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })
//     .catch((err) => {
//         console.log(err);
//     })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value
    fetch('/weather?address=' + location)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageTwo.textContent = ''
                        messageOne.textContent = 'The current temperature outside is ' + data.forecast.temperature + '°C and the propability of precipitation is ' + data.forecast.Rainchance + '%.';
                    }
                })
        })
})
'use strict'
/*
This file will register an event from a button tag through a click which will
be requesting data from an API. The event will call a function which both 
fetches data from an API using promises and if server connection is a success
will call another function to render the data into our DOM.
*/

// create row in our table tag
function createRowFromAPI(result) {
    return`
        <tr>
            <td><img src="${result.picture.thumbnail}" alt="Thumbnail"></td>
            <td>
                <a href="mailto:${result.email}">
                ${result.name.first} 
                ${result.name.last}
                </a>
            </td>
            <td>${result.phone}</td>
            <td>${result.location.city}</td>
        </tr>
    `;
}

// fetch data from API and Render data to DOM
async function fetchData(event) {
    event.preventDefault();
    // create variable representing <tBody> for conditional statement
    const tBodyId = document.getElementById('userData').getAttribute('id');
    const url = tBodyId === 'userData' ? "https://randomuser.me/api/" : "/submit-fetch-data"; 

    try {
        const promisedResponse = await fetch(url);
        const promisedData = await promisedResponse.json();

        if (promisedResponse.ok) {
            // Call function to render rows into <tBody>
            document.getElementById('userData').innerHTML += createRowFromAPI(promisedData.results[0]);
            // Success message to corresponding <p>
            document.getElementById('successMessage').innerHTML = 'Data fetched successfully!';
        } else {
            throw new Error(`API responded with status: ${promisedResponse.status}`);
        }
    } catch (error) {
        // Failure message to corresponding <p>
        document.getElementById('failureMessage').innerHTML = `Error: ${error.message}`;
    }
}

// Event Listener from <button>
const fetchDataButton = document.getElementById('fetchDataButton');
fetchDataButton.addEventListener('click', fetchData); 

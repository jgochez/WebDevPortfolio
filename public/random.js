'use strict'

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

// fetch data from API
async function fetchData(event) {
    event.preventDefault();
    // create variable representing <tBody> for conditional statement
    const tBodyId = document.getElementById('userData').getAttribute('id');
    const conditionalURL = tBodyId === 'userData' ? "https://randomuser.me/api/" : "/submit-fetch-data"; 

    try {
        const promisedResponse = await fetch(conditionalURL);
        const promisedData = await promisedResponse.json();

        if (response.ok) {
            // Call function to render rows into <tBody>
            document.getElementById('userData').innerHTML += createRowFromAPI(promisedData.results[0]);
            // Success message to corresponding <p>
            document.getElementById('successMessage').innerHTML = 'Data fetched successfully!';
        } else {
            throw new Error(`API responded with status: ${response.status}`);
        }
    } catch (error) {
        // Failure message to corresponding <p>
        document.getElementById('failureMessage').innerHTML = `Error: ${error.message}`;
    }
}

// Event Listener from <button>
const fetchDataButton = document.getElementById('fetchDataButton');
fetchDataButton.addEventListener('click', fetchData); 

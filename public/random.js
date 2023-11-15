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
    const tbodyId = event.target.getAttribute('id'); // event.target => button
    // if {tbodyId === 'userData'} => url = "https://randomuser.me/api/" 
    //elif {tbodyId !== 'userData'} => url = "/endpoint"
    const url = tbodyId === 'fetchDataButton' ? "https://randomuser.me/api/" : "/submit-fetch-data"; 

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Call function to render rows 
            document.getElementById('userData').innerHTML += createRowFromAPI(data.results[0]);

            // Success message
            document.getElementById('successMessage').innerHTML = 'Data fetched successfully!';
        } else {
            throw new Error(`API responded with status: ${response.status}`);
        }
    } catch (error) {
        // Error handling
        document.getElementById('failureMessage').innerHTML = `Error: ${error.message}`;
    }
}

// Event Listener
document.getElementById('fetchDataButton').addEventListener('click', fetchData); // Call the async function

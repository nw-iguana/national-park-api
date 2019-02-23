'use strict'

const apiKey = 'FWtmVOzdqntuAKk0MpomtpDOZ4x26ccA2konf5qT';

function watchForm(){
    $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    let results = searchTerm.map(element => `stateCode=${element}&`).join('');
    getParks(results, maxResults);
    });
}

function getParks(results, maxResults=10) {
    const url = `https://developer.nps.gov/api/v1/parks?${results}limit=${maxResults-1}&api_key=${apiKey}`
    fetch (url)
    .then(response => response.json())
    .then(responseJson => renderResults(responseJson))
}

function renderResults(responseJson){
    
    let renderResults = responseJson['data'].map(obj => {
        return `
    <li>
        <h3>
        ${obj.fullName}
        </h3>
        <p>
            ${obj.description}
        </p>
        <a href="${obj.url}">${obj.url}</a>
    </li>`
    });

    $('#results-list').html(renderResults);
}
    


function loadPage() {
watchForm();
}

console.log('Javascript file is working');
$(loadPage);

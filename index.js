'use strict';

// fetch the url
function getNews(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}
function displayResults(responseJson) {
  console.log("working", responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  const repos = responseJson.map(function(repo) {
    return `<li><h3>${repo.name}</h3></li>
    <li><a href="${repo.html_url}">${repo.html_url}</a><li>`;
  });
  console.log('it works', repos);
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(repos)
      /*`<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      <img src='${responseJson.articles[i].urlToImage}'>
      </li>`
    )};*/
  //display the results section  
  $('#results').removeClass('hidden');
};

//when clicking the form, get the value from the search term
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    getNews(username);
  });
}

$(watchForm);
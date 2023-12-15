import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  let dogDiv = document.getElementById('dog-image');
  axios.get('https://dog.ceo/api/breeds/image/random').then((response) => {
    const image = response.data.message;
    let imgTag = document.createElement('img');
    imgTag.src = image;
    dogDiv.appendChild(imgTag);
  });
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  const response = await axios.get(`/weather.txt?zipcode=${zipcode}`);
  document.querySelector("#weather-info").innerText = response.data;
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault();
  const cookieType = document.getElementById('cookie-type-field').value;
  const qty = document.getElementById('qty-field').value;
  const order = {
    cookieType: cookieType,
    qty: qty
  };
  const response = await axios.post('/order-cookies.json', order);
  if(response.data.resultCode === 'ERROR') {
    document.querySelector('#order-status').style.color = 'red';
  } else {
    document.querySelector('#order-status').style.color = 'black';
  }
  document.querySelector('#order-status').innerHTML = response.data.message;
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  const results = await axios.get(url);
  console.log(results);

  // TODO: In the #itunes-results list, show all results in the following format:
  // 
  const itunesList =  document.getElementById('itunes-results');
  for(let i = 0; i < results.data.results.length; i++) {
    let newLI = document.createElement('li');
    const artistName =  results.data.results[i].artistName;
    const trackName = results.data.results[i].trackName;
    newLI.innerHTML = `Artist: ${artistName} Song: ${trackName}`;
    itunesList.appendChild(newLI);
  }

}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);

let usersArray = [];
let currentIdx = 0;
let usersPerPage = 8;

function clearRandomUserDisplay() {
  const grid = document.getElementById("randomUser");
  grid.innerHTML = "";
}

function getData() {
  console.log("Loading user data");
  usersArray = [];
  fetch("https://randomuser.me/api/?results=50&nat=dk,fr,gb,de,es")
    .then((response) => response.json())
    .then((data) => data.results.forEach((user) => usersArray.push(user)))
    .then(() => render())
    .catch((error) => console.error("Error", error));
}

function getDataWithParams(countryParam, genderParam) {
  usersArray = [];
  const queryParam = new URLSearchParams({
    results: 50,
    nat: countryParam,
    gender: genderParam,
  });
  console.log("Loading user data with params: " + queryParam);
  fetch("https://randomuser.me/api/?" + queryParam)
    .then((response) => response.json())
    .then((data) => data.results.forEach((user) => usersArray.push(user)))
    .then(() => clearRandomUserDisplay())
    .then(() => render())
    .catch((error) => console.error("Error", error));
}
// bug when writing more than 5 countries in URL https://randomuser.me/api/?nat=dk,fr,gb,de,ie,es,it,nl,no 

function render() {
  console.log(usersArray);
  const grid = document.getElementById("randomUser");

  const userToDisplay = usersArray.slice(currentIdx, currentIdx + usersPerPage);

  userToDisplay.forEach((user) => {
    console.log(user);
    const userDiv = document.createElement("div");
    userDiv.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");
    userDiv.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}" style="width:100%">
              <h3 class="full-name">${user.name.first} ${user.name.last}</h1>
              <p>Age: ${user.dob.age}</p>
              <p>Gender: ${user.gender}</p>
              <p>Location: ${user.location.city}, ${user.location.country}</p>
              <button type="button" class="btn btn-outline-primary btn-sm">Connect</button>
              <br>
    `;
    grid.appendChild(userDiv);
  });

  currentIdx += usersPerPage;

  if (currentIdx > usersArray.length) {
    document.getElementById("load-more").style.display = "none";
  }
}

function searchByName() {
  let input, filter, ul, card, a, i, txtValue;
  input = document.getElementById("search-box");
  filter = input.value.toUpperCase();
  ul = document.getElementById("randomUser");
  card = ul.getElementsByClassName("card");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < card.length; i++) {
    a = card[i].getElementsByClassName("full-name")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
      // document.getElementById("load-more").style.display = "none";
    } else {
      card[i].style.display = "none";
    }
  }
}

document.getElementById("load-more").addEventListener("click", render);

getData();

/* collapse sidebar filter */
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

function countryFilterParam(filterCountry) {
  let countries = "";
  for (let i = 0; i < filterCountry.length; i++) {
    const country = filterCountry[i]
    if (country.checked) {
      if (countries != "") {
        countries += ",";
      }
      countries += country.value;
    }
  }
  console.log("countries: " + countries);
  return countries;
}

function genderFilterParam(filterGender) {
  let gender = "";
  for (let i = 0; i < filterGender.length; i++) {
    const genderChoice = filterGender[i]
    if (genderChoice.checked) {
      if (genderChoice.value === "both") {
        gender = "";
      } else {
        gender = genderChoice.value;
      }
    }
  }
  console.log("gender: " + gender);
  return gender;
}


function applyFilters() {
  //Fetch all checkboxes in country filter
  const filterCountry = document.getElementById("country-filter").getElementsByTagName("input");
  const countryParam = countryFilterParam(filterCountry);
  //Fetch all radio buttons in gender filter
  const genderFilter = document.getElementById("gender-filter").getElementsByTagName("input");
  const genderParam = genderFilterParam(genderFilter);
  getDataWithParams(countryParam, genderParam);

}

function clearFilters() {
  document.getElementById("country-filter").reset();
  document.getElementById("gender-filter").reset();
  //Fetch new data without any filters
  getDataWithParams("","");
}

document.getElementById("save-filter").addEventListener("click", applyFilters);
document.getElementById("clear-filter").addEventListener("click", clearFilters);

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
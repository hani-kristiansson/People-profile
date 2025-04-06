let usersArray = [];
let currentIdx = 0;
let usersPerPage = 8;

const greetings = new Map([
  ["DK", "Hej"],
  ["FR", "Bonjour"],
  ["GB", "Hello"],
  ["DE", "Hallo"],
  ["ES", "Hola"],
]);

// clear out old data for array
function clearRandomUserDisplay() {
  const grid = document.getElementById("randomUser");
  grid.innerHTML = "";
}

function getData() {
  console.log("Loading user data");
  usersArray = [];

  // bug when more than 5 countries in URL https://randomuser.me/api/?nat=dk,fr,gb,de,ie,es,it,nl,no
  fetch("https://randomuser.me/api/?results=50&nat=dk,fr,gb,de,es")
    .then((response) => response.json())
    .then((data) => data.results.forEach((user) => usersArray.push(user)))
    .then(() => render())
    .catch((error) => console.error("Error", error));
}

// method to get data after saving filter 
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

function render() {
  console.log(usersArray);
  const grid = document.getElementById("randomUser");

  const userToDisplay = usersArray.slice(currentIdx, currentIdx + usersPerPage);
  let userIndex = currentIdx;

  userToDisplay.forEach((user) => {
    console.log(user);
    const userDiv = document.createElement("div");
    userDiv.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");
    userDiv.innerHTML = `
        <div class="user-image">
          <img src="${user.picture.large}" alt="${user.name.first}" style="width:100%">
        </div>

        <div class="user-content">
          <h3 class="full-name">${user.name.first} ${user.name.last}</h3>
          <p>Age: ${user.dob.age}</p>
          <p>Gender: ${user.gender}</p>
          <p>Country: ${user.location.country} </p>
          <p>City: ${user.location.city}  </p>
        </div>

        <div class="user-connect">
          <button type="button" class="btn btn-outline-primary btn-sm" onclick="connectButton('${userIndex}')" >Connect</button>
        </div>
    `;
    grid.appendChild(userDiv);
    userIndex += 1;
  });

  currentIdx += usersPerPage;

  // when load is done, hide load more button 
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

  for (i = 0; i < card.length; i++) {
    a = card[i].getElementsByClassName("full-name")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
      // document.getElementById("load-more").style.display = "none"; to hide button after search, not working
    } else {
      card[i].style.display = "none";
    }
  }
}

document.getElementById("load-more").addEventListener("click", render);

getData();

// collapse sidebar filter
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

function countryFilterParam(filterCountry) {
  let countries = "";

  for (let i = 0; i < filterCountry.length; i++) {
    const country = filterCountry[i];

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
    const genderChoice = filterGender[i];

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

function renderUserInModal(userId) {
  const user = usersArray[userId];
  const titelInModal = document.getElementById("modal-body-titel");
  const bodyInModal = document.getElementById("modal-body-greeting");
  bodyInModal.innerHTML = "";
  const userDiv = document.createElement("div");
  userDiv.innerHTML = `
      <form>
        <div class="form-group">
          <label for="senderEmail">Sender email</label>
          <input type="email" class="form-control" id="senderEmail" placeholder="name@example.com">
          <label for="senderNameInput">Sender name</label>
          <input type="text" class="form-control" id="senderNameInput" placeholder="John, Doe">
        </div>

        <div class="form-group">
          <label for="emailBodyInput">Message</label>
          <textarea class="form-control" id="emailBodyInput" rows="3">${greetings.get(
            user.nat
          )}, ${user.name.first}.</textarea>
        </div>

        <button type="submit" class="btn btn-primary">Send message</button>
      </form>
  `;
  titelInModal.textContent = `Connect with ${user.name.first} ${user.name.last}`;
  bodyInModal.appendChild(userDiv);
}

function connectButton(userId) {
  renderUserInModal(userId);
  $("#connectModal").modal("show");
}

function applyFilters() {
  // Fetch all checkboxes in country filter
  const filterCountry = document
    .getElementById("country-filter")
    .getElementsByTagName("input");
  const countryParam = countryFilterParam(filterCountry);

  // Fetch all radio buttons in gender filter
  const genderFilter = document
    .getElementById("gender-filter")
    .getElementsByTagName("input");
  const genderParam = genderFilterParam(genderFilter);
  getDataWithParams(countryParam, genderParam);
}

function clearFilters() {
  document.getElementById("country-filter").reset();
  document.getElementById("gender-filter").reset();
  //Fetch new data without any filters, still limit countries
  getDataWithParams("", "dk,fr,gb,de,es");
}

document.getElementById("save-filter").addEventListener("click", applyFilters);
document.getElementById("clear-filter").addEventListener("click", clearFilters);

var collapsible = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
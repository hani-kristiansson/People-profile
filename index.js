let usersArray = [];
let currentIdx = 0;
let usersPerPage = 8;

function getData() {
  console.log("Loading user data")
  fetch("https://randomuser.me/api/?results=50&nat=dk,fr,gb,de,es")
    .then((response) => response.json())
    .then((data) => data.results.forEach((user) => usersArray.push(user)))
    .then(()=> render())
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

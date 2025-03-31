function getData() {
  fetch("https://randomuser.me/api/?results=40")
    .then((response) => response.json())
    .then((data) => render(data.results))
    .catch((error) => console.error("Error", error));
}

function render(users) {
  console.log(users);

  const grid = document.getElementById("randomUser");
  grid.innerHTML = "";

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("card", "col-lg-3", "col-md-6", "col-sm-12");
    userDiv.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}" style="width:100%">
              <h1>${user.name.first} ${user.name.last}</h1>
              <p>Age: ${user.dob.age}</p>
              <p>City: ${user.location.city}</p>
              <br>
    `;
    grid.appendChild(userDiv);
  });
}

getData();

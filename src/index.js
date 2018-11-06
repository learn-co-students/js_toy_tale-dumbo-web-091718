

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// 1. Get toy data from JSON db
let toys;

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => {createToyCollection(json);
  toys = json})

// 2. Create template for toy card
function createCard(toy){
  let toyCard = document.createElement('div');
  toyCard.className = 'card';
  toyCard.id = `${toy.id}`;
  toyCard.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
  toyContainer.appendChild(toyCard);
}

// 3. Iterate through toys creating toy  card for each
function createToyCollection(toys){
for(let i = 0; i < toys.length; i++){
  createCard(toys[i]);
}}

// 4. Handle functionality that increases each toys' like count
document.addEventListener("click", function(event){
  if (event.target.className === "like-btn"){
    let thisLikeButton = event.target.parentElement.querySelector("p")
    let thisToy = toys[event.target.parentElement.id - 1]
    updateLikes(thisToy);
    thisLikeButton.innerText = `${thisToy.likes} Likes`;
  }
})

function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body:
  JSON.stringify({
    "likes": ++toy.likes
  })
})
}

// 5. Handle functionality that allows for the creation of new cards
const formInputs = document.querySelectorAll(".input-text");
const toyFormContainer = document.querySelector(".add-toy-form");

toyFormContainer.addEventListener("submit", function(event){
  event.preventDefault();
  let toyName = formInputs[0].value;
  let toyImg = formInputs[1].value;

  addToyDataToJson({"name": toyName, "image": toyImg, "likes": 0});
})

function addToyDataToJson(toyInfo){
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body:
  JSON.stringify(toyInfo)
}).then(res => res.json())
}

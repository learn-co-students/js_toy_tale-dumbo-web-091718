const showToyForm = document.querySelector('#new-toy-btn') //better name
const formContainer = document.querySelector('.container') // Just Hide && Unhide
const createToyForm = document.querySelector(".add-toy-form") //works
const BASE_URL = "http://localhost:3000/toys"
allToys = document.querySelector('#toy-collection')
let addToy = false
const submitToy = document.querySelector('.submit')
// console.log(addToy);

document.addEventListener("DOMContentLoaded", init)

// YOUR CODE HERE
showToyForm.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    formContainer.style.display = 'block'
    // submit listener here
  } else {
    formContainer.style.display = 'none'
  }
})
function init(){
  allToys.addEventListener("click", handleActions)
  createToyForm.addEventListener("submit", handleSubmit) //is this necessary or can i just call in Action or make a listiner function upon init

  fetch(BASE_URL)
    .then(toys => toys.json())
    .then(toys => {
      toys.forEach(toy => {
        render(toy)
      })
    })
}

function render(toy){
 allToys.innerHTML += `
     <div class=card data-id=${toy.id}>
       <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
       <button class="like-btn">Like <3</button>
       <button class="patch-btn">Patch it</button>
       <button class="delete-btn">Delete</button>
     </div>
   `
// debugger
   console.log(allToys)
}

function handleSubmit(e){
  e.preventDefault()
  let nameInput = document.querySelector('input[name="name"]')
  let imageInput = document.querySelector('input[name="image"]') //could this be image="image"?

  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({ name: nameInput.value, image: imageInput.value, likes: 0 })
  })
  .then(toy => toy.json)
  .then(toy => render(toy))

  nameInput = ''; // Reset inputs
  imageInput ='';
  // console.log('Action on the ' + e.target.className);
}

function handleActions(e) {
  console.log('event targettttt', e.target);
  if (e.target.className == 'like-btn') {
    likeToy(e);
  } else if (e.target.className == 'delete-btn') {
    deleteToy(e);
  } else if (e.target.className == 'patch-btn') {
    patchToy(e)
  }
}

function likeToy(e) {
  const toyId = parseInt(e.target.parentElement.dataset.id);

  const likesNum = e.target.previousElementSibling //"1 Likes " STring
  //console.log('event targettttt heyyy', likesNum);
  let likesParsed = parseInt(likesNum.innerText.split(" ")[0])// likesParsed Database to replace value
  likesNum.innerText =  `${++likesParsed} Likes` // Return on page
//console.log('event targettttt inside func', toyId, likesParsed);

  fetch(`${BASE_URL}/${toyId}`, {
    method: "PATCH",
    headers:{
      "Content-Type":"application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({likes: likesParsed})
  }).then(res => res.json())
  .then(res => render(res) )

}
//  Onload(pass init) /in init fetch and iterate call render/ in render build html/

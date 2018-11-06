const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded',()=>{
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys=>{
    toys.forEach(toy => {
      render(toy)
    })
  })
})

//function to render toys on page
let toyCollection = document.getElementById('toy-collection')
function render(toy){
  toyCollection.innerHTML += `<div class="card" data-id = ${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes </p>
      <button class="like-btn">Like <3</button>
    </div>` 
}

//code to add toys to database and page without refresh
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let form = document.querySelector('form.add-toy-form')

    form.addEventListener('submit', (event)=>{
      event.preventDefault()
      let newToy = {}
      newToy.name = event.target[0].value
      newToy.image = event.target[1].value
      newToy.likes = 0 
      createToy(newToy)
      event.target.reset //gotta make this work
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function createToy(newToy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(newToy),
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
  .then(toy => render(toy))
  
}

//code to add likes to database instance and page without refresh
toyCollection.addEventListener('click', ()=>{
  if(event.target.className === 'like-btn'){
    let toyId = event.target.parentElement.dataset.id
    let newLikes = parseInt(event.target.previousElementSibling.firstChild.innerText) + 1
    
    event.target.previousElementSibling.firstChild.innerText = newLikes 
    addLike(toyId, newLikes)
  }
})

function addLike(toyId, newlikes){
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({likes: newlikes})
  })
}






// OR HERE!



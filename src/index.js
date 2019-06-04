const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.getElementById('toy-collection')
let url = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE
function renderToys(){
  fetch(url).then(function(response){
      return response.json()
    }).then(function(json){
      toyCollection.innerHTML = ""
      json.forEach(function(toy){
        toyCollection.innerHTML += `<div class="card">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p class="likes" id="${toy.id}">${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>`
      })
    })
}

function postToy(toyName, toyImage){
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
}

// function patchToy(id, likeNumber){
//   fetch(`${url}/${Number(id)}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accepts": "application/json"
//     },
//     body: JSON.stringify({
//       likes: likeNumber
//     })
//   })
// }

window.addEventListener("load", function(event){
  renderToys()
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener("submit", function(event){
      event.preventDefault()
      let name = event.target[0].value
      let image = event.target[1].value
      postToy(name, image)

      event.target.reset()

      renderToys()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

toyCollection.addEventListener("click", function(event){
  if (event.target.className === "like-btn"){
    let id = event.target.previousElementSibling.id
    let newLikes = Number(event.target.previousElementSibling.innerHTML.split(" ")[0]) + 1
    // patchToy(id, likeNumber).then(function(){
    //   renderToys()
    // })
    fetch(`${url}/${Number(id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        likes: Number(event.target.previousElementSibling.innerHTML.split(" ")[0]) + 1
      })
    }).then(function(){
      renderToys()
    })
  }
})


// OR HERE!

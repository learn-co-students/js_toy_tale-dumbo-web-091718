const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// document.addEventListener('DOMContentLoaded', init)

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

// function init() {
//   console.log('loaded');
// }

// OR HERE!
const toyCollectionId = document.querySelector("#toy-collection")
const createNewToyButton = document.querySelector(".submit")
const toyNameInput = document.querySelector("#name")
const toyImageInput = document.querySelector("#image")
const toyLikeButton = document.querySelector(".like-btn")
// const totalLikes = document.querySelector(toyLikeButton).previousElementSibling
// console.log(totalLikes)
// const toyCardContainer = document.querySelector(".card")

fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json()
})
.then(function(json) {
  json.forEach(function(toy) {
    toyCollectionId.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>
  </div>`
  })
})


createNewToyButton.addEventListener('click', function(event) {
  event.preventDefault()
  fetch('http://localhost:3000/toys', {
   method: "POST",
   headers: {
     'Content-Type': 'application/json',
     'Accepts': 'application/json'
   },
   body: JSON.stringify({
     name: toyNameInput.value,
     image: toyImageInput.value
   })
 }).then(function(response) {
   return response.json()
 }).then(function(json) {
   console.log(json)
 })
})

toyCollectionId.addEventListener('click', function(event) {
  let strLikes = event.target.previousElementSibling
  let intLikes = parseInt(strLikes.innerHTML)
  if (event.target.className === "like-btn") {
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          likes: ++intLikes
        })
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        strLikes.innerHTML = intLikes
      })
     }
  })

  // // secure way to add likes
  // toyCollectionId.addEventListener('click', function(event) {
  // let strLikes = event.target.previousElementSibling
  // // let intLikes = parseInt(strLikes.innerHTML)
  // // debugger
  // if (event.target.className === "like-btn") {
  //   fetch(`http://localhost:3000/toys/${event.target.dataset.id}`)
  //   .then(function(response) {
  //     return response.json()
  //   .then(function(json) {
  //     fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
  //         method: "PATCH",
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accepts': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           likes: ++json['likes']
  //         })
  //       }).then(function(response) {
  //         return response.json()
  //       }).then(function(json) {
  //         // I wanna be able to display the likes on the dom
  //         console.log(json)
  //         strLikes.innerHTML = json['likes']
  //       })
  //      })
  //     })
  //   }
  // })
  //

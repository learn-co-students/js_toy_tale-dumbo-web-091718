const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyAdd = document.querySelector('.add-toy-form')
const toyList = document.querySelector('#toy-collection')

const TOY_URL = `http://localhost:3000/toys`
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

document.addEventListener('DOMContentLoaded', function () {

    fetch(TOY_URL)
    .then(function(res){
      return res.json()
    })
    .then(function(json){
      console.log(json);

      json.forEach(function(toy) {
        toyList.innerHTML += ` <div class="card" data-id="${toy.id}">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div> `
      })

      toyAdd.addEventListener('submit', function(event){
        // debugger
        event.preventDefault()
        let name = event.target[0].value
        let image = event.target[1].value
        let val = 0
        // debugger
        fetch(TOY_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            image: image,
            likes: val
          })
        })
        .then(function(res){
          return res.json()
        })

        .then(function(toy){

          toyList.innerHTML += ` <div class="card" data-id="${toy.id}">
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button class="like-btn">Like <3</button>
          </div> `
        })

      })

      toyList.addEventListener('click', function(event) {
        if (event.target.className === 'like-btn') {
          // debugger
          let likesId = event.target.parentNode.dataset.id
          let likes = parseInt(event.target.previousElementSibling.innerHTML[0])
          likes++
          // debugger
          event.target.previousElementSibling.innerHTML = likes + " Likes"

          fetch(TOY_URL + `/${likesId}`, {
            method: "PATCH",

            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              likes: likes
            })
          })
          .then(function(res){
            return res.json()
          })
          .then(function(json) {
            return json
          })

        }
      })

    })
})


// OR HERE!

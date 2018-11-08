
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const url = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE

// display all toy cards
fetch(url)
  .then( response => response.json() )
  .then( json => {

    json.forEach( toy => {
      toyCollection.innerHTML += `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p data-id="${toy.id}">${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete</button>
    </div>`
    })
  })


  // add a new toy
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here

      toyForm.addEventListener('submit', (event) => {
        event.preventDefault()

        let nameValue = document.querySelector('input[name="name"]')
        let imageValue = document.querySelector('input[name="image"]')

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify({
            name: nameValue.value,
            image: imageValue.value,
            likes: 0 // default of 0 likes
          })
        })
        .then( response => response.json() )
        .then( json => {

          toyCollection.innerHTML += `<div class="card">
          <h2>${json.name}</h2>
          <img src=${json.image} class="toy-avatar" />
          <p data-id="${json.id}">${json.likes} Likes </p>
          <button class="like-btn">Like <3</button>
          <button class="delete-btn">Delete</button>
        </div>`
        })

      event.target.reset()

      })

    } else {
      toyForm.style.display = 'none'
    }
  })

// add a like/delete a toy
toyCollection.addEventListener('click', (event) => {

  let toyId = event.target.previousElementSibling // <p> tag
  let numLikes = parseInt(toyId.innerHTML)

  // like toy
  if (event.target.className === 'like-btn') {
    // console.log(event.target)
    fetch(url + '/' + toyId.dataset.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        // persists 'like update' to database
        likes: ++numLikes
      })
    })
    .then( response => response.json() )
    .then( json => {

      // frontend update
      toyId.innerHTML = `${numLikes} Likes`

    })
  }

  // delete toy
  if (event.target.className === 'delete-btn') {

    // delete from database
    fetch(url + '/' + toyId.previousElementSibling.dataset.id, {
      method: 'DELETE'
    })

    // delete from frontend
    event.target.parentNode.remove()

  }

})

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

// document.addEventListener('DomContentLoaded', () => {

  let toyContainer = document.getElementById('toy-collection')

  fetch('http://localhost:3000/toys')
  .then( (response) => {
    return response.json()
  })
  .then( (json) => renderToyCollection(json) )


  // render entire toy collection in database
  function renderToyCollection(list) {

    list.forEach( (toyObject) => {
      toyContainer.innerHTML += `<div class="card">
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p>${toyObject.likes} Likes </p>
    <button class="like-btn" id='${toyObject.id}'>Like <3</button>
  </div>`
    })

  }

  // POST method to add new toy
  function renderNewToy(url) {

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        "name": event.target[0].value,
        "image": event.target[1].value,
        "likes": 0
      })
    })
    .then( (response) => {
      return response.json()
    })
    .then( (json) => {
      toyContainer.innerHTML += `<div class="card">
    <h2>${json.name}</h2>
    <img src=${json.image} class="toy-avatar" />
    <p>${json.likes} Likes </p>
    <button class="like-btn" id='${json.id}'>Like <3</button>
  </div>`
    })

  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here

      toyForm.addEventListener('submit', (event) => {
        event.preventDefault()

        renderNewToy('http://localhost:3000/toys')
        // debugger

        event.target.reset()
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  // PATCH method to like a toy
  function renderLikeToy(url, eventId) {

    fetch(url + '/' + eventId)
    .then( response => response.json() )
    .then( json => {


      fetch(url + '/' + eventId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          likes: json.likes + 1
        })
      })
      .then( (response) => {
        return response.json()
      })
      .then( json => {
        console.log(json)
      })
    })

  }

  // LIKE BUTTON
  toyContainer.addEventListener('click', (event) => {

    let toyCard = document.getElementsByClassName('card')

    if (event.target.className === 'like-btn') {

      let likecount = event.target.previousElementSibling
      likecount.innerHTML = `${parseInt(likecount.innerHTML) + 1} Likes`

      renderLikeToy('http://localhost:3000/toys', event.target.id)
    }
  })


// })


// OR HERE!

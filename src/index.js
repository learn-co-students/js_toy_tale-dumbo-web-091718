window.addEventListener('load', function(event) {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE
  let toyCon = document.getElementById("toy-collection")

  fetch('http://localhost:3000/toys')
    .then( res => res.json())
    .then( json => renderToy(json))

  function addNewToy(toy) {
    toyCon.innerHTML += `<div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
  }

  function renderToy(toyList) {
    toyList.forEach( toy => {
      addNewToy(toy)
    })
  }

  let formForNewToy = document.querySelector(".add-toy-form")

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
        formForNewToy.addEventListener('submit', event => {
          event.preventDefault()

          let name = event.target[0]
          let image = event.target[1]

          postToy(event)
          .then(response => response.json())
          .then( toy => {
            addNewToy(toy)
          })

          event.target.reset()
        })
    } else {
      toyForm.style.display = 'none'
    }
  })

  function postToy(event) {
    return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        name: event.target[0].value,
        image: event.target[1].value,
        likes: 0
      })
    })
  }

  toyCon.addEventListener('click', event => {
    event.preventDefault()
    if (event.target.tagName === 'BUTTON') {
      // debugger
      let likeCount = event.target.previousElementSibling.firstElementChild
      likeCount.innerText = Number(likeCount.innerText) + 1

      updateLike(parseInt(event.target.parentElement.id), 'http://localhost:3000/toys', likeCount)
    }
  })

  function updateLike(toyId, url, likeCount) {
    fetch(url + '/' + toyId, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        likes: Number(likeCount.innerText)
      })
    })
  }

})

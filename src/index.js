document.addEventListener("DOMContentLoaded", function(event) {
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')
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

fetch(`http://localhost:3000/toys`)
.then(res=>res.json())
.then(json=>json.forEach(obj=>toyCollection.innerHTML += `
    <div class="card" >
      <h2>${obj.name}</h2>
      <img src="${obj.image}" class="toy-avatar">
      <p>${obj.likes} </p>
      <button class='like-btn' data-id="${obj.id}">Like</button>
      <button class='delete-btn' delete-id ="${obj.id}">Delete</button>
    </div>
    `))

form.addEventListener('submit',(event)=>{
  event.preventDefault()
  fetch(`http://localhost:3000/toys`, {
            method: "POST",
            headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.querySelectorAll('input')[0].value,
            image: form.querySelectorAll('input')[1].value,
            likes: 0
          })
        })
        .then(res=>res.json())
        .then(json=>toyCollection.innerHTML += `
            <div class="card" >
              <h2>${json.name}</h2>
              <img src="${json.image}" class="toy-avatar">
              <p>${json.likes} </p>
              <button class='like-btn' data-id="${json.id}">Like</button>
              <button class='delete-btn' delete-id ="${json.id}">Delete</button>
            </div>
            `)
          })

          toyCollection.addEventListener("click",(event)=>{
          if (event.target.hasAttribute('data-id')){
            const like_num = event.target.previousElementSibling
            like_num.innerText = parseInt(like_num.innerText)+1
              let id = event.target.getAttribute('data-id')
              fetch(`http://localhost:3000/toys/${id}`,{
                method: 'PATCH',
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                   likes: like_num.innerText
              })
          })
        }
        })
        toyCollection.addEventListener("click",(event)=>{
          if (event.target.hasAttribute('delete-id')){
            event.target.parentElement.remove()
            let id = event.target.getAttribute('delete-id')
            fetch(`http://localhost:3000/toys/${id}`,{
              method: 'DELETE'
            })
          }
        })
})

// OR HERE!

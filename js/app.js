const comments = JSON.parse(DATA);
console.log(comments);
const showcaseEl = document.getElementById("showcase");
const searchFormEl = document.getElementById('searchForm')
const smsCounterAllEl = document.getElementById('smsCounterAll')
const smsCounterUnseenEl = document.getElementById('smsCounterUnseen')


renderCardShowcase(comments, showcaseEl);




showcaseEl.addEventListener('click', e => {
  const messageEl = e.target.closest('.comments')
  if (messageEl) {
    const messageId = messageEl.dataset.id
    const messageIdx = comments.findIndex(comment => comment.id == messageId)
    if (messageIdx !== -1) {
      const message = comments[messageIdx]
      if (message.seen) {
        comments.splice(messageIdx, 1)
      } else {
        message.seen = true
      }
    }
  }
  renderCardShowcase(comments, showcaseEl);
})


searchFormEl.addEventListener('submit', event => {
  event.preventDefault()
  const query = event.target.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  console.log(query);
  const searchFields = ["name", "phone", "text"]
  const filteredСomments = comments.filter(comment => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(comment[field]).toLowerCase().includes(word)
      })
    })
  })
  console.table(filteredСomments);
  renderCardShowcase(filteredСomments, showcaseEl);
})



function renderCardShowcase(cardsDataArr, cardShowcaseEl) {
  smsCounterAllEl.textContent = cardsDataArr.length
  smsCounterUnseenEl.textContent = cardsDataArr.filter(cardDataObj => !cardDataObj.seen).length
  cardsDataArr.sort((a, b) => a.seen - b.seen || b.date - a.date)
  cardShowcaseEl.innerHTML = createCardShowcaseHTML(cardsDataArr).join("");
}

function createCardShowcaseHTML(cardsDataArr) {
  return cardsDataArr.map((cardDataObj) => createCardHTML(cardDataObj));
}


function createCardHTML(cardDataObj) {

  return `<div class="comments ${cardDataObj.seen ? 'seen' : ''}" data-id="${cardDataObj.id}">
    <img class="comments-img" src="${cardDataObj.avatar}" alt="${cardDataObj.name}" width="1" height="1" loading="lazy" decoding="async">
    <div class="comments-content">
    <h2 class="comments-author">${cardDataObj.name}</h2>
    <a class="comments-link" href="tel:${cardDataObj.phone}">Тел: ${cardDataObj.phone}</a>
    <p class="comments-text">${cardDataObj.text}
    </p>
  <p class="comments-date">Добавлено: ${new Date(cardDataObj.date).toLocaleString()}</p>
  </div>
  </div> `;
}




// const arr = [1,2,1,6,4,4,24,4,654,57,5,45,98,87,9]

// const newArr = arr.filter(num => num > 10)
// console.log(newArr);


// document.addEventListener('click', event => {
//   console.log(event);
// })



// getDataWithCallback(result => {
//   console.log(result);
//   getDataWithCallback(result => {
//     console.log(result);
//     getDataWithCallback(result => {
//       console.log(result);
//       getDataWithCallback(result => {
//         console.log(result);
//         getDataWithCallback(result => {
//           console.log(result);
//           getDataWithCallback(result => {
//             console.log(result);
//             getDataWithCallback(result => {
//               console.log(result);
//             })
//           })
//         })
//       })
//     })
//   })
// })

// getDataWithCallback(result => {
//   console.log('good', result)
// }, error => {
//   console.log('bad', error)
// })

// function getDataWithCallback(resolve, reject) {
//   setTimeout(() => {
//     let data = (Math.random() * 10).toFixed(0)
//     if (data > 5) {
//       resolve(data)
//     } else {
//       reject(data)
//     }
//   }, 500);
// }


getBtn.addEventListener('click', e => {
  displayResult.innerHTML = ''
  displayResult.classList.remove('good')
  displayResult.classList.remove('bad')
  waitIcon.classList.add('show')
  getBtn.disabled = true
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      let data = (Math.random() * 100).toFixed(0)
      if (data > 49) {
        resolve(data)
      } else {
        reject(data)
      }
    }, 1500);
  })
  promise
    .finally(() => {
      waitIcon.classList.remove('show')
      getBtn.disabled = false
    })
    .then(result => {
      displayResult.innerHTML = result
      displayResult.classList.add('good')
    })
    .catch(error => {
      displayResult.innerHTML = error
      displayResult.classList.add('bad')
    })
})
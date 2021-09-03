const comments = JSON.parse(DATA);
console.log(comments);
const showcaseEl = document.getElementById("showcase");
const searchFormEl = document.getElementById('searchForm')

const smsCounterAllEl = document.getElementById('smsCounterAll')
const smsCounterUnseenEl = document.getElementById('smsCounterUnseen')

renderCardShowcase(comments, showcaseEl);

searchFormEl.addEventListener('submit', event => {
  event.preventDefault()
  const query = event.target.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  console.log(query);
  const searchFields = ["name", "phone", "text"]
  const filteredСomments = comments.filter(comments => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(comments[field]).toLowerCase().includes(word)
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

  return `<div class="comments ${cardDataObj.seen ? 'seen' : ''}">
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
const comments = JSON.parse(DATA);
const showcaseEl = document.getElementById("showcase");
const searchFormEl = document.getElementById('searchForm')


searchFormEl.addEventListener('submit', event => {
  event.preventDefault()
  // console.log(event.target);
  // console.log(event.target.search);
  // console.log(event.target.search.value);
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
})

renderCardShowcase(comments, showcaseEl);

function renderCardShowcase(cardsDataArr, cardShowcaseEl) {
    cardShowcaseEl.innerHTML = createCardShowcaseHTML(cardsDataArr).join("");
  }
  
  function createCardShowcaseHTML(cardsDataArr) {
    return cardsDataArr.map((cardDataObj) => createCardHTML(cardDataObj));
  }

// console.log (createCardHTML(
// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "text": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": "1609595510000",
//     "seen": false
// }
// ));

  function createCardHTML(cardDataObj) {
      
  return `<div class="comments">
    <img class="comments-img" src="${cardDataObj.avatar}" alt="${cardDataObj.name}" width="1" height="1" loading="lazy" decoding="async">
  <div class="comments-content">
    <h2 class="comments-author">${cardDataObj.name}</h2>
    <a class="comments-link" href="#">Тел: ${cardDataObj.phone}</a>
    <p class="comments-text">${cardDataObj.text}
    </p>
<p class="comments-date">Добавлено: ${new Date(cardDataObj.date).toLocaleString()}</p>
  </div>
  </div> `;
}



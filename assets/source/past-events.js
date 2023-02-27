const cardsContainer = document.getElementById("cardsContainer");
const currentDate = data.currentDate;
const dataEvents = data.events;

function createCard() {
  let card = "";
  for (const event of dataEvents) {
    const dataEventsDate = event.date;
    if (dataEventsDate <= currentDate) {
      card += `
      <div class="col">
        <div class="card mb-2 rounded-3 shadow-sm">
          <div class="card-header py-3 text-bg-info">
            <h6 class="my-0 fw-normal">Past Event</h4>
          </div>
          <div class="card-body">
          <img src="${event.image}" class="card-img-top rounded-3" alt="${event.name}">
            <h1 class="card-title pricing-card-title my-1">${event.name}</h1>
            <ul class="list-unstyled mt-2 mb-2 py-2">
              <li>${event.description}</li>
              <hr>
              <li>Price: $${event.price}</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary" onclick="window.location.href='./details-1.html';">See more</button>
          </div>
        </div>
      </div>`;
    }
  }
  return card;
}

let cardElement = createCard(dataEvents);
cardsContainer.innerHTML = cardElement;

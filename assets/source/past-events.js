const cardsContainer = document.getElementById("cardsContainer");
const categoriesContainer = document.getElementById("categories-container");
const search = document.getElementById("search");

let dataInput = "";
let searchFilter = [];
let checked = [];
let minchecked = [];
let checkedFilter = [];

// --------------------- addEventListener's -----------------------
// Checkboxes
categoriesContainer.addEventListener("click", (e) => {
  if (e.target.checked) {
    checked.push(e.target.value);
    minchecked.push(e.target.value.toLowerCase());
  } else {
    checked = checked.filter((notCheck) => notCheck !== e.target.value);
    minchecked = minchecked.filter(
      (notCheck) => notCheck !== e.target.value.toLowerCase()
    );
  }
  create();
});

// Search
search.addEventListener("keyup", (e) => {
  dataInput = e.target.value.toLowerCase();

  create();
});

// --------------------- functions to render -----------------------
// createCheckboxs
function createCheckboxs(evs) {
  let categories = "";
  for (let cat of evs) {
    categories += `
        <label class="list-group-item d-flex gap-2">
        <input
          class="form-check-input flex-shrink-0"
          name="${cat}"
          type="checkbox"
          value="${cat}"
          id="${cat}"
        />
        <span>${cat}</span>
      </label>
        `;
  }
  categoriesContainer.innerHTML = categories;
}

// createCard
function createCard(events) {
  let card = "";
  for (const event of events) {
    if (event.date < currentDate) {
      card += `
      <div class="col">
        <div class="card mb-2 rounded-3 shadow-sm">
          <div class="card-header py-3 text-bg-info">
            <h6 class="my-0 fw-normal">Past Event</h4>
          </div>
          <div class="card-body">
          <img src="${event.image}" class="card-img-top rounded-3" alt="${event.name}">
            <h1 class="card-title pricing-card-title my-1">${event.name}</h1>
            <div class="card-bottom">
              <ul class="list-unstyled mt-2 mb-2">
                <li>${event.description}</li>
              </ul>
            </div>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary" onclick="window.location.href='./details.html?id=${event._id}';">See more</button>
          </div>
        </div>
      </div>`;
    }
  }
  return card;
}

// ----------------------- function 'create()' -------------------------

function create() {
  // searchFilter
  searchFilter = events.filter((events) =>
    events.name.toLowerCase().includes(dataInput)
  );

  // checkboxFilter
  checkedFilter = events.filter((events) => checked.includes(events.category));

  // renderCard
  if (searchFilter.length > 0) {
    cardsContainer.innerHTML = createCard(searchFilter);
    let finalControl = searchFilter.filter((events) =>
      events.category.includes(checked.toString())
    );
    cardsContainer.innerHTML = createCard(finalControl);
  } else if (searchFilter == 0) {
    cardsContainer.innerHTML = `
    <div class="col">
    <div class="card mb-2 rounded-3 shadow-sm">
      <div class="card-header py-3 text-bg-danger">
        <h6 class="my-0 fw-normal">Out of time and space</h4>
      </div>
      <div class="card-body">
      <img src="https://media.tenor.com/tHrSsWxrGF0AAAAi/fall-over-failarmy.gif" class="card-img-top rounded-3" alt="Search Failed">
        <h1 class="card-title pricing-card-title my-1">Ooops!</h1>
        <ul class="list-unstyled mt-2 mb-2">
          <li>We couldn't find what you were looking for. Try searching something different 💫</li>
        </ul>
      </div>
    </div>
  </div>`;
  }
}

// --------------------- Rendering -----------------------

createCheckboxs(category);
create();

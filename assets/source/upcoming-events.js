let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

async function bringData() {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();

    // currentDate and events
    const currentDate = data.currentDate;
    const events = data.events;

    // DOM elements: getElementById for cardsContainer, checkboxes and search bar
    let cardsContainer = document.getElementById("cardsContainer");
    let categoriesContainer = document.getElementById("categories-container");
    let search = document.getElementById("search");

    // categoriesMap
    const categoriesMap = events.map((events) => events.category);
    const categoryFilter = categoriesMap.reduce((c, e) => {
      if (!c.includes(e)) {
        c.push(e);
      }
      return c;
    }, []);

    // --------------------- addEventListener's -----------------------

    // categories checkboxes
    let checked = [];
    categoriesContainer.addEventListener("click", (e) => {
      if (e.target.checked) {
        checked.push(e.target.value);
      } else {
        checked = checked.filter((notChecked) => notChecked !== e.target.value);
      }
      create();
    });

    // search bar
    let searchInput = "";

    search.addEventListener("keyup", (e) => {
      searchInput = e.target.value.toLowerCase();

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
    createCheckboxs(categoryFilter);

    // createCard
    function createCard(events) {
      let card = "";
      for (const event of events) {
        if (event.date >= currentDate) {
          card += `
            <div class="col">
              <div class="card mb-2 rounded-3 shadow-sm">
                <div class="card-header py-3 upcomingCards">
                  <h6 class="my-0 fw-normal">Upcoming Event</h4>
                </div>
                <div class="card-body">
                <img src="${event.image}" class="card-img-top rounded-3" alt="${event.name}">
                  <h1 class="card-title pricing-card-title my-1">${event.name}</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>${event.description}</li>
                  </ul>
                  <button type="button" class="w-100 btn btn-lg btn-outline-primary" onclick="window.location.href='./pages/details.html?id=${event._id}';">See more</button>
                </div>
              </div>
            </div>`;
        }
      }
      return card;
    }

    // ----------------------- function 'create()' -------------------------
    let searchFilter = [];
    let checkedFilter = [];
    function create() {
      // searchFilter
      searchFilter = events.filter((e) =>
        e.name.toLowerCase().includes(searchInput)
      );

      // render cards
      if (searchFilter.length != 0) {
        cardsContainer.innerHTML = createCard(searchFilter);
        let finalControl = searchFilter.filter((e) =>
          e.category.includes(checked.toString())
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

      // checkedFilter
      checkedFilter = events.filter((event) =>
        checked.includes(event.category)
      );

      if (checkedFilter.length != 0) {
        cardsContainer.innerHTML = createCard(checkedFilter);
        let controlCheckbox = checkedFilter.filter((cbox) =>
          cbox.name.toLowerCase().includes(searchInput.toString())
        );
        cardsContainer.innerHTML = createCard(controlCheckbox);
      }
    }

    // --------------------- calling create() -----------------------

    create();
  } catch {
    (error) => console.log(error);
  }
}
// --------------------- calling bringData() -----------------------
bringData();

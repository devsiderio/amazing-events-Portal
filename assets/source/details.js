let detailsContainer = document.getElementById("details-container");

// createDetailsCard
function createDetailsCard(event) {
  let queryString = location.search;
  let params = new URLSearchParams(queryString);
  const id = params.get("id");
  const details = event.find((d) => d._id == id);

  // (estimate) assistance
  let result_est_ass = [];
  result_est_ass = calculate();

  function calculate() {
    let result = [];
    result[0] = details.assistance;

    if (result[0] == undefined) {
      result[0] = details.estimate;
      result[1] = " estimate.";
    }
    return result;
  }

  // render card
  let card = `
    <div class="row align-items-center g-lg-5 py-5">
    <div class="col-md-10 mx-auto col-lg-5">
      <div class="col">
        <div class="card mb-2 rounded-3 shadow-sm">
          <div class="card-header py-3 text-bg-success">
            <h6 class="my-0 fw-normal text-center"><span class="details-items">${details.category}</span></h4>
          </div>
          <div class="card-body">
          <img src="${details.image}" class="card-img-top rounded-3" alt="${details.name}">
            <h1 class="card-title pricing-card-title my-1"></h1>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-10 mx-auto col-lg-5 border rounded-3">
      <h2 class="mt-4">${details.name}</h2>
      <p class="mt-3 mb-4">${details.description}</p>
      <p class="mt-1 mb-1"><span class="details-items">Date: </span>${details.date}</p>
      <p class="mt-1 mb-1"><span class="details-items">Place: </span>${details.place}</p>
      <p class="mt-1 mb-1"><span class="details-items">Capacity: </span>${details.capacity}</p>
      <p class="mt-1 mb-1"><span class="details-items">Assistance: </span>${result_est_ass}</p>
      <p class="mt-3 mb-1"><span class="details-items">Price: </span>$${details.price}</p>
    </div>
    <button
      type="button"
      class="w-100 btn btn-lg btn-outline-primary"
      onclick="window.location.href='..//index.html';"
    >
      Back Home
    </button>
  </div>`;

  return card;
}

detailsContainer.innerHTML = createDetailsCard(events);

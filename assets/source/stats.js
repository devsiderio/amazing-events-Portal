// --------------------------------------------------------------------------------------------------

// DOM elements: getElementById for the stats tables
let table1TopEvents = document.getElementById("table1TopEvents");
let table2UpcomingEvents = document.getElementById("table2UpcomingEvents");
let table3PastEvents = document.getElementById("table3PastEvents");

// declaration of currentDate and events
let currentDate;
let events;

// URL of Amazing Events' API
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

// ------------------------------------ bringData() function ----------------------------------------

// bringData() function
async function bringData() {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();

    currentDate = data.currentDate;
    events = data.events;

    buildAllTables();
  } catch (error) {
    console.log(error);
  }
}
bringData();

// --------------------------------- buildAllTables() function -------------------------------------

function buildAllTables() {
  // ----------------------------- array of useful data for pastEvents -----------------------------

  // pastEvents array
  let pastEvents = [];

  // filtering and sorting events based on assistance
  let sortedEventsAssistance = events
    .filter((e) => e.assistance != undefined)
    .sort((a, b) => b.assistance / b.capacity - a.assistance / a.capacity);

  // searching and storing useful data for pastEvents' array
  sortedEventsAssistance.map((event) => {
    if (!pastEvents.some((item) => event.category == item.category)) {
      pastEvents.push({
        category: event.category,
        revenues: event.price * event.assistance,
        assistance: event.assistance,
        capacity: event.capacity,
      });
    } else if (pastEvents.some((item) => event.category == item.category)) {
      pastEvents.map((e) => {
        if (e.category == event.category) {
          e.revenues += event.price * event.assistance;
          e.assistance += event.assistance;
          e.capacity += event.capacity;
        }
      });
    }
  });

  // filtering and sorting events based on capacity
  let sortedEventsCapacity = events
    .filter((e) => e.assistance != undefined)
    .sort((a, b) => b.capacity - a.capacity);

  // -------------------------------------- table1TopEvents ----------------------------------------

  // function to render table1TopEvents
  function buildTable1(attendance, capacity) {
    let row = "";

    for (let i = 0; i < 3; i++) {
      row += `<tr>
                  <td><span class="details-items">
                  ${attendance[i].name}:</span> 
                  ${(
                    (attendance[i].assistance / attendance[i].capacity) *
                    100
                  ).toFixed(2)}<span class="details-items"> %</span>
                  </td >
                  <td><span class="details-items">${
                    attendance[attendance.length - i - 1].name
                  }:</span> 
                  ${(
                    (attendance[attendance.length - i - 1].assistance /
                      attendance[attendance.length - i - 1].capacity) *
                    100
                  ).toFixed(2)}<span class="details-items"> %</span></td >
                  <td><span class="details-items">
                  ${capacity[i].name}:</span> 
                  ${capacity[i].capacity}
                  </td >
              </tr>`;
    }

    return row;
  }

  // rendering table1TopEvents
  table1TopEvents.innerHTML = buildTable1(
    sortedEventsAssistance,
    sortedEventsCapacity
  );

  // --------------------------- array of useful data for upcomingEvents ---------------------------

  // upcomingEvents array
  let upcomingEvents = [];

  // filtering and sorting events based on (estimate) assistance
  let sortedEventsEstimate = events
    .filter((e) => e.estimate != undefined)
    .sort((a, b) => a.estimate / a.capacity - b.estimate / b.capacity);

  // searching and storing useful data for upcomingEvents' array
  sortedEventsEstimate.map((event) => {
    if (!upcomingEvents.some((item) => event.category == item.category)) {
      upcomingEvents.push({
        category: event.category,
        revenues: event.price * event.estimate,
        capacity: event.capacity,
        estimate: event.estimate,
      });
    } else if (upcomingEvents.some((item) => event.category == item.category)) {
      upcomingEvents.map((e) => {
        if (e.category == event.category) {
          e.capacity += event.capacity;
          e.revenues += event.price * event.estimate;
          e.estimate += event.estimate;
        }
      });
    }
  });

  // ----------------------------------- table2UpcomingEvents -------------------------------------

  // function to render table2UpcomingEvents
  function buildTable2(events) {
    let row = "";

    for (const item of events) {
      row += `<tr>
                  <td><span class="details-items">${item.category}</span></td>
                  <td><span class="details-items">$ </span>${item.revenues}</td>
                  <td>${((item.estimate / item.capacity) * 100).toFixed(
                    2
                  )}<span class="details-items"> %</span></td>
              </tr>`;
    }
    return row;
  }

  // rendering table2UpcomingEvents
  table2UpcomingEvents.innerHTML = buildTable2(upcomingEvents);

  // ------------------------------------- table3PastEvents ---------------------------------------

  // function to render table3PastEvents
  function buildTable3(events) {
    let row = "";

    for (const item of events) {
      row += `<tr>
                  <td><span class="details-items">${item.category}</span></td>
                  <td><span class="details-items">$ </span>${item.revenues}</td>
                  <td>${((item.assistance / item.capacity) * 100).toFixed(
                    2
                  )}<span class="details-items"> %</span></td>
              </tr>`;
    }
    return row;
  }

  // rendering table3PastEvents
  table3PastEvents.innerHTML = buildTable3(pastEvents);
}

const COHORT = "2310-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");
const addeventForm = document.querySelector("#addevent");
addeventForm.addEventListener("submit", addevent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  renderEvents();
}
render();

/**
 * Update state with events from API
 */
// fetch eventsns
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(response)
    state.events = json.data;
  } catch (error) {
    console.log(error);
  }
}
function renderEvents() {
  console.log(state.events);
  if (!state.events.length) {
    eventList.innerHTML = "<li>No event.</li>";
    return;
  }

  const eventcards = state.events.map((event) => {
    const li = document.createElement("li");
  
    li.innerHTML = `
     <h3>Name:${event.name}<h3>
     <p>${event.date}</p>
     <p>Location:${event.location}</p>
    <p>Description: ${event.description}</p> `;

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Event";
    li.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    return li;
  });
  eventsList.replaceChildren(...eventcards)
  console.log(eventcards)
  
}

/**
 * Ask the API to create a new event based on form data
 * @param {Event} event
 */

async function createEvent(event) {
 
  event.preventDefault();

  try {
    const addeventForm = document.querySelector("#addevent");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addeventForm.name.value,
        date: addeventForm.date.value,
        location: addeventForm.location.value,
        description: addeventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("failed to create event");
    }

    render();
  } catch (error) {
    console.error(error);
  }

  // TODO
}

async function updateEvent(id) {
  const time = addeventForm.time.value;
  const date = addeventForm.date.value;
  const datecombine = `${time} ${date}`;
  const newdate = new Date(datecombine);
  const fdate = newdate.toISOString();

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addeventForm.name.value,
        date: fdate,
        location: addeventForm.location.value,
        description: addeventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("failed to create event");
    }

    render();
  } catch (error) {
    console.error(error);
  }

  // TODO
}
async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    render();
  } catch (error) {
    console.error(error);
  }
}



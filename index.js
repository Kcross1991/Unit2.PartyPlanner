const COHORT = "2310-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-ET-WEB-FT-SF/events`;

const state = {
  event: [],
};

const eventList = document.querySelector("#event");
const addeventForm = document.querySelector("#addevent");
addeventForm.addEventListener("submit", addevent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  renderevent();
}
render();

/**
 * Update state with events from API
 */
// fetch eventsns
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const events = await response.json();
    console.log(events.data);
    state.event = events.data;
    console.log(state.event);
  } catch (error) {
    console.log(error);
  }
}
function renderevent() {
  console.log(state.event);
  if (!state.event) {
    eventList.innerHTML = `<p>No event.</p>`;
  }

  const eventcards = state.event.map((event) => {
    const eventElement = document.createElement("div");
    eventElement.classList.add("event-card");
    const isoStr = event.date;
    const date = new Date(isoStr);
    const time = date.toTimeString();
    eventElement.innerHTML = `
    <div>Name: ${event.name}</div>
    <div>Date: ${event.date}</div>
    <div>Time: ${time} </div>
    <div>Location: ${event.location} </div>
    <div>Description: ${event.description}</div>
    
    `;

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Event";
    eventElement.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    //edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Event";
    eventElement.append(editButton);

    editButton.addEventListener("click", () => updateEvent(event.id));

    return eventElement;
  })
  eventList.replaceChildren(...eventcards);
}

/**
 * Ask the API to create a new event based on form data
 * @param {Event} event
 */

async function createEvent(event) {
  const time = addeventForm.time.value;
  const date = addeventForm.date.value;
  const datecombine = `${time} ${date}`;
  const newdate = new Date(datecombine);
  const fdate = newdate.toISOString();
  eventvent.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
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

async function updateEvent(id) {
  const time = addeventForm.time.value;
  const date = addeventForm.date.value;
  const datecombine = `${time} ${date}`;
  const newdate = new Date(datecombine);
  const fdate = newdate.toISOString();
  updateEvent.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: eventForm.name.value,
        date: fdate,
        location: eventForm.location.value,
        description: eventForm.description.value,
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

/**
 * Render events from state
 */

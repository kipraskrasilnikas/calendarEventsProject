import constants from './constants.js';

// Offset to adjust the displayed month. Set to 0 to display the current month.
let monthsOffset = 0;
let dateClicked = null;

let events = sessionStorage.getItem("events")
  ? JSON.parse(sessionStorage.getItem("events"))
  : [];

/**
 * Opens the event bar and displays the details of a created event or a form for a new event on the selected date 
 * @param {Date} date - The date of the opened new event bar
 */
function openEventBar(date) {
  dateClicked = date;

  const eventForDay = events.find((e) => e.date === dateClicked);

  constants.eventHeader.value = date;
  if (eventForDay) {
    document.getElementById(
      "eventText"
    ).innerText = `Title: ${eventForDay.title}`;
    document.getElementById(
      "startTimeRead"
    ).innerText = `Start Time: ${eventForDay.startTime}`;
    document.getElementById(
      "endTimeRead"
    ).innerText = `End Time: ${eventForDay.endTime}`;

    if (eventForDay.eventType === constants.EVENT_TYPES.MEETING) {
      document.getElementById(constants.ELEMENT_EVENT_TYPE_READ).innerText = "Type: Meeting";
    } else if (eventForDay.eventType === constants.EVENT_TYPES.CALL) {
      document.getElementById(constants.ELEMENT_EVENT_TYPE_READ).innerText = "Type: Call";
    } else if (eventForDay.eventType === constants.EVENT_TYPES.OUT_OF_OFFICE) {
      document.getElementById(constants.ELEMENT_EVENT_TYPE_READ).innerText =
        "Type: Out of Office";
    }
    document.getElementById(
      "descriptionRead"
    ).innerText = `Description: ${eventForDay.description}`;
    constants.deleteEventModal.style.display = constants.BLOCK_STRING;
    constants.backDrop.style.display = constants.BLOCK_STRING;
  } else {
    constants.newEventBar.style.display = constants.BLOCK_STRING;
    constants.eventHeader.innerText =
      "New event for " + dateClicked;
  }
}

/**
 * Initializes the calendar view by creating the days of the month,
 * adding event listeners to the buttons, and rendering any existing events.
 */
function initializeCalendarView() {
  const dt = new Date();

  if (monthsOffset !== 0) {
    dt.setMonth(new Date().getMonth() + monthsOffset);
  }
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-gb", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = WEEKDAYS.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-gb",
    { month: "long" }
  )} ${year}`;

  constants.calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.date === dayString);

      //current day
      if (i - paddingDays === day && monthsOffset === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.classList.add(eventForDay.eventType);
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }
      daySquare.addEventListener("click", () => openEventBar(dayString));
    } else {
      daySquare.classList.add("padding");
    }
    constants.calendar.appendChild(daySquare);
  }
}

function closeEventBar() {
  constants.eventTitleInput.classList.remove(constants.ERROR_STRING);
  constants.newEventBar.style.display = constants.NONE_STRING;
  constants.deleteEventModal.style.display = constants.NONE_STRING;
  constants.eventTitleInput.value = "";
  dateClicked = null;
  constants.backDrop.style.display = constants.NONE_STRING;

  constants.startTimeInput.value = "";
  constants.endTimeInput.value = "";

  constants.startTimeInput.classList.remove(constants.ERROR_STRING);
  constants.endTimeInput.classList.remove(constants.ERROR_STRING);

  constants.errorText.style.display = constants.NONE_STRING;

  initializeCalendarView();
}

function saveEvent() {
  constants.eventTitleInput.classList.remove(constants.ERROR_STRING);
  constants.startTimeInput.classList.remove(constants.ERROR_STRING);
  constants.endTimeInput.classList.remove(constants.ERROR_STRING);
  constants.eventType.classList.remove(constants.ERROR_STRING);

  if (
    constants.eventTitleInput.value &&
    constants.startTimeInput.value &&
    constants.endTimeInput.value &&
    constants.eventType.value
  ) {
    if (constants.startTimeInput.value > constants.endTimeInput.value) {
      constants.startTimeInput.classList.add(constants.ERROR_STRING);
      constants.endTimeInput.classList.add(constants.ERROR_STRING);
      constants.timeErrorText.style.display = constants.BLOCK_STRING;
    } else {
      events.push({
        date: dateClicked,
        title: eventTitleInput.value,
        startTime: constants.startTimeInput.value,
        endTime: constants.endTimeInput.value,
        eventType: constants.eventType.value,
        description: constants.eventDescriptionInput.value,
      });
      sessionStorage.setItem("events", JSON.stringify(events));
      closeEventBar();
    }
  } else if (!eventTitleInput.value) {
    eventTitleInput.classList.add(constants.ERROR_STRING);
    constants.errorText.style.display = constants.BLOCK_STRING;
  } else if (!constants.startTimeInput.value) {
    constants.startTimeInput.classList.add(constants.ERROR_STRING);
    constants.errorText.style.display = constants.BLOCK_STRING;
  } else if (!constants.endTimeInput.value) {
    constants.endTimeInput.classList.add(constants.ERROR_STRING);
    constants.errorText.style.display = constants.BLOCK_STRING;
  }
}

function deleteEvent() {
  constants.backDrop.style.display = constants.BLOCK_STRING;
  events = events.filter((e) => e.date !== dateClicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeEventBar();
}

function initializeCalendarButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    monthsOffset++;
    initializeCalendarView();
  });
  document.getElementById("backButton").addEventListener("click", () => {
    monthsOffset--;
    initializeCalendarView();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document
    .getElementById("cancelButton")
    .addEventListener("click", closeEventBar);

  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document
    .getElementById("closeButton")
    .addEventListener("click", closeEventBar);
}
initializeCalendarButtons();
initializeCalendarView();

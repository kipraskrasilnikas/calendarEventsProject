const calendar = document.getElementById("calendar");
const newEventBar = document.getElementById("eventBar");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const errorText = document.getElementById("errorTextInput");
const timeErrorText = document.getElementById("timeError");
const eventHeader = document.getElementById("eventHeader");
const eventType = document.getElementById("list");
const eventDescriptionInput = document.getElementById("description");

export default {
    ELEMENT_EVENT_TYPE_READ: "eventTypeRead",
    ERROR_CLASS: "error",
    DISPLAY_TYPES: {
        NONE: "none",
        BLOCK: "block"
    },
    SESSION_STORAGE_EVENTS_KEY: "events",
    calendar,
    EVENT_TYPES: {
        MEETING: "meeting",
        CALL: "call",
        OUT_OF_OFFICE: "outOfOffice"
    },
    WEEKDAYS: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    newEventBar,
    deleteEventModal,
    backDrop,
    eventTitleInput,
    startTimeInput,
    endTimeInput,
    errorText,
    timeErrorText,
    eventHeader,
    eventType,
    eventDescriptionInput
}


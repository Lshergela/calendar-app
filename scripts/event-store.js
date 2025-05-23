import { isTheSameDay } from './date.js';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from './events-api.js';

export function initEventStore() {
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('event-create', async (event) => {
      const eventBody = event.detail.event;

      const createdEvent = await createEvent(eventBody);

      const events = getEventsFromLocalStorage();
      events.push(createdEvent);
      saveEventsIntoLocalStorage(events);

      document.dispatchEvent(
        new CustomEvent('events-change', {
          bubbles: true,
        })
      );
    });

    document.addEventListener('event-delete', (event) => {
      const deletedEvent = event.detail.event;
      const events = getEventsFromLocalStorage().filter((event) => {
        return event._id !== deletedEvent._id;
      });
      deleteEvent(deletedEvent._id);
      saveEventsIntoLocalStorage(events);

      document.dispatchEvent(
        new CustomEvent('events-change', {
          bubbles: true,
        })
      );
    });

    document.addEventListener('event-edit', async (event) => {
      const eventBody = event.detail.event;

      const updatedEvent = await updateEvent(eventBody);

      const events = getEventsFromLocalStorage().map((event) => {
        return event._id === updatedEvent._id ? updatedEvent : event;
      });
      saveEventsIntoLocalStorage(events);

      document.dispatchEvent(
        new CustomEvent('events-change', {
          bubbles: true,
        })
      );
    });
  });

  return {
    getEventsByDate(date) {
      const events = getEventsFromLocalStorage();
      const filteredEvents = events.filter((event) =>
        isTheSameDay(event.date, date)
      );

      return filteredEvents;
    },
  };
}

function saveEventsIntoLocalStorage(events) {
  let stringifiedEvents;
  try {
    stringifiedEvents = JSON.stringify(events);
  } catch (error) {
    console.error('Stringify events failed', error);
  }

  localStorage.setItem('events', stringifiedEvents);
}

function getEventsFromLocalStorage() {
  const localStorageEvents = localStorage.getItem('events');
  if (localStorageEvents === null) {
    return [];
  }

  let parsedEvents;
  try {
    parsedEvents = JSON.parse(localStorageEvents);
  } catch (error) {
    console.error('Parse events failed', error);
    return [];
  }

  const events = parsedEvents.map((event) => ({
    ...event,
    date: new Date(event.date),
  }));

  return events;
}

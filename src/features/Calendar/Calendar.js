import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridWeekPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  const calendarRef = useRef(null);

  // Test data, will be replaced with dynamic events data
  const events = [
    {
      id: "1",
      title: "class 1",
      start: "2024-10-22T11:00:00",
      end: "2024-10-22T12:00:00",
    },
    {
      id: "2",
      title: "class 2",
      start: "2024-10-23T09:00:00",
      end: "2024-10-23T10:00:00",
    },
    {
      id: "3",
      title: "class 3",
      start: "2024-10-23T12:00:00",
      end: "2024-10-23T13:00:00",
    },
    {
      id: "4",
      title: "class 4",
      start: "2024-10-24T16:00:00",
      end: "2024-10-24T17:00:00",
    },
    {
      id: "5",
      title: "class 5",
      start: "2024-10-25T10:00:00",
      end: "2024-10-25T11:00:00",
    },
    {
      id: "6",
      title: "class 6",
      start: "2024-10-26T14:00:00",
      end: "2024-10-26T15:00:00",
    },
  ];

  // When an event is clicked, it changes the calendar view to show a detailed day view
  // and show the specific date and time of the clicked event
  function handleClickEvent(clickInfo) {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridDay", clickInfo.event.start);
    calendarApi.gotoDate(clickInfo.event.start);
  }

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin, timeGridWeekPlugin]}
      initialView="timeGridWeek"
      // Defines the buttons and title at the top of the calendar.
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
      }}
      events={events}
      eventDisplay="block"
      eventClick={handleClickEvent}
    />
  );
};

export default Calendar;

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridWeek from "@fullcalendar/timegrid";
// import listWeek from "@fullcalendar/listgrid";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      // Defines the buttons and title at the top of the calendar.
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridWeek,dayGridMonth,dayGridYear",
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        year: "Year",
      }}
    />
  );
};

export default Calendar;

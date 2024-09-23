import { useState } from 'react';
import moment from 'moment';
import '../styles/CalendarComponent.css';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const [crossMonthSelectionEnabled, setCrossMonthSelectionEnabled] = useState(false);
  const currentMonth = currentDate.format('YYYY年MM月');
  const daysInMonth = currentDate.daysInMonth();
  const startDay = currentDate.startOf('month').day();

  const isActiveDay = (day) => {
    return (startDate && day.isSame(startDate, 'day')) || (endDate && day.isSame(endDate, 'day')) ||(startDate && endDate && day.isBetween(startDate, endDate, 'day', '[]'));
  };

  const days = [];

  const handleDayClick = (day, isPrevMonth, isNextMonth) => {
    let selectedDate;
    if (isPrevMonth) {
      selectedDate = currentDate.clone().subtract(1, 'month').date(day);
    } else if (isNextMonth) {
      selectedDate = currentDate.clone().add(1, 'month').date(day);
    } else {
      selectedDate = currentDate.clone().date(day);
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate.isSameOrAfter(startDate)) {
      setEndDate(selectedDate);
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const prevMonthDays = currentDate.clone().subtract(1, 'month').daysInMonth();
  for (let i = startDay - 1; i >= 0; i--) {
    const day = currentDate.clone().subtract(1, 'month').date(prevMonthDays - i);
    const isActive = crossMonthSelectionEnabled && isActiveDay(day);
    days.push(
      <div
        key={`prev-${i}`}
        className={`day ${!crossMonthSelectionEnabled ? 'non-current-month' : ''} ${isActive ? 'active' : ''}`}
        onClick={() => crossMonthSelectionEnabled && handleDayClick(prevMonthDays - i, true, false)}
      >
        {prevMonthDays - i}日
      </div>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = currentDate.clone().date(i);
    const isActive = isActiveDay(day);
    days.push(
      <div
        key={i}
        className={`day ${isActive ? 'active' : ''}`}
        onClick={() => handleDayClick(i, false, false)}
      >
        {i}日
      </div>
    );
  }

  const TOTAL_CALENDAR_DAYS = 6 * 7; // 6 rows, 7 days per week
  const remainingDays = TOTAL_CALENDAR_DAYS - (startDay + daysInMonth);
  for (let i = 1; i <= remainingDays; i++) {
    const day = currentDate.clone().add(1, 'month').date(i);
    const isActive = crossMonthSelectionEnabled && isActiveDay(day);
    days.push(
      <div
        key={`next-${i}`}
        className={`day ${!crossMonthSelectionEnabled ? 'non-current-month' : ''} ${isActive ? 'active' : ''}`}
        onClick={() => crossMonthSelectionEnabled && handleDayClick(i, false, true)}
      >
        {i}日
      </div>
    );
  }

  const handlePrevMonth = () => {
    if (navigationEnabled) {
      setCurrentDate(currentDate.clone().subtract(1, 'month'));
    }
  };

  const handleNextMonth = () => {
    if (navigationEnabled) {
      setCurrentDate(currentDate.clone().add(1, 'month'));
    }
  };

  return (
    <div className="calendar">
      <div className="header">
        <div className="month-select" onClick={handlePrevMonth}>
          &lt;
        </div>
        <span>{currentMonth}</span>
        <div className="month-select" onClick={handleNextMonth}>
          &gt;
        </div>
      </div>
      <div className="days">
        {days}
      </div>
      <div className="switches">
        <div className="navigation-switch">
          <label>
            Enable Navigation
            <input
              type="checkbox"
              checked={navigationEnabled}
              onChange={() => setNavigationEnabled(!navigationEnabled)}
            />
          </label>
        </div>
        <div className="cross-month-switch">
          <label>
            Enable Cross-Month Selection
            <input
              type="checkbox"
              checked={crossMonthSelectionEnabled}
              onChange={() => setCrossMonthSelectionEnabled(!crossMonthSelectionEnabled)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;

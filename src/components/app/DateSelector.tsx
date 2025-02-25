import React, { useState } from "react";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date | null) => void;
}

const DateSelector: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onDateChange(newDate);
  };

  const handleDateClear = () => {
    onDateChange(null);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer ${
            isSelected ? "bg-crimson text-white" : "bg-night text-silver"
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="absolute top-[8rem] bg-dark p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-silver">
          {"<"}
        </button>
        <span className="text-silver font-bold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="text-silver">
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-silver font-bold">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      <button
        className="mt-4 bg-crimson text-white p-2 rounded-md"
        onClick={handleDateClear}
      >
        Esvaziar
      </button>
    </div>
  );
};

export default DateSelector;

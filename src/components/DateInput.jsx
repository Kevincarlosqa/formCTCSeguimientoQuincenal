import PropTypes from "prop-types";
import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "Fecha de Nacimiento",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    // disabledText: "bg-red-500",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>{"<"}</span>,
    next: () => <span>{">"}</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "es",
  disabledDates: [],
  weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const DateInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  example,
  error,
  isOptional,
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (selectedDate) => {
    const formattedDate = formatDate(new Date(selectedDate));
    onChange(name, formattedDate);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="mb-1 text-white">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
        {isOptional && <span className="text-gray-500"> (Opcional)</span>}
      </label>
      <Datepicker
        options={{
          ...options,
          defaultDate: parseDate(value) || options.defaultDate,
        }}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
        inputNameProp={name}
        inputIdProp={name}
        inputPlaceholderProp={placeholder || "Select Date"}
      />
      <input type="hidden" name={name} value={value} />
      {example && <p className="text-[11px] px-2 pt-1">{example}</p>}
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  example: PropTypes.string,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default DateInput;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CheckboxGroup.css";

const CheckboxGroup = ({
  label,
  options,
  name,
  selectedValues,
  onChange,
  maxSelections,
  error,
  isOptional,
}) => {
  const [checkedItems, setCheckedItems] = useState(
    options.reduce((acc, option) => {
      acc[option.value] = selectedValues.includes(option.value);
      return acc;
    }, {})
  );

  useEffect(() => {
    setCheckedItems(
      options.reduce((acc, option) => {
        acc[option.value] = selectedValues.includes(option.value);
        return acc;
      }, {})
    );
  }, [selectedValues, options]);

  const handleCheckboxChange = (event) => {
    const { name: value, checked } = event.target;
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    if (checked && selectedCount >= maxSelections) {
      return; // No permite seleccionar más de maxSelections
    }

    const newCheckedItems = {
      ...checkedItems,
      [value]: checked,
    };
    setCheckedItems(newCheckedItems);

    const selectedValuesArray = Object.keys(newCheckedItems).filter(
      (key) => newCheckedItems[key]
    );
    const selectedValuesString = selectedValuesArray.join(",");
    onChange(name, selectedValuesString);
  };

  return (
    <div className="text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
          {isOptional && <span className="text-gray-500"> (Opcional)</span>}
        </label>
      )}
      {options.map((option) => (
        <div
          key={option.value}
          className={`flex items-center ps-4 border border-white rounded-3xl mb-2 ${
            checkedItems[option.value] ? "bg-black/40" : "bg-transparent"
          }`}
        >
          <input
            id={option.value}
            type="checkbox"
            name={option.value}
            checked={checkedItems[option.value]}
            onChange={handleCheckboxChange}
            className="custom-checkbox w-4 h-4 text-blue-600 bg-transparent border-white rounded focus:ring-blue-500"
          />
          <label
            htmlFor={option.value}
            className="w-full py-2 ms-2 text-sm font-medium"
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

CheckboxGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      checked: PropTypes.bool,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  selectedValues: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  maxSelections: PropTypes.number.isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default CheckboxGroup;

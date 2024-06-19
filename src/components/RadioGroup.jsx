import PropTypes from "prop-types";
import "./RadioGroup.css";

const RadioGroup = ({
  label,
  options,
  name,
  selectedValue,
  onChange,
  error,
  isOptional,
}) => {
  const handleRadioChange = (event) => {
    const { value } = event.target;
    onChange(name, value); // Utiliza el nombre completo para identificar el grupo
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
            selectedValue === option.value ? "bg-black/40" : "bg-transparent"
          }`}
        >
          <input
            id={`${name}-${option.value}`} // Usa un identificador único para cada opción
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            className="custom-radio w-4 h-4 text-blue-600 bg-transparent border-white rounded focus:ring-blue-500"
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="w-full py-2 ms-2 text-sm font-medium cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default RadioGroup;

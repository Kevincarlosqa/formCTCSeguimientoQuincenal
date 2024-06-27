import PropTypes from "prop-types";
// import "./Select.css"; // Asegúrate de importar el archivo CSS con los estilos definidos

const Select = ({
  label,
  options,
  name,
  value,
  onChange,
  placeholder,
  error,
  isOptional,
}) => {
  const handleSelectChange = (event) => {
    const { value } = event.target;
    onChange(name, value);
  };

  return (
    <div className="text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
          {isOptional && <span className="text-gray-500"> (Opcional)</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleSelectChange}
        className="text-sm rounded-lg block w-full p-2.5 bg-[#1E2E3F] text-white"
        required
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default Select;

import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  example,
  type,
  error,
  isOptional,
}) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;

    if (type === "number") {
      const isValidNumber = /^(\+|\d)*$/.test(value);
      if (!isValidNumber) {
        return; // Si no es un número válido o +, no actualiza el estado
      }
    }

    onChange(name, value);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur && onBlur(name);
  };

  return (
    <div className="mb-1 text-white">
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
        {isOptional && <span className="text-gray-500"> (Opcional)</span>}
      </label>
      <input
        type={type === "number" ? "text" : type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        pattern={type === "number" ? "^[0-9+]*$" : undefined}
        className="shadow-sm bg-black/40 border border-gray-600 text-sm rounded-lg block w-full p-2.5"
      />
      {example && <p className="text-[11px] px-2 pt-1">{example}</p>}
      {!isOptional && touched && !value && (
        <p className="text-red-500 text-[11px] px-2 pt-1">
          Este campo es requerido
        </p>
      )}
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  example: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "email"]).isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
};

export default InputField;

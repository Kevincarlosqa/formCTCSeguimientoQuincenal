import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RatingSelector = ({
  start,
  end,
  label,
  colorType,
  onChange,
  error,
  selectedValue,
  name,
}) => {
  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleSelect = (rating) => {
    setValue(rating.toString());
    onChange(name, rating.toString());
  };

  const generateColors = (num, type) => {
    const colors = [];
    if (type === "default") {
      for (let i = 0; i < num; i++) {
        colors.push("rgba(255, 255, 255, 0.4)");
      }
    } else if (type === "gradient") {
      const colorStops = [
        "rgba(255, 99, 71, 0.9)", // Red
        "rgba(255, 255, 20, 0.75)", // Yellow
        "rgba(144, 255, 100, 0.8)", // Green
      ];
      const segments = colorStops.length - 1;
      for (let i = 0; i < num; i++) {
        const segment = Math.floor((i / num) * segments);
        const startColor = colorStops[segment];
        const endColor = colorStops[segment + 1];
        const ratio = (i / num) * segments - segment;

        const startRGBA = startColor
          .match(/rgba\((\d+), (\d+), (\d+), (\d+.\d+)\)/)
          .slice(1)
          .map(Number);
        const endRGBA = endColor
          .match(/rgba\((\d+), (\d+), (\d+), (\d+.\d+)\)/)
          .slice(1)
          .map(Number);

        const red = Math.round(
          startRGBA[0] + ratio * (endRGBA[0] - startRGBA[0])
        );
        const green = Math.round(
          startRGBA[1] + ratio * (endRGBA[1] - startRGBA[1])
        );
        const blue = Math.round(
          startRGBA[2] + ratio * (endRGBA[2] - startRGBA[2])
        );
        const alpha = (
          startRGBA[3] +
          ratio * (endRGBA[3] - startRGBA[3])
        ).toFixed(2);

        colors.push(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
      }
    } else if (type === "nps" || type === "gradient") {
      const greenCount = Math.round(num * 0.6);
      const yellowCount = Math.round(num * 0.2);
      const redCount = num - greenCount - yellowCount;
      for (let i = 0; i < greenCount; i++) {
        colors.push("rgba(255, 99, 71, 0.9)");
      }
      for (let i = 0; i < yellowCount; i++) {
        colors.push("rgba(221, 182, 51, 1)");
      }
      for (let i = 0; i < redCount; i++) {
        colors.push("rgba(144, 255, 100, 0.8)");
      }
    }
    return colors;
  };

  const count = end - start + 1;
  const colors = generateColors(count, colorType);

  return (
    <div className="mb-2 text-white">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (val, index) => (
            <div
              key={index}
              onClick={() => handleSelect(val)}
              style={{
                backgroundColor: colors[index],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border:
                  val.toString() === value
                    ? "3px solid white"
                    : "1px solid gray",
              }}
              className="rounded-lg w-12 h-12"
            >
              {val}
            </div>
          )
        )}
      </div>
      <input type="hidden" name={name} value={value} onChange={() => {}} />
      {error && <p className="text-red-500 text-[11px] px-2 pt-1">{error}</p>}
    </div>
  );
};

RatingSelector.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  label: PropTypes.string,
  colorType: PropTypes.oneOf(["default", "gradient", "nps"]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOptional: PropTypes.bool,
  selectedValue: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RatingSelector;

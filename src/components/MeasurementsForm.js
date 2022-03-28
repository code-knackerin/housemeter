import { useState } from "react";
import classes from "./MeasurementsForm.module.css";
import { v4 as uuidv4 } from "uuid";

const typeOptions = ["Electricity", "Water", "Gas"];

const validateMeasurement = ({ date, type, value }) => {
  let errors = {}; //leeres object

  if (isNaN(Date.parse(date))) {
    errors.date = "Please fill in a valid date.";
  }
  if (!typeOptions.includes(type)) {
    errors.type = "Please select a value.";
  }
  if (isNaN(parseFloat(value))) {
    errors.value = "Please fill in a valid number.";
  }
  console.log(errors, date, value, type);
  return errors;
};

const MeasurementsForm = (props) => {
  const [measurementsInput, setMeasurementsInput] = useState({
    date: null,
    type: null,
    value: null,
    id: uuidv4(),
  });

  const [errors, setErrors] = useState({});
  let measurementsCssClass = classes.valueInput;

  if (measurementsInput.value != null && measurementsInput.value <= 0) {
    measurementsCssClass += " " + classes.invalid;
  }

  const handleDateChange = (event) => {
    const newMeasurementsInput = {
      ...measurementsInput,
      date: event.target.value,
    };
    const errors = validateMeasurement(newMeasurementsInput);
    if (errors === {}) {
      setMeasurementsInput(newMeasurementsInput);
    }
    setErrors(errors);
  };

  const handleMeasurementChange = (event) => {
    let measurementsValue = 0;
    if (event.target.value !== "") {
      measurementsValue = parseFloat(event.target.value);
    }
    const newMeasurementsInput = {
      ...measurementsInput,
      value: measurementsValue,
    };
    const errors = validateMeasurement(newMeasurementsInput);
    if (errors === {}) {
      setMeasurementsInput(newMeasurementsInput);
    }
    setErrors(errors);
  };

  const handleTypeChange = (event) => {
    const newMeasurementsInput = {
      ...measurementsInput,
      type: event.target.value,
    };
    const errors = validateMeasurement(newMeasurementsInput);
    if (errors === {}) {
      setMeasurementsInput(newMeasurementsInput);
    }
    setErrors(errors);
  };

  const submitEnabled = false;

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAdd(measurementsInput);

    // reset to initial values and regenerate Id
    setMeasurementsInput({
      ...measurementsInput,
      value: null,
      id: uuidv4(),
    });
  };

  return (
    <form
      className={classes.inputForm}
      onSubmit={submitHandler}
      data-testid="form"
    >
      <div className={classes.datawrapper}>
        <label htmlFor="Date" className={classes.label}>
          Date
        </label>
        <input
          data-testid="inputDate"
          type="date"
          name="date"
          className={classes.inputDate}
          onChange={handleDateChange}
          key={uuidv4}
        ></input>{" "}
        {errors.date && (
          <div className={classes.errormassage}>{errors.date}</div>
        )}
      </div>
      <div className={classes.datawrapper}>
        <label htmlFor="value" className={classes.lable}>
          Measurement
        </label>
        <input
          data-testid="inputfieldvalue"
          name="measurementsInput"
          type="text"
          onChange={handleMeasurementChange}
          className={measurementsCssClass}
        ></input>
        {errors.value && (
          <div className={classes.errormassage}>{errors.value}</div>
        )}
      </div>
      <div className={classes.datawrapper}>
        <label htmlFor="lableType" className={classes.lable}>
          Type{" "}
        </label>
        <div className={classes.selectcontainer}>
          {" "}
          <select
            data-testid="selectInputType"
            name="measurementsType"
            className={classes.meterTypeSelect}
            onChange={handleTypeChange}
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <div className={classes.errormassage}>{errors.type}</div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={classes.submitButton}
        disabled={!submitEnabled}
      >
        Submit
      </button>
    </form>
  );
};

export default MeasurementsForm;

//TODO: Submit button disablen

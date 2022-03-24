import { useState } from "react";
import classes from "./MeasurementsForm.module.css";
import { v4 as uuidv4 } from "uuid";

const MeasurementsForm = (props) => {
  const [measurementsInput, setMeasurementsInput] = useState({
    date: null,
    type: null,
    value: null,
    id: uuidv4(),
  });

  let measurementsCssClass = classes.valueInput;

  if (measurementsInput.value != null && measurementsInput.value <= 0) {
    measurementsCssClass += " " + classes.invalid;
  }

  const handleDateChange = (event) => {
    setMeasurementsInput({
      ...measurementsInput,
      date: event.target.value,
    });
  };

  const handleMeasurementChange = (event) => {
    let measurementsValue = 0;
    if (event.target.value !== "") {
      measurementsValue = parseFloat(event.target.value);
    }
    setMeasurementsInput({
      ...measurementsInput,
      value: measurementsValue,
    });
  };

  const handleTypeChange = (event) => {
    setMeasurementsInput({
      ...measurementsInput,
      type: event.target.value,
    });
  };

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
      <label htmlFor="Date" className={classes.lable}>
        Date
      </label>
      <input
        data-testid="inputDate"
        type="date"
        required="required"
        name="date"
        className={classes.inputDate}
        onChange={handleDateChange}
        key={uuidv4}
      ></input>{" "}
      <br />
      <label htmlFor="value" className={classes.lable}>
        Measurement
      </label>
      <input
        data-testid="inputfieldvalue"
        name="measurementsInput"
        type="text"
        required="required"
        onChange={handleMeasurementChange}
        className={measurementsCssClass}
      ></input>
      <br />
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
          required="required"
        >
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
      <button type="submit" className={classes.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default MeasurementsForm;

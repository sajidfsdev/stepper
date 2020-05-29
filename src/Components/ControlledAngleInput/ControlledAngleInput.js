import React, { useState } from "react";
import ELXRow from "./../Row/ELXRow";
import ELXAngleInput from "./../AngleInput/ELXAngleInput";
import ELXStepper from "./../stepper/ELXStepper";
import useStyles from "./ControlledAngleInput.styles";

const ELXControlledAngleInput = ({
  rootClass,
  spacing,
  stepperClass,
  angleSize,
  initialValue,
  min,
  max,
  onChange,
}) => {
  const classes = useStyles();
  const [angle, setAngle] = useState(initialValue);

  //Methods....
  const handleAngleChange = (value) => {
    if (value < min) {
      return;
    }
    if (value > max) {
      value = min;
    }
    onChange(value);
    setAngle(value);
  }; //......

  return (
    <React.Fragment>
      <div>{angle}</div>
      <ELXRow
        className={
          rootClass == undefined || rootClass == null
            ? classes.container
            : rootClass
        }
      >
        <ELXStepper
          value={angle}
          onChange={handleAngleChange}
          className={
            stepperClass == undefined || stepperClass == null
              ? classes.stepper
              : stepperClass
          }
        />
      </ELXRow>
      <ELXAngleInput size={angleSize} angle={angle} />
    </React.Fragment>
  );
}; //.....................................
ELXControlledAngleInput.defaultProps = {
  rootClass: undefined,
  spacing: 10,
  angleSize: 30,
  stepperClass: undefined,
  initialValue: 0,
  min: 0,
  max: 360,
  onChange: (value) => {},
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.angleSize == nextProps.angleSize;
};
export default React.memo(ELXControlledAngleInput, areEqual);

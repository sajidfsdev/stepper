import React, { useState, useEffect } from "react";
import ELXStepper from "./Components/stepper/ELXStepper";
import OLDStepper from "./OLD/App";
import { makeStyles } from "@material-ui/core/styles";
import ELXControlledAngleInput from "./Components/ControlledAngleInput/ControlledAngleInput";

const useStyles = makeStyles((theme) => ({
  stepper: {
    width: "400px",
  },
}));

const App = (props) => {
  const [state, setState] = useState("deg");
  const [value, setValue] = useState("1 cm");

  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <ELXControlledAngleInput /> */}
      <div>{value}</div>
      <ELXStepper
        minValue={0}
        maxValue={10}
        step={0.5}
        value={value}
        showUnit={true}
        precision={3}
        useConverter={true}
        toleranceLevel={3}
        unit={"cm"}
        converterType="LENGTH_CONVERTER"
        onChange={(value) => {
          setValue(value);
        }}
      />
      {/* <OLDStepper /> */}
    </React.Fragment>
  );
}; //...........App;

export default App;

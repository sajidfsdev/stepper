// import React from 'react';
// import LengthConverter from './LengthConverter';
// import AngleConverter from './AngleConverter';
// import PercentageConverter from './PercentageConverter';

// function Stepper({ caseVal }) {
// 	const defaultConfig = {
// 		unit: 'pt',
// 		minValue: -Number.MAX_VALUE,
// 		value: '1',
// 		maxValue: Number.MAX_VALUE,
// 		toleranceLevel: 3,
// 		precision: 2,
// 		step: 1,
// 		showUnit: false,
// 		useConverter: false,
// 	};
// 	const lengthConfig = {
// 		minValue: 0,
// 		maxValue: 100,
// 		step: 0.25,
// 		value: '5 in',
// 		showUnit: true,
// 		precision: 2,
// 		useConverter: true,
// 		toleranceLevel: 3,
// 		unit: 'in',
// 	};
// 	const lengthConfig1 = {
// 		minValue: -100,
// 		maxValue: 100,
// 		step: 0.5,
// 		value: '1 cm',
// 		showUnit: true,
// 		precision: 3,
// 		useConverter: true,
// 		toleranceLevel: 3,
// 		unit: 'cm',
// 	};
// 	const angleConfig = {
// 		minValue: -180,
// 		maxValue: 180,
// 		step: 0.5,
// 		value: '30 deg',
// 		precision: 2,
// 		useConverter: true,
// 		showUnit: true,
// 		unit: 'deg',
// 		toleranceLevel: 3,
// 	};
// 	const percentageConfig = {
// 		unit: '%',
// 		value: '0 %',
// 		toleranceLevel: 3,
// 		precision: 1,
// 		step: 0.5,
// 		showUnit: true,
// 		minValue: 0,
// 		maxValue: 100,
// 		useConverter: true,
// 	};

// 	return (
// 		<div>
// 			{(() => {
// 				switch (caseVal) {
// 					case 1:
// 						return <LengthConverter config={defaultConfig} />;
// 					case 2:
// 						return <LengthConverter config={lengthConfig} />;
// 					case 3:
// 						return <LengthConverter config={lengthConfig1} />;
// 					case 4:
// 						return <AngleConverter config={angleConfig} />;
// 					case 5:
// 						return <PercentageConverter config={percentageConfig} />;
// 					default:
// 						return null;
// 				}
// 			})()}
// 		</div>
// 	);
// }

// export default Stepper;

import React, { useEffect, useState } from "react";
import LengthConverter from "./Converters/LengthConverter";
import AngleConverter from "./Converters/AngleConverter";
import PercentageConverter from "./Converters/PercentageConverter";
import converterTypes from "./constants/converterTypes";

const ELXStepper = (props) => {
  //state management...
  const [config, setConfig] = useState({});

  useEffect(() => {
    deriveConfigFromProps();
  }, [props]);

  //Methods.....

  const deriveConfigFromProps = () => {
    setConfig({
      unit: props.unit,
      minValue: props.minValue,
      value: props.value,
      maxValue: props.maxValue,
      toleranceLevel: props.toleranceLevel,
      precision: props.precision,
      step: props.step,
      showUnit: props.showUnit,
      useConverter: props.useConverter,
    });
  }; //...............................derive config from props

  const renderConverter = () => {
    switch (props.converterType) {
      case converterTypes.LENGTH_CONVERTER:
        return (
          <LengthConverter
            config={config}
            onChange={props.onChange}
            className={props.className}
          />
        );

      case converterTypes.ANGLE_CONVERTER:
        return (
          <AngleConverter
            config={config}
            onChange={props.onChange}
            className={props.className}
          />
        );

      case converterTypes.PERCENTAGE_CONVERTER:
        return (
          <PercentageConverter
            config={config}
            onChange={props.onChange}
            className={props.className}
          />
        );
    } //switch ends
  }; //................compute converter

  return <React.Fragment>{renderConverter()}</React.Fragment>;
}; //.........................ELXStepper

ELXStepper.defaultProps = {
  unit: "pt",
  minValue: -Number.MAX_VALUE,
  value: "1",
  maxValue: Number.MAX_VALUE,
  toleranceLevel: 3,
  precision: 2,
  step: 1,
  showUnit: false,
  useConverter: false,
  onChange: (value) => {},
  converterType: converterTypes.LENGTH_CONVERTER,
  //converter Types
  //LENGTH_CONVERTER
  //ANGLE_CONVERTER
  //PERCENTAGE_CONVERTER
  className: undefined,
};

export default ELXStepper;

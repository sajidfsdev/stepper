import React from 'react';
import ELXStepper from './StepperUI/ELXStepper';
import PropTypes from 'prop-types';

function PercentageConverter({ config }) {
	/* config = {
	 * 		unit : 'deg',  		// or any unit from this.UNIT e.g. this.UNIT.cm
	 * 		toleranceLevel: 3, 	// any value from 1 to 3, 1 is strict match - 3 is loose matching in unit string
	 * 		precision: 3,		// precision in value part of given "value + unit" string
	 * 		showUnit: true, 	// whether to include unit part in returning value or not
	 *
	 * 		onErrorValue: function(e) {			// function to call on error in value part
	 * 			alert('invalid value'
	 * 		},
	 * 		onErrorUnits: function(e) {			// function to call on error in unit part
	 * 			alert('invalid unit specified'
	 * 		}
	 * }
	 */
	const UNIT = {
		per: '%',
	};
	const map = {
		// list of all units and their identifying string
		per: '%',
		percentage: '%',
		'%': '%',
	};
	const factors = {
		// list of ratios of all units
		'%': 1,
	};
	const precisions = {
		// list of precision for units (there is different precision (number of decimal places) for each unit)
		'%': 1,
	};
	const steps = {
		// list of step for each unit (the value will be incremented/decremented by this value/step)
		'%': 1,
	};
	const addUnitType = (unit, unit_strings, ratio_to_inch, precision, step) => {
		// unit : small unit is (preferably two characters)
		// unit_strings : different variations of words vocabulary for this unit
		// ratio_to_inch : the factor defining this units ratio to an inch
		// precision : the number of digits after decimal point for this unit
		// step: the step-value by which the value of control will be incremented or decremented
		this.UNIT[unit] = unit;
		for (var unit_str in unit_strings) {
			map[unit_str] = unit;
		}
		factors[unit] = ratio_to_inch;
		precisions[unit] = precision;
		steps[unit] = step;
	};
	const normalizeUnit = (unit) => {
		// trim spaces at end
		let ws = /\s/,
			i = unit.length;
		while (ws.test(unit.charAt(--i)));
		unit = unit.slice(0, i + 1);
		if (unit === '') unit = config.unit; //incase no unit is given

		let unitFind = Object.keys(UNIT).filter((un) => un === unit);
		let uin = unitFind.length > 0 ? UNIT[unitFind] : null;

		if (!uin && config.toleranceLevel > 0) {
			unitFind = Object.keys(map).filter((un) => un === unit);
			uin = unitFind.length > 0 ? map[unitFind] : null; //find in map
		}
		if (!uin && config.toleranceLevel > 1) {
			//since the unit does not lie in map try to convert to lowercase
			unit = unit.toLowerCase();
			unitFind = Object.keys(map).filter((un) => unit === un);
			uin = unitFind.length > 0 ? map[unitFind] : null;
			if (!uin && config.toleranceLevel > 2) {
				for (let item in map) {
					if (item.indexOf(unit, 0) === 0) {
						uin = map[item];
						break;
					}
				}
			}
		}
		if (!uin) {
			onUnitsError('Units not found');
			return null;
		}
		return uin;
	};
	const getNumeric = (value) => {
		let numeric = parseFloat(value);
		if (numeric === null || isNaN(numeric)) {
			onErrorValue('Invalid numeric value');
			return 0;
		}
		return numeric;
	};
	const getUnit = (value) => {
		const unit = value.replace(/^[\-\d\. ]+/, ''); // get the unit part in value
		console.log(unit);
		return normalizeUnit(unit); // normalized unit string
	};
	const getPrecisionFactor = (unit) => {
		let pre_factor = 1;
		if (config.precision > 0) {
			for (let i = 0; i < config.precision; i++) {
				pre_factor *= 10;
			}
		}
		return pre_factor;
	};
	const convertUnits = (numeric, input_unit, output_unit) => {
		return (numeric / input_unit) * output_unit;
	};
	const getValueWithDefaultUnits = (value) => {
		if (config.useConverter === true) {
			let numeric = getNumeric(value);
			let uin = getUnit(value);
			let val = null;
			numeric = convertUnits(numeric, factors[uin], factors[config.unit]);
			if (!isNaN(numeric)) val = value;
			else {
				value = '0';
				numeric = getNumeric(value);
				uin = getUnit(value);
				numeric = convertUnits(numeric, factors[uin], factors[config.unit]); // convert units
			}
			let pre_factor = getPrecisionFactor(config.unit);
			return (
				Math.round(numeric * pre_factor) / pre_factor +
				' ' +
				(config.showUnit === true ? config.unit : '')
			);
		} else {
			return value;
		}
	};
	const getValueInNormalizedUnits = (value) => {
		let numeric = getNumeric(value);
		let uin = getUnit(value);
		let pre_factor = getPrecisionFactor(config.unit);
		return (
			Math.round(numeric * pre_factor) / pre_factor +
			' ' +
			(config.showUnit === true ? uin : '')
		);
	};
	const onUnitsError = (e) => {
		console.log(e);
	};
	const onErrorValue = (e) => {
		console.log(e);
	};
	return (
		<div>
			<ELXStepper
				conf={config}
				getResult={(val) => getValueWithDefaultUnits(val)}
				getNumeric={(val) => getNumeric(val)}
				getUnit={(val) => getUnit(val)}
			/>
		</div>
	);
}
PercentageConverter.propTypes = {
	config: PropTypes.object.isRequired,
};

export default PercentageConverter;

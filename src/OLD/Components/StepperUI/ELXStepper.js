import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import useStyles from './ELXStepper_styles';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InputAdornment from '@material-ui/core/InputAdornment';

const ELXStepper = ({ InputProps, getResult, getNumeric, conf }) => {
	//initializations

	const classes = useStyles();
	let initVal = getNumeric(conf.value);
	initVal =
		initVal +
		(conf.showUnit === true && conf.useConverter === true
			? ' ' + conf.unit
			: ' ');
	const [localValue, setLocalValue] = useState(initVal);
	const timerRef = useRef(null);

	const valRef = useRef(localValue);
	valRef.current = localValue;

	//Methods...
	const validateValue = (val) => {
		if (val > conf.maxValue) {
			val = conf.maxValue;
		} else if (val < conf.minValue) {
			val = conf.minValue;
		}
		return val;
	};
	const incrementValue = (localValue) => {
		let numeric = getNumeric(localValue);
		let result = Math.floor(numeric / conf.step) * conf.step + conf.step;
		result = validateValue(result);
		result =
			result +
			(conf.showUnit === true && conf.useConverter === true
				? ' ' + conf.unit
				: ' ');
		setLocalValue(result);
		console.log(result);
	};
	const decrementValue = (localValue) => {
		let numeric = getNumeric(localValue);
		let result = Math.ceil(numeric / conf.step) * conf.step - conf.step;
		result = validateValue(result);
		result =
			result +
			(conf.showUnit === true && conf.useConverter === true
				? ' ' + conf.unit
				: ' ');
		setLocalValue(result);
		console.log(result);
	};

	// const handleValueUp = () => {
	// 	incrementValue(parseFloat(localValue));
	// };

	// const handleValueDown = () => {
	// 	decrementValue(localValue);
	// };
	const keyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			let res = getResult(localValue);
			let val = getNumeric(res);
			res = validateValue(val);
			res =
				res +
				(conf.showUnit === true && conf.useConverter === true
					? ' ' + conf.unit
					: ' ');
			console.log(res);
			setLocalValue(res);
		}
		if (e.keyCode === 38) {
			incrementValue(valRef.current);
		}
		if (e.keyCode === 40) {
			decrementValue(valRef.current);
		}
	};
	const onMouseDownStepUp = () => {
		incrementValue(valRef.current);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(onMouseDownStepUp, 100);
	};
	const onMouseDownStepDown = () => {
		decrementValue(valRef.current);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(onMouseDownStepDown, 100);
	};
	const clearInter = () => {
		clearTimeout(timerRef.current);
	};

	return (
		<TextField
			value={localValue}
			onChange={(event) => {
				setLocalValue(event.target.value);
			}}
			onKeyDown={(e) => keyPress(e)}
			classes={{
				root: classes.rootClass,
			}}
			InputProps={{
				disableUnderline: true,
				inputProps: { min: conf.minValue, max: conf.maxValue },
				...InputProps,
				endAdornment: (
					<InputAdornment position='end'>
						<div className={classes.upDownIconContainer}>
							<KeyboardArrowUpIcon
								className={classes.upIcon}
								onMouseDown={onMouseDownStepUp}
								onMouseLeave={clearInter}
								onMouseUp={clearInter}
							/>
							<KeyboardArrowDownIcon
								className={classes.downIcon}
								onMouseDown={onMouseDownStepDown}
								onMouseLeave={clearInter}
								onMouseUp={clearInter}
							/>
						</div>
					</InputAdornment>
				),
			}}
		/>
	);
};

ELXStepper.propTypes = {
	value: PropTypes.number,
	type: PropTypes.string,
};

ELXStepper.defaultProps = {
	InputProps: { disableUnderline: true },
};

export default ELXStepper;

import React, { Fragment, useEffect } from 'react';
import Landing from './Components/Landing';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MuiTableCell from '@material-ui/core/TableCell';

//Table ui
const useStyles = makeStyles({
	table: {
		borderBottom: 'none',
	},
});
const defaultProps = {
	style: { border: '1px solid', padding: 0, margin: 1 },
};
const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		marginBottom: 0,
		padding: '1px 7px',
	},
})(MuiTableCell);

function createData(description, inputField) {
	return { description, inputField };
}

const rows = [
	createData(
		<p style={{ marginLeft: 3 }}>
			Default stepper with Input box rendered with no configuration passed in
			params.
		</p>,
		<Landing caseVal={1} />,
	),
	createData(
		<p style={{ marginLeft: 3 }}>
			Stepper with <b>Length</b> Converter <br />
			Config passed to control:
			<br /> minValue: 0, maxValue: 100, <br />
			stepValue: 0.25, initValue: 5, <br />
			showUnit: true, unit: "in",
			<br />
			decimalPrecision: 2, useConverter: true, <br />
			onchange: function(val) console.log(val) <br />
			<br />
			Example: If you enter "5cm" and press Enter, it will automatically convert
			to "1.97 in"
		</p>,
		<Landing caseVal={2} />,
	),
	createData(
		<p style={{ marginLeft: 3 }}>
			Stepper with <b>Length</b> Converter <br />
			Config passed to control:
			<br />
			minValue: -100, maxValue: 100,
			<br />
			stepValue: 0.5, initValue: 1,
			<br />
			showUnit: true, unit: "cm",
			<br />
			decimalPrecision: 3, useConverter: true,
			<br />
			onchange: function(val) console.log(val)
			<br />
			<br />
			Example: If you enter "2in" or "2 inches" or "2 inch" and press Enter, it
			will automatically convert to "5.08 cm"
		</p>,
		<Landing caseVal={3} />,
	),
	createData(
		<p style={{ marginLeft: 3 }}>
			Stepper with <b>Angle</b> Converter <br />
			Config passed to control:
			<br /> minValue: -180, maxValue: 180,
			<br />
			stepValue: 0.5, initValue: 30,
			<br />
			showUnit: true,
			<br />
			unit: "deg", decimalPrecision: 2,
			<br />
			useConverter: true, converter: new AngleConverter(),
			<br />
			onchange: function(val) console.log(val); <br />
			<br />
			Example: If you enter "2rad" or "2 radian" or "2radians" and press Enter,
			it will automatically convert to "114.59 deg"
		</p>,
		<Landing caseVal={4} />,
	),
	createData(
		<p style={{ marginLeft: 3 }}>
			Stepper with <b>Percent</b> Converter <br />
			Config passed to control: <br /> showUnit: true,
			<br />
			useConverter: true, converter: new PercentageConverter(),
			<br />
			onchange: function(val) console.log(val); <br />
			<br />
			Note: There is no other unit defined for percent. % can ba specified as
			"%" "per" "percent"
		</p>,
		<Landing caseVal={5} />,
	),
];

function App() {
	useEffect(() => {
		document.title = 'Helium Stepper Demo';
	}, []);
	const classes = useStyles();

	return (
		<Fragment>
			<h3>Hello! This is demo of Helium Stepper 2020 version with REACT!</h3>
			<p style={{ margin: 10 }}>
				<b>Features:</b>
				<br />
				While creating the control config can be passed to: <br />
				- Specify which unit family and unit converter class to use with
				instance.
				<br />
				- Specify default unit like for length converter "in" or "pt" can be
				default unit <br />
				but control will accept value in "cm" "pt" or other lenght units and
				there variations
				<br />
				like "in" "inch" "inches" are recognized as inch.
				<br />
				- Specify min and max value limits the control can contain
				<br />
				- Specify customer size of one step on one click up or down. like 1, 2,
				0.5 or 0.25 or random like 0.45
				<br />
				- Specify the precision level like 0, 1, 2, 3 or 4 decimal places to
				support
				<br />
				- Specify wheter to show unit with value or not
				<br />
				- Specify initial value
				<br />
			</p>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='simple table'>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								<TableCell component='th' scope='row'>
									<Box display='flex' flexDirection='row'>
										<Box
											justifyContent='center'
											width='55%'
											borderColor='text.primary'
											m={1}
											pr={1}
											{...defaultProps}>
											{row.description}
										</Box>
										<Box
											m={1}
											p={1}
											pt={4}
											borderColor='text.primary'
											{...defaultProps}>
											{row.inputField}
										</Box>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Fragment>
	);
}

export default App;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  stepper: {
    width: '46px',
    height: '25px',
    paddingLeft: '7px !important',
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    color: '#676767',
    border: '1px solid #E2E2E3',
  },
  spacing: {
    width: '10px',
  },
}));

export default useStyles;

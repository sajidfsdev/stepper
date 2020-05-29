import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box'
import useStyles from './ELXRow.styles';

const ELXRow=({children , ...otherprops})=>{

    const classes=useStyles();

    return (
        <Box 
            {...otherprops} 
            classes = {{root: classes.rootClass}}  
        >
        {children}
        </Box>
    );
}

ELXRow.propTypes={
    children:PropTypes.any,
    component:PropTypes.string,
}

ELXRow.defaultProps={
    children:'',
}
export default ELXRow;
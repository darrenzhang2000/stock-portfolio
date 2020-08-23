import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomSnackbarContentWrapper from './CustomSnackbarContent'
import { setCloseSnackbar } from '../redux/actionCreators'

const CustomizedSnackbar = (props) => {
    const { openSnackbar } = useSelector(state => state.layoutReducer)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setCloseSnackbar(false))
    }

    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
    >
        <CustomSnackbarContentWrapper
            handleClose={handleClose}
        />
    </Snackbar>)
}

CustomizedSnackbar.propTypes = {
    handleClose: PropTypes.func.isRequired
}

const customSnackbarStyles = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
})

export default withStyles(customSnackbarStyles)(CustomizedSnackbar)
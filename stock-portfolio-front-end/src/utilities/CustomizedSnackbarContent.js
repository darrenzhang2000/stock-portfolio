import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';


const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
};

const snackbarContentStyles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: red[600],
    },
    info: {
        backgroundColor: blue[500],
    },
    warning: {
        backgroundColor: amber[700],
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    icon: {
        fontSize: 20
    },
})

const CustomSnackbarContent = (props) => {
    const { classes, className, message, handleClose, ...other } = props;
    
    const { snackbarMessage, snackbarVariant } = useSelector(state => state.layoutHelper)

    const Icon = variantIcon[snackbarVariant]

    return (
        <SnackbarContent
            className={classNames(classes[snackbarVariant], className)}
            aria-describedby="client-snackbar"
            message={
                <span>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {snackbarMessage}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    )
}

CustomSnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
};

export default withStyles(snackbarContentStyles)(CustomSnackbarContent)
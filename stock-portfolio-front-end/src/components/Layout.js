import React, { Fragment, useState } from 'react'
import { Drawer, MenuList, MenuItem, withStyles, IconButton, AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import classNames from 'classnames';
import '../styles/Layout.scss'
import Navbar from './Navbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
const drawerWidth = 240

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },

    hide: {
        display: 'none'
    },

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },


})

const Layout = (props) => {
    const { classes, children, theme } = props

    const [open, setOpen] = useState(true)

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    return <Fragment>
        <div classes={classes.root}>
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar disableGutters={!open} >
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography style={{ flexGrow: 1, textAlign: 'left' }} color="inherit" noWrap>
                        Stockfolio
                    </Typography>
                    {/* {!this.props.isAuth ? null : <Button onClick={this.handleLogOut}><Typography
                        style={{ color: 'white', textTransform: 'none', paddingRight: "10px" }}
                    >Log Out</Typography></Button>} */}
                    <Button color="inherit">
                        <Link className="navlink" to="/containers/Login">
                            Login
                  </Link>
                    </Button>
                    <Button color="inherit" onClick={()=>{}}>
                        Logout
                            </Button>

                    <Button color="inherit">
                        <Link className="navlink" to="/containers/Register">
                            Register
                  </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <MenuList>
                    <MenuItem component={Link} to="/containers/Transactions">Transactions</MenuItem>
                    <MenuItem component={Link} to="/containers/Portfolio">Portfolio</MenuItem>
                    <MenuItem component={Link} to="/containers/Purchase">Purchase</MenuItem>
                </MenuList>
            </Drawer>
            {/* <Navbar
                classes={classes}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            /> */}

        </div>
        <main className="Apps">
            {children}
        </main>


    </Fragment>
}

export default withStyles(styles, { withTheme: true })(Layout)
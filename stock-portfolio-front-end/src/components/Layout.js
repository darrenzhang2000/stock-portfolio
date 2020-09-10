import React, { Fragment, useState } from 'react'
import { Drawer, MenuList, MenuItem, withStyles, IconButton, AppBar, Toolbar, Typography, Button, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from "react-router-dom"
import classNames from 'classnames';
import '../styles/Layout.scss'
import Navbar from './Navbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import ReceiptIcon from '@material-ui/icons/Receipt';
import FolderIcon from '@material-ui/icons/Folder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
const drawerWidth = 240

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        // position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        //width: theme.spacing.unit * 7,
        width: 72,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    listItemIcon: {
        rounded: true
    },

})

const Layout = (props) => {
    const pageName = useSelector(state => state.layoutReducer.pageName)

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
                    <Button color="inherit" onClick={() => { }}>
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
                    <MenuItem component={Link} to="/containers/Transactions" className={classes.menuItem}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText className="icon-Text" primary="Transactions" />
                    </MenuItem>
                    <MenuItem component={Link} to="/containers/Portfolio" className={classes.menuItem}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Portfolio" />
                    </MenuItem>
                    <MenuItem component={Link} to="/containers/Purchase" className={classes.menuItem}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Purchase" />
                    </MenuItem>
                </MenuList>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className="Apps">
                    <header className="App-header" >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' }}>
                            {/* <div style={{ width: 'auto', textAlign: 'center', padding: '20px' }}>
                                <img src={""} alt="logo" style={{ maxWidth: '100%', height: '30px' }} />
                            </div> */}
                            <h1 className="App-title">{pageName} zzz</h1>
                        </div>
                    </header>
                    {children}
                </div>
            </main>
        </div>
    </Fragment>
}

export default withStyles(styles, { withTheme: true })(Layout)
import React, {lazy, Suspense, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import styles from './appStyle';
import {useDispatch} from 'react-redux';
import * as shipmentService from './features/shipment/shipmentService';
import {setShipmentList} from './features/shipment/shipmentSlice';
import _ from 'lodash';
import {
  AppBar,
  Button,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import routes from './app/routes';

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loadedShipments, setLoadedShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);

  const loadShipments = (e) => {
    e.preventDefault();
    setFilteredShipments([]);
    dispatch(shipmentService.fetchShipments())
      .then((data) => {
        setLoadedShipments(data);
      })
  };

  const saveShipments = (e) => {
    e.preventDefault();
    dispatch(setShipmentList(loadedShipments));
  };

  const searchShipment = (e) => {
    const keyword = e.target.value;
    const filteredShipments = _.filter(loadedShipments, (shipment) => {
      const shipmentName = shipment.name;
      return _.includes(shipmentName.toLowerCase(), keyword.toLowerCase());
    });

    setFilteredShipments(filteredShipments);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar color="inherit" position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6">Cargo Planner</Typography>
            <TextField className={classes.searchField} id="shipment-search" name="shipment-search" label="Search"
                       type="search" variant="outlined" size="small" onChange={_.debounce(searchShipment, 500)}/>
            <Button className={classes.loadButton} variant="contained" color="primary"
                    onClick={loadShipments}>LOAD</Button>
            <Button variant="contained" onClick={saveShipments}>SAVE</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar/>
          <div className={classes.drawerContainer}>
            {
              _.isEmpty(loadedShipments) && (
                <Typography variant="body1" color="error">
                  No available shipments. <br/>Please click the load button.
                </Typography>
              )
            }
            <List>
              {
                _.isEmpty(filteredShipments) ?
                  loadedShipments.map((shipment, i) => (
                    <ListItem button key={i} component={Link} to={`/${shipment.id}`}>
                      <ListItemText primary={shipment.name}/>
                    </ListItem>
                  )) :
                  filteredShipments.map((shipment, i) => (
                    <ListItem button key={i} component={Link} to={`/${shipment.id}`}>
                      <ListItemText primary={shipment.name}/>
                    </ListItem>
                  ))
              }
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            {
              routes.map((route, i) => {
                const Component = lazy(() => import(`./${route.feature}`));
                return (
                  <Route key={i} path={route.path} render={
                    props => (
                      <Suspense fallback={<LinearProgress className={classes.loading}/>}>
                        <Component {...route}/>
                      </Suspense>
                    )
                  }/>
                )
              })
            }
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

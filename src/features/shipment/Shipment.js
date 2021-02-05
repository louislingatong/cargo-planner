import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import styles from './shipmentStyle';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Typography, Link, TextField} from '@material-ui/core';
import {fetchAllShipments} from './shipmentSlice';
import _ from 'lodash';

const useStyles = makeStyles(styles);

const maxUnitPerCargoBay = 10;

function Shipment() {
  const classes = useStyles();
  const params = useParams();

  const shipments = useSelector(fetchAllShipments);

  const [selectedShipment, setSelectedShipment] = useState({});
  const [totalCargoBays, setTotalCargoBays] = useState(0)

  useEffect(() => {
    if (_.isEmpty(shipments)) {
      // call fetch shipment api
    } else {
      const shipment = _.find(shipments, ['id', params.id]);
      setSelectedShipment(shipment);
      calculateCargoBays(shipment.boxes);
    }
  }, [shipments, params.id]);

  const preventDefault = (e) => e.preventDefault();

  const calculateCargoBays = (boxes) => {
    let calculatedCargoBays = 0;
    if (boxes) {
      const units = boxes.split(',').map((unit) => parseInt(unit));
      let totalUnits = _.sum(units);
      while (totalUnits > 0) {
        calculatedCargoBays++;
        totalUnits -= maxUnitPerCargoBay;
      }
      setTotalCargoBays(calculatedCargoBays);
    } else {
      setTotalCargoBays(calculatedCargoBays);
    }
  };

  const handleCargoBoxesChange = (e) => {
    calculateCargoBays(e.target.value);
  };

  return (
    <div>
      <div className={classes.toolbar}/>
      <Typography variant="h3" className={classes.shipmentName}>{selectedShipment.name}</Typography>
      <Link href="#" onClick={preventDefault} className={classes.email}>
        <Typography variant="subtitle1" className={classes.email}>{selectedShipment.email}</Typography>
      </Link>
      <Typography variant="subtitle1" className={classes.totalCargoBays}>
        Number of required cargo bays <strong>{totalCargoBays}</strong>
      </Typography>
      <TextField
        name="cargo-boxes"
        id="cargo-boxes"
        label="Cargo boxes"
        key={selectedShipment.boxes}
        defaultValue={selectedShipment.boxes}
        variant="outlined"
        onChange={_.debounce(handleCargoBoxesChange, 500)}
        className={classes.cargoBoxesField}
      />
    </div>
  )
}

export default Shipment;

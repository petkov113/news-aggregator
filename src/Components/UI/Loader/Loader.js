import React from 'react';
import classes from './Loader.module.css';
 
const Loader = () => (
  <div className={classes.lds_ellipsis} data-testid="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
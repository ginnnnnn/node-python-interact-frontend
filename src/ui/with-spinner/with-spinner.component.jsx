import React from 'react';

import Spinner from '../spinner/spinner.component';


const WithSpinner = WrapperedComponent => ({ isLoading, ...otherProps }) => isLoading ?
    <Spinner /> : <WrapperedComponent {...otherProps} />



export default WithSpinner;
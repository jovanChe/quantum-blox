/**
 * Everything just gets set up here, nothing more. 
 * 
 * For more relevant application code, refer to ./app.js
 * 
 * Also, I love to put my general hacks here 
 * (for instance, if you are messing with inlined lazy loaded css hacks, this is your place)
 * 
 * Apart from that, it should just have couple lines of real code.
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

import App from "./app";

import appDataReducers from "./reducers";

/**
 * This is what is where the data for the whole app will live
 */

let store = createStore(appDataReducers);

ReactDOM.render(
    React.createElement(App,  { store }), 
    window.document.getElementById('app'));


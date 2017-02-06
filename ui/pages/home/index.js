"use strict";

import React from 'react';
import homeView from './home.jsx';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.view = homeView;
		this.state = {};

    }

    render() {
        return this.view();
    }
}

export default Home;
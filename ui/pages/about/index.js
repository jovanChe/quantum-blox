"use strict";

import React from 'react';
import aboutView from './about.jsx';

class About extends React.Component{
    constructor(props) {
        super(props);
        this.view = aboutView;
		this.state = {};
        console.log(this.props);
    }
    componentDidUpdate() {
        console.log(this.props)
    }
    render() {
        return this.view();
    }
}

export default About;
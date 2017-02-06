/**
 * This is app component
 * 
 * Along with putting app together, 
 * you put your data store (Redux or some reactive thingy) and stuff like that here
 */
import React, { PropTypes } from 'react';
import {Route, Router, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
/**
* hashHistory is used instead of browserHistory for practical reasons
* hashHistory has uglyer look to it (routes have /#/ prefix, but this routing works in basic setup, 
* even with static html file, where browserHistory requires you to set server side rendering 
* or to always return same page in your router from server)
*/

import Navigation from './components/navigation';

import Home from "./pages/home";
import About from "./pages/about";


const App = ({ store }) => (
            <Provider store={store}>
                <Router history={ hashHistory }>
                    <Route path="/" component={ Home }></Route>
                    <Route path="/about" component={ About }></Route>
                </Router>
            </Provider>    
        );

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
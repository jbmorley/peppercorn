/*
 * Copyright (C) 2015-2016 InSeven Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'

import io from 'socket.io-client';

/**
 * Utility function for parsing a JSON-encoded message.
 */
function parse_message(callback) {
  return function(message) {
    callback(JSON.parse(message));
  }
}

/**
 * Application component.
 */
class ExampleApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            items: []
        }
    }

    /**
     * Called when React mounts the component (when it is first displayed).
     * 
     * We use this to set up the websocket connection as it's not worth being connected until we have something to
     * display the state.
     *
     * See the ReactJS documentation on component lifecycles for more details
     * (https://facebook.github.io/react/docs/component-specs.html).
     */
    componentDidMount() {
        var self = this;
        self.socket = io();
        self.socket.on('server-set-state', parse_message(function(state) {

            // Update the component state.
            // This will cause our component to be re-rendered.
            self.setState(state);

        }));
    }

    /**
     * Called when React mounts the component (when it is first displayed).
     *
     * We disconnect from the websocket at this point.
     *
     * See the ReactJS documentation on component lifecycles for more details
     * (https://facebook.github.io/react/docs/component-specs.html).
     */
    componentWillUnmount() {
        var self = this;
        self.socket.disconnect();
        self.socket = undefined;
    }

    sendMessage(message, parameters) {
        var self = this;
        self.socket.emit(message, JSON.stringify(parameters));
    }

    /**
     * Called whenever the form is submitted.
     * 
     * See render() for where this callback is setup.
     */
    onSubmit(event) {
        var self = this;

        // Prevent the default submit action from being performed.
        event.preventDefault();

        // Capture the text and clear the state.
        var newText = self.state.text;
        self.setState({text: ''});

        // Send a message to the server telling it to add our new item.
        // We do not update our state here. Instead, we perform our update when the server sends a message with the new
        // state.
        self.sendMessage('client-add-item', {text: newText});
    }

    /**
     * Called whenever the input text field changes.
     * 
     * See render() for where this callback is setup.
     */
    onChange(event) {
        var self = this;
        self.setState({text: event.target.value});
    }

    /**
     * Create the DOM representation of our component.
     */
    render() {
        var self = this;
        return (
            <div>
                <ul>
                    {
                        self.state.items.map((item) => {
                            return <li key={item.id}>{item.text}</li>
                        })
                    }
                </ul>
                <form
                    onSubmit={(event) => self.onSubmit(event)}>
                    <input
                        onChange={(event) => self.onChange(event)}
                        value={self.state.text} />
                    <button>Add Item</button>
                </form>
            </div>
        );
    }

}

// Mount an instance of the React component ExampleApplication on the DOM element with id 'app'.
ReactDOM.render((
    <Router>
        <Route path="/" component={ExampleApplication} />
    </Router>
), document.getElementById('app'));

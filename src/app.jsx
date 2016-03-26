/*
 * Copyright (C) 2015-2016 Jason Barrie Morley.
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { MapChoropleth } from 'react-d3-map-choropleth';

class ExampleApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            districts: 10,
        }
    }

    componentDidMount() {
        var self = this;
    }

    componentWillUnmount() {
        var self = this;
    }

    render() {
        var self = this;
        return (
            <div>
                <p>{self.state.districts}</p>
            </div>
        );
    }

}

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var self = this;
        return (
            <ul
                style={{
                    border: '2px solid red',
                    borderRadius: '12px',
                    margin: 0,
                    padding: '10px',
                    display: 'inline-block',
                }}>
                {(() => {
                    console.log(this.props.count);
                    var result = []
                    for (var i=0; i<this.props.count; i++) {
                        result.push((
                            <li
                                style={{
                                    listStyle: 'none',
                                    display: 'inline',
                                }}>
                                {this.props.character}
                            </li>));
                    }
                    return result;
                })()}
            </ul>
        )
    }

}

class DistrictInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 4,
        };
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h1>{this.props.params.district}</h1>
                <Counter
                    character="🐙"
                    count={this.state.count} />
            </div>
        )
    }

}

class DistrictList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            districts: [
                {identifier: 'district-a', name: 'District A'},
                {identifier: 'district-b', name: 'District B'},
                {identifier: 'district-c', name: 'District C'},
            ],
        };
    }

    render() {
        return (
            <div>
                <h1>District List</h1>
                <ul>
                    {
                        this.state.districts.map((district) => {
                            console.log(district.identifier);
                            var path = "/" + district.identifier;
                            return <li key={district.identifier}><Link to={path}>{district.name}</Link></li>
                        })
                    }
                </ul>
            </div>
        )
    }

}


ReactDOM.render((
    <Router>
        <Route path="/" component={DistrictList} />
        <Route path="/:district" component={DistrictInfo} />
    </Router>
), document.getElementById('app'));

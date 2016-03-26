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
import topojson from 'topojson';

var width = 960;
var height = 600;
var topodata = require('./us.json');
var unemployment = require('./unemployment.tsv');
var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;
var domain = {
    scale: 'quantize',
    domain: [0, .15],
    range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
};
var domainValue = function(d) { return +d.rate; };
var domainKey = function(d) {return +d.id};
var mapKey = function(d) {return +d.id};
var scale = 1280;
var translate = [width / 2, height / 2];
var projection = 'albersUsa';

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

class DistrictInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h1>{this.props.params.district}</h1>
                <MapChoropleth
                    width={width}
                    height={height}
                    dataPolygon={dataCounties}
                    dataMesh={dataStates}
                    scale={scale}
                    domain={domain}
                    domainData={unemployment}
                    domainValue={domainValue}
                    domainKey={domainKey}
                    mapKey ={mapKey}
                    translate={translate}
                    projection={projection}
                    showGraticule={true}
                />
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
            <ul>
                {
                    this.state.districts.map((district) => {
                        console.log(district.identifier);
                        var path = "/" + district.identifier;
                        return <li key={district.identifier}><Link to={path}>{district.name}</Link></li>
                    })
                }
            </ul>
        )
    }

}


ReactDOM.render((
    <Router>
        <Route path="/" component={DistrictList} />
        <Route path="/:district" component={DistrictInfo} />
    </Router>
), document.getElementById('app'));

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
import MapChoropleth from 'react-d3-map-choropleth';
import ReactHighcharts from 'react-highcharts';


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
                                key={i}
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


var details = {
    district_a: {
        name: 'District A',
        percentage: 53,
        energy: 100,
        energy2: 106,
        data: {
            chart: {
                    backgroundColor: '#eee',
                    style: {
                        fontFamily: 'Roboto',
                    },
                },
                plotOptions: { line: { lineWidth: 3 } },
                title: { text: "" },
                colors: ['#ff00ff', '#00ffff'],
                xAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    title: {
                        text: ""
                    },
                },
                series: [                {
                data: [2.9, 7.5, 10.4, 12.2, 14.0, 17.0, 13.6, 14.5, 21.4, 19.1, 29.6, 45.4]
            },{
                    data: [29.9, 71.5, 194.1, 295.6, 454.4, 176.0, 135.6, 148.5, 216.4, 106.4, 129.2, 144.0]
                },]
        },
    },
    district_b: {
        name: 'District B',
        percentage: 99,
        energy: 237,
        energy2: 0,
        data: {
            chart: {
                    backgroundColor: '#eee',
                    style: {
                        fontFamily: 'Roboto',
                    },
                },
                plotOptions: { line: { lineWidth: 3 } },
                title: { text: "" },
                colors: ['#ff00ff', '#00ffff'],
                xAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    title: {
                        text: ""
                    },
                },
                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
                {
                data: [2.9, 7.5, 10.4, 12.2, 14.0, 17.0, 13.6, 14.5, 21.4, 19.1, 29.6, 45.4]
            }]
        }
    },
    district_c: {
        name: 'District C',
        percentage: 53,
        energy: 100,
        energy2: 106,
        data: {
            chart: {
                    backgroundColor: '#eee',
                    style: {
                        fontFamily: 'Roboto',
                    },
                },
                plotOptions: { line: { lineWidth: 3 } },
                title: { text: "" },
                colors: ['#ff00ff', '#00ffff'],
                xAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    labels: {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }
                    },
                    title: {
                        text: ""
                    },
                },
                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
                {
                data: [2.9, 7.5, 10.4, 12.2, 14.0, 17.0, 13.6, 14.5, 21.4, 19.1, 29.6, 45.4]
            }]
        }
    },
}


class DistrictInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: details[props.params.district],
        };
    }

    render() {
        const iconStyle = {
            fontSize: '100px',
            color: '#444',
        };
        return (
            <div>
                <h1>{this.state.details.name}</h1>
                <Link to="/">Back</Link>
                <InfoText>
                    This is an example of some informative bubble explaining what's going on.
                </InfoText>
                <i
                    className="material-icons"
                    style={iconStyle}>
                    face
                </i>
                <i
                    className="material-icons"
                    style={iconStyle}>
                    favorite
                </i>
                <i
                    className="material-icons"
                    style={iconStyle}>
                    home
                </i>
                <SummaryStatistic
                    value={this.state.details.percentage}
                    unit="%"
                    description="Something interesting happened here."
                    color="#fff"
                    backgroundColor="#f0f" />
                <SummaryStatistic
                    value={this.state.details.energy}
                    unit="kJ"
                    description="Energy used."
                    color="#fff"
                    backgroundColor="#0ff" />
                <SummaryStatistic
                    value={this.state.details.energy2}
                    unit="kJ"
                    description="Energy used."
                    color="#444"
                    backgroundColor="#ff0" />
                <ReactHighcharts
                    config={this.state.details.data} />

            </div>
        )
    }

}

class InfoText extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    borderRadius: '12px',
                    backgroundColor: '#444',
                    padding: '10px',
                    margin: '10px',
                    color: '#fff',
                }}>
                {this.props.children}
            </div>
        );
    }

}

class SummaryStatistic extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    borderRadius: '30px 0',
                    backgroundColor: this.props.backgroundColor,
                    padding: '20px',
                    margin: '10px',
                    color: this.props.color,
                    display: 'inline-block',
                }}>
                <div
                    style={{
                        fontWeight: 'bold',
                        fontSize: '80px',
                        display: 'inline-block',
                    }}>
                    {this.props.value}
                </div>
                <div
                    style={{
                        fontWeight: 'bold',
                        display: 'inline-block',
                    }}>
                    {this.props.unit}
                </div>
                <div
                    style={{
                        fontSize: '10px',
                    }}>
                    {this.props.description}
                </div>
            </div>
        );
    }

}


class DistrictList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            districts: [
                {identifier: 'district_a', name: 'District A'},
                {identifier: 'district_b', name: 'District B'},
                {identifier: 'district_c', name: 'District C'},
            ],
        };
    }

    render() {
        return (
            <div>
                <h1>Demo</h1>
                <InfoText>Select a region to explore.</InfoText>
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

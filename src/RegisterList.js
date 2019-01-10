import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {dateToTimestamp} from './methods.js';


class RegisterList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var arr = this.props.registers;
        var sortedArr = dateSortByKey(arr, 'datetime');

        function dateSortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = dateToTimestamp(a[key]);
                var y = dateToTimestamp(b[key]);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        var removeRegister = this.props.removeRegister;

        return (
            <div>
                <ul className="register_ul">
                    {Object.keys(sortedArr).map(function (key) {
                        var time = new Date(sortedArr[key].datetime).getHours() + '.00';
                        if (time.length == 4) {
                            time = '0' + time;
                        }
                        return <li key={(sortedArr[key].datetime+sortedArr[key].name).toString()}
                                   className="register_list"><span className="register_time">{time}</span>

                            <span className="register_name"><a href="/clients">{sortedArr[key].name}</a></span>
                                                     
                             <span><Button bsSize="xsmall" bsStyle="danger" className="btn-close"
                                           onClick={() => { removeRegister(sortedArr[key])}}>
                                                              <Glyphicon glyph="remove"/></Button></span>
                        </li>
                    }) }
                </ul>
            </div>
        );
    }
}

export default RegisterList;
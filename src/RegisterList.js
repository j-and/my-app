import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class RegisterList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        var arr = this.props.registers;
        var sortedArr = sortByKey(arr, 'time');

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
   
        var removeRegister=this.props.removeRegister;

        return (
            <div>
                <ul>
                    {Object.keys(sortedArr).map(function (key) {
                            return <li className="register-list">{sortedArr[key].time + ' ' + sortedArr[key].name}
                             <Button bsSize="xsmall" bsStyle="danger"  className="btn-close"  onClick={() => { removeRegister(sortedArr[key])}}>
                                                              <Glyphicon glyph="remove"/></Button>
                            </li>
                    }) }
                </ul>
            </div>
        );
    }
}

export default RegisterList;
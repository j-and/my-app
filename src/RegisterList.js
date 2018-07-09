import React, {Component} from 'react';

class RegisterList extends Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
    }

    render() {
        var arr = this.props.registersMock;
        for (var i = 0; i < this.props.registers.length; i++) {
            arr.push(this.props.registers[i]);
        }
        var sortedArr = sortByKey(arr, 'time');

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        return (
            <div>
                <ul>
                    {Object.keys(sortedArr).map(function (key) {
                            return <li>{sortedArr[key].time + ' ' + sortedArr[key].name}</li>
                    }) }
                </ul>
            </div>
        );
    }
}

export default RegisterList;
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

        var arr=[];
        for(var i=0;i<this.props.registers.length;i++){
            arr.push(this.props.registers[i]);
        }
        var sortedArr=arr.sort();

        return (
            <div >
                <ul >
                    {
                        Object.keys(sortedArr).map(function (key) {
        return <li>{sortedArr[key]}</li>
    }.bind(this))
                    }
                </ul>
            </div>
        );
    }
}

export default RegisterList;
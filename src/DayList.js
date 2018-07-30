import React, {Component} from 'react';
var fetch = require("node-fetch");
import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';

class DayList extends Component {

    constructor(props) {
        super(props);

        this.addRegister = this.addRegister.bind(this);
        this.removeRegister = this.removeRegister.bind(this);

        this.state = {
            registers: [],
            times: {},
            initialTimeArray: [],
            REGISTERS: [],
            busytime: []
        };
    }

    componentDidMount() {
        fetch('/getRegisters', {
            method: 'GET'
        }).then((response) => {
            response.json().then((data) => {
                this.setState({REGISTERS: data})
            })
        });
    }

    addRegister(registers) {
        this.setState({registers: registers});
    }

    removeRegister(register) {
        var newRegister = {
            id: register.id,
            year: register.year,
            month: register.month,
            day: register.day,
            time: register.time,
            name: register.name,
            status: 'available'
        };
        fetch('/removeRegister', {
            method: "POST",
            body: JSON.stringify(newRegister),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                this.setState({REGISTERS: data});
                this.setState({registers: []});
            })

        });


        // var newArray = this.state.registers;
        //
        // newArray.filter(function (item) {
        //     var index = item.time.indexOf(newRegister.time);
        //     if (index !== -1)  item.status = 'busy';
        //     return item;
        // });
        // this.setState({registers: newArray});
    }

    render() {

        var currentMonth = this.props.currentMonth;
        var currentDay = this.props.currentDay;
        var arr = this.state.registers;

        var busyTime = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'];
        var REGISTERS = this.state.REGISTERS;

        var filteredArray = REGISTERS.concat(arr).filter(function (register) {
            if (register.month == currentMonth && register.day == currentDay && register.status == 'busy') {
                var index = busyTime.indexOf(register.time);
                if (index !== -1) busyTime.splice(index, 1);
                return register;
            }
        });
        return (
            <div >
                <div className="day_ordinary_label"> {this.props.currentDay}</div>
                <RegisterList registers={filteredArray} removeRegister={this.removeRegister}/>
                <ClientNameInput addRegister={this.addRegister}
                                 initialTimeArray={busyTime}
                                 currentDay={this.props.currentDay} currentMonth={this.props.currentMonth}
                                 currentYear={this.props.currentYear}/>
            </div>
        );
    }
}
export default DayList;
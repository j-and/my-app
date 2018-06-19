import React, {Component} from 'react';
import './App.css';


class Register extends Component {

    constructor(props) {
        super(props);

        //this.state = {time: 'Time', value: ''};
        this.state = {
            registers: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.enterName = this.enterName.bind(this);
        this.save = this.save.bind(this);
        this.selectTime = this.selectTime.bind(this);

    }


    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
        this.setState({value: ''});
        this.setState({time: 'Time'});
    }

    enterName(event) {
        this.setState({value: event.target.value});
    }

    save(event) {
        this.props.updateData(this.state.time, this.state.value);
    }

    selectTime(eventKey) {
        this.setState({time: eventKey});
    }

    handleChange(event) {
        this.setState({registers: event.target.value});
        //this.state.registers['register-' + this.counter] = event.target.value;
    }



//<input class="input-name" placeholder="Name" value={this.state.value} onChange={this.enterName}/>
    render() {

        return (

            <div>

            </div>
       );
    }
}

export default Register;
// <form onSubmit={this.handleSubmit}>
//
//     <select value={this.state.value} onChange={this.handleChange}>
//         <option value="grapefruit">Grapefruit</option>
//         <option value="lime">Lime</option>
//         <option value="coconut">Coconut</option>
//         <option value="mango">Mango</option>
//     </select>
//
//     <input type="submit" value="Submit" />
// </form>
// <DropdownButton title={this.state.time} id="1" value={this.state.value} onChange={this.handleChange}>
//     <MenuItem eventKey="08.00">08.00</MenuItem>
//     <MenuItem eventKey="09.00">09.00</MenuItem>
//     <MenuItem eventKey="10.00">10.00</MenuItem>
//     <MenuItem eventKey="11.00">11.00</MenuItem>
//     <MenuItem eventKey="12.00">12.00</MenuItem>
//     <MenuItem eventKey="13.00">13.00</MenuItem>
//     <MenuItem eventKey="14.00">14.00</MenuItem>
//     <MenuItem eventKey="15.00">15.00</MenuItem>
//     <MenuItem eventKey="16.00">16.00</MenuItem>
//     <MenuItem eventKey="17.00">17.00</MenuItem>
//     <MenuItem divider/>
//     <MenuItem eventKey="4">Add</MenuItem>
// </DropdownButton>
//
// <Button bsSize="xsmall" bsStyle="success" className="" onClick={this.save}> <Glyphicon
// glyph="ok"/></Button>
//     <Button bsSize="xsmall" bsStyle="danger" className="" onClick={this.clear}> <Glyphicon
// glyph="remove"/></Button>
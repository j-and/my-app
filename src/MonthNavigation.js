import React, {Component} from 'react';


class MonthNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            monthCount: new Date().getMonth()
        };
    }

    render() {
        return (
            <div >
                <button onClick={() => {this.props.updateMonthCount(this.state.monthCount)}}>Previous</button>
                <button onClick={() =>{ this.props.updateMonthCount(this.state.monthCount+2)}}>Next</button>
            </div>
        );
    }
}
export default MonthNavigation;

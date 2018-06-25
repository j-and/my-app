import React, {Component} from 'react';


class MonthNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div >
                Nav= {this.props.currentMonth}//
                <button onClick={() => {this.props.updateMonthCount(this.props.currentMonth-1)}}>Previous</button>
                <button onClick={() =>{ this.props.updateMonthCount(this.props.currentMonth+1)}}>Next</button>
            </div>
        );
    }
}
export default MonthNavigation;

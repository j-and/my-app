import React, {Component} from 'react';


class MonthNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //alert('this.props.currentYear='+this.props.currentYear);
        return (
            <div >
                <button
                    onClick={() => {this.props.updateMonthCount(this.props.currentMonth==1 ? 12 : this.props.currentMonth-1,this.props.currentMonth==12 ? new Date().getFullYear()-1 : new Date().getFullYear())}}>
                    Previous
                </button>
                {new Date(this.props.currentYear, this.props.currentMonth, 0).toLocaleString("en-us", {month: "long"})}
                / {this.props.currentYear}
                <button
                    onClick={() =>{ this.props.updateMonthCount(this.props.currentMonth==12 ? 1 : this.props.currentMonth+1,this.props.currentMonth==12 ? new Date().getFullYear()+1 : new Date().getFullYear())}}>
                    Next
                </button>
            </div>
        );
    }
}
export default MonthNavigation;

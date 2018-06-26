import React, {Component} from 'react';

import Button from 'react-bootstrap/lib/Button';

class MonthNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="centered">
                <Button
                    onClick={() => {this.props.updateMonthCount(this.props.currentMonth==1 ? 12 : this.props.currentMonth-1,this.props.currentMonth==12 ? new Date().getFullYear()-1 : new Date().getFullYear())}}>
                    &larr; Previous
                </Button>
                <h2>
                    {new Date(this.props.currentYear, this.props.currentMonth, 0).toLocaleString("en-us", {month: "long"})}
                    / {this.props.currentYear}
                </h2>
                <Button
                    onClick={() =>{ this.props.updateMonthCount(this.props.currentMonth==12 ? 1 : this.props.currentMonth+1,this.props.currentMonth==12 ? new Date().getFullYear()+1 : new Date().getFullYear())}}>
                    Next  &rarr;
                </Button>
            </div>
        );
    }
}
export default MonthNavigation;
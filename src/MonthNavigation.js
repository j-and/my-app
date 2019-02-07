import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import moment from 'moment';

import Button from 'react-bootstrap/lib/Button';

class MonthNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        
            <div className="nav-centered">
                <Button className="btn btn-info"
                    onClick={() => {this.props.updateMonthCount(this.props.currentMonth===1 ? 12 : this.props.currentMonth-1,this.props.currentMonth===12 ? this.props.currentYear-1 : this.props.currentYear)}}>
                     <FormattedMessage id="calendar.previous" defaultMessage="Previous" description=""/>
                </Button>
                <h2>
                    <FormattedMessage id={'calendar.'+this.props.currentMonth.toString()}
                                      defaultMessage="Clients"
                                      description=""
                                      values={moment(new Date(this.props.currentYear, this.props.currentMonth, 0)).format('MMMM')}/>
                    / {this.props.currentYear}
                </h2>
                <Button className="btn btn-info"
                    onClick={() =>{ this.props.updateMonthCount(this.props.currentMonth===12 ? 1 : this.props.currentMonth+1,this.props.currentMonth===12 ? this.props.currentYear+1 : this.props.currentYear)}}>
                    <FormattedMessage id="calendar.next" defaultMessage="Next" description=""/>
                </Button>
            </div>
        );
    }
}
export default MonthNavigation;
//
// <FormattedMessage id="calendar.test"
//                   defaultMessage="Clients"
//                   description=""
//                   values={{ month:  new Date(this.props.currentYear, this.props.currentMonth, 0).toLocaleString("en-us", {month: "long"})} }/>
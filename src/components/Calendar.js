import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
    constructor(props) {
        super(props);
        const now = moment();
        const startOfWeek = now.startOf('week');
        const endOfWeek = now.endOf('week');
        this.state = {
            now: now,
            startOfWeek,
            endOfWeek,
            currentMonth: startOfWeek.format("MMMM YYYY")
        }
    }
    renderHeader() {
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevWeek}>chevron_left</div>
                </div>
                <div className="col col-center">
                    <span>{this.state.currentMonth}</span>
                </div>
                <div className="col col-end" onClick={this.nextWeek}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const weekdays = moment.weekdays();
        const days = [];
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {weekdays[i]}
            </div>
          );
        }
        return <div className="days row">{days}</div>;
    }

    renderCells() {

    }

    onDateClick = day => {

    };
  
    nextWeek = () => {
        this.setState({
            startOfWeek: this.state.startOfWeek.add(1, 'week'),
            endOfWeek: this.state.endOfWeek.add(1, 'week'),
            currentMonth: this.state.startOfWeek.format("MMMM YYYY")
        })
    }
    
    prevWeek = () => {
        this.setState({
            startOfWeek: this.state.startOfWeek.subtract(1, 'week'),
            endOfWeek: this.state.endOfWeek.subtract(1, 'week'),
            currentMonth: this.state.startOfWeek.format("MMMM YYYY")
        })
    }

    render () {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
            </div>
        );
    }
}
export default Calendar;
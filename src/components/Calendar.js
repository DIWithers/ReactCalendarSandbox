import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
    constructor(props) {
        super(props);
        //Moments are mutable, everyone needs their own copy
        this.state = {
            selectedDate: moment(),
            startOfWeek: moment().startOf('week'),
            endOfWeek: moment().endOf('week'),
            currentMonth: moment().format("MMMM YYYY"),
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
        const { startOfWeek, endOfWeek, selectedDate, currentMonth } = this.state;
        const dateFormat = "D";
        let formattedDate = "";
        let row = null;
        let days = [];
        let day = startOfWeek.clone();
        let endDate = endOfWeek.clone();
        let monthStart = selectedDate.clone().startOf('month');
        while( day <= endDate) {
            formattedDate = day.format(dateFormat);
            const cloneDay = day.clone();
            days.push(
                <div 
                    className={ `col cell ${
                        day.isSame(selectedDate, 'day') ?
                            "selected" : ""
                    }`}
                    key={day.toString()}
                    onClick={() => this.onDateClick(cloneDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
            )
            day = day.add(1, 'day');
        }
        row = <div className="row" key={day}>{days}</div>
        days = [];
        return <div className="body">{row}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };
  
    nextWeek = () => {
        this.setState({
            startOfWeek: this.state.startOfWeek.add(1, 'week'),
            endOfWeek: this.state.endOfWeek.add(1, 'week'),
            currentMonth: this.state.startOfWeek.clone().add(4, 'day').format("MMMM YYYY")
        })
    }
    
    prevWeek = () => {
        this.setState({
            startOfWeek: this.state.startOfWeek.subtract(1, 'week'),
            endOfWeek: this.state.endOfWeek.subtract(1, 'week'),
            currentMonth: this.state.startOfWeek.clone().add(4, 'day').format("MMMM YYYY")
        })
    }

    render () {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}
export default Calendar;
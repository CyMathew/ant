import React from 'react';
import {connect} from 'react-redux';

/**
 * Timer component for recording time within a project
 * Has it's own state management but accepts external sources to intialize its state
 */

class Timer extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            minuteShow: false,
        };
        
        this.onClick = this.onClick.bind(this);
        this.tick = this.tick.bind(this);
        this.timeIncrement = this.timeIncrement.bind(this);
        this.resetInterval = this.resetInterval.bind(this);
        this.saveTime = this.saveTime.bind(this);
    }

    componentWillMount()
    {
        //Used to keep track of how many seconds left beofre calling timeIncrement and resetting
        //This is needed for when time is paused, in order synchronize the seconds with the timeIncrement function
        this.incrementTimeDur = 60000;

        //Get the state if it already exists
        this.setState(this.props.savedTime);

    }

    componentWillUnmount()
    {
        //Clear any intervals
        clearInterval(this.tickRate);

        //Save the time
        this.saveTime();
    }

    /**
     * Dispatches action to save the time
     */
    saveTime()
    {
        let savedTime = this.state;
        let index = this.props.id;
        this.props.dispatch({
            type: "SAVE_TIME", 
            payload: {index, savedTime}
        });
    }

    /**
     * Called when user clicks the timer to pause or resume timing.
     */
    onClick() 
    {
        //If the tickRate hasn't been set or has been cleared, start timing
        if(this.tickRate == 0 || this.tickRate == undefined)
        {
            // console.log('tickrate started');
            this.tickRate = setInterval(this.tick, 1000);
            this.secChange = setInterval(this.timeIncrement, this.incrementTimeDur);
        }
        else    //If timer is clicked while timer was running, pause
        {
            this.incrementTimeDur = 60000 - (this.state.seconds * 1000);
            // console.log('tickrate stopped. Time remaining: ', this.formatCallTime);
            clearInterval(this.tickRate);
            clearInterval(this.secChange);
            this.tickRate = 0;
        }
    }

    /**
     * Called every second to progress the timer.
     */
    tick()
    {
        let newTime = this.state.seconds +1;
        this.setState({ seconds: newTime });
    }

    /**
     * Called when timer was paused and resumed, causing timeIncrement to reset the self-calls back to 60s.
     */
    resetInterval()
    {
        this.incrementTimeDur = 60000;
        clearInterval(this.secChange);
        this.secChange = setInterval(this.timeIncrement, this.incrementTimeDur);
    }
    
    /**
     * Called every 60s to update the rest of time variables.
     */
    timeIncrement()
    {
        if(this.incrementTimeDur != 60000)
            this.resetInterval();

        // console.log('calling time format');
        if(this.state.seconds >= 60)
        {
            this.setState((prevState) => ({ seconds: 0,
                                            minutes: prevState.minutes+1}));

            if(this.state.minutes >= 60)
                this.setState((prevState) => ({ minutes: 0, 
                                                hours: prevState.hours+1, 
                                                minuteShow: true}));
        }

        //Save to local storage every minute
        this.saveTime();
    }
    
    
    render() 
    {
        return (
            <div id="timer" onClick={this.onClick}>
                {this.state.hours > 0 && <span id="hoursSpan">{this.state.hours}</span>}
                {(this.state.minutes < 10 && this.state.minuteShow) && <span>0</span>}
                {(this.state.minutes > 0 || this.state.minuteShow) && <span id="minutesSpan">{this.state.minutes}</span>}
                {this.state.seconds < 10 && <span>0</span>}
                <span id="secondSpan">{this.state.seconds}</span>
            </div>
        );
    }
};


export default connect()(Timer);
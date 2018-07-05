import React from 'react';
import { connect } from 'react-redux';

/**
 * AddField component used to add projects to the app, specifically in the sidemenu and  app itself via react-router
 */
class AddField extends React.Component
{
    constructor(props) {
        super(props);

        //Bind functions
        this.addLink = this.addLink.bind(this);
        this.hideField = this.hideField.bind(this);

        //Reference for input field
        this.inputRef = React.createRef();
    }

    /**
     * Adds a new link once add button is clicked
     * @param {*} event UI event object
     */
    addLink(event)
    {   
        //Keep the form tag from going to a new page
        event.preventDefault();
        let name = this.inputRef.current.value;

        //Dispatch this event to Redux store
        this.props.dispatch({type: "ADD_PROJECT", name});

        //Reset the field
        this.inputRef.current.value = "";

        //Hide the field after input is entered
        this.hideField();
    }
    
    /**
     * Used to hide the addfield component
     */
    hideField()
    {
        this.props.dispatch({type: "AF_HIDE"});
    }

    render() 
    {
        return (
            <div>
                {   this.props.show && (
                    <form onSubmit={this.addLink}>
                        <input ref={this.inputRef} type="text" required/>
                        <button type="submit">Add</button>
                        <button type="button" onClick={this.hideField}>Cancel</button>
                    </form>    
                    ) 
                }

            </div>
        );
    }
}

export default connect()(AddField);

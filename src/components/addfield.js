import React from 'react';
import { connect } from 'react-redux';

class AddField extends React.Component
{
    constructor(props) {
        super(props);

        this.addLink = this.addLink.bind(this);
        this.hideField = this.hideField.bind(this);
        this.inputRef = React.createRef();
    }

    addLink(event)
    {   
        event.preventDefault();
        let name = this.inputRef.current.value;

        this.props.dispatch({type: "ADD_PROJECT", name});
        this.inputRef.current.value = "";
        this.hideField();
    }
    
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

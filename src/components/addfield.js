import React from 'react';

class AddField extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            routes: []
        };

        this.addLink = this.addLink.bind(this);
        this.inputRef = React.createRef();
    }

    addLink(event)
    {   
        event.preventDefault();
        let name = this.inputRef.current.value;
        console.log(name);

        this.setState((prevState) =>{
                let tempArray = prevState.links.slice();
                tempArray.push(name);

                return ({ links: tempArray,
                          routes: tempArray})
            }
        );
        
        this.inputRef.current.value = "";
        this.props.hide();
    }

    render() 
    {
        return (
            <div>
                <nav>
                    {this.state.links.map((name, index) => (
                        <Link key={index} to={"/" + name}>{name}</Link>
                    ))}
                </nav>
                <div>
                {this.state.routes.map((name, index) => (
                        <Route path={"/" + name} key={name} component={Timer}/>
                    ))}
                </div>

                {
                    this.props.show && (
                    <form onSubmit={this.addLink}>
                        <input ref={this.inputRef} type="text" required/>
                        <button type="submit">Add</button>
                    </form>    
                    ) 
                }

            </div>
        );
    }
    
}

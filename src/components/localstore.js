
//Get browser's localstorage object
var localStorage = window.localStorage;

export const loadState = () => {
    try 
    {
        const serializedState = localStorage.getItem('state');

        //If key called 'state' doesn't exist, let reducer initial state
        if(serializedState === null)
            return undefined;
        
        //Else return the stored state as JSON
        return JSON.parse(serializedState);
    } 
    catch (error) 
    {
        //If privacy is set to not allow localstorage, return nothing so that 
        return undefined;
    }
}

export const saveState = (state) => 
{
    try 
    {
        //Stringify the state and save it in localstorage
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } 
    catch (error) 
    {
        //Ignore errors because there's nothing you can do.
    }
}
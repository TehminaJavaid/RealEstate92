import { createStore } from 'redux';

function counterReducer(state = { value: 0 }, action) {
    if(action.type === 'incremented')
    {
        return action.payload
    }
    console.log("actionpayload", action.payload)
    console.log("state", state)
    return state
}



export default counterReducer;
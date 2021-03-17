import { combineReducers } from '@reduxjs/toolkit';
import property from './propertySlice';
import properties from './propertiesSlice';

const reducer = combineReducers({
	property,
	properties
});

export default reducer;
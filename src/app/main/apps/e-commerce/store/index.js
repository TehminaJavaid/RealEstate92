import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import products from './productsSlice';
import invoice from './invoiceSlice';
import invoices from './invoicesSlice';
import salesorder from './salesorderSlice';
import salesorders from './salesordersSlice';
import property from './propertySlice';
import properties from './propertiesSlice';

const reducer = combineReducers({
	products,
	product,
	orders,
	order,
	invoices,
	invoice,
	salesorders,
	salesorder,
	property,
	properties
});

export default reducer;

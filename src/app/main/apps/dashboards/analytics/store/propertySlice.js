import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProperty = createAsyncThunk('analyticsDashboardApp/property/getProperty', async params => {
	console.log("yoooo")
	//console.log("params", params.salesorderId)
	const accid = params.salesorderId;
	console.log("salesorderid", accid);
	const response = await axios.get('https://hacorps.tech/estate92/public/api/saleorders/'+accid);
	const data = await response.data.message;
	console.log("form data", data);
	return data === undefined ? null : data;
});

export const getPropertyid = createAsyncThunk('analyticsDashboardApp/property/getPropertyid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/users');
	const data = await response.data.message;
	console.log("user data", data);
	return data === undefined ? null : data;
});


//https://hacorps.tech/estate92/public/api/accounts
export const saveProperty = createAsyncThunk('https://estate92.herokuapp.com/api/add/property', async property => {
	console.log("propertiesobject", property);
	//console.log("quoteid", salesorder.quote_id);
	
	const response = await axios.post('https://estate92.herokuapp.com/api/add/property',property);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("salesorder Created Successfully")
		//newsalesorder();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});

export const editProperty = createAsyncThunk('analyticsDashboardApp/property/editProperty', async salesorder => {
	const acid = salesorder.id;
	console.log("editid", acid);
	
	//product.push('_method', 'PATCH');
	const response = await axios.patch('https://hacorps.tech/estate92/public/api/salesorders/'+acid, salesorder);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("salesorder Edited Successfully")
		//edited salesorder();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});

/*export const saveFloors = createAsyncThunk('eCommerceApp/property/saveFloors', async floorrows => {
	console.log("second");
	console.log("floors", floorrows);
	const data = floorrows;
	return data;
});*/
/*export const getRegionid = createAsyncThunk('eCommerceApp/property/getRegionid', async () => {

	const response = await axios.get('https://estate92.herokuapp.com/api/list/property/regions');
	const data = await response.data.message;
	console.log("region data", data);
	return data === undefined ? null : data;
});*/

const propertySlice = createSlice({
	name: 'analyticsDashboardApp/property',
	initialState: null,
	reducers: {
		resetProperty: () => null,
		newProperty: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					tittle: '',
					project_type: '',
					description: '',
					project_address: '',
					block_id: '',
					picture: [],
					video: ''
				}
			})
		}
	},
	extraReducers: {
		[getProperty.fulfilled]: (state, action) => action.payload,
		[saveProperty.fulfilled]: (state, action) => action.payload,
		[editProperty.fulfilled]: (state, action) => action.payload,
		[getPropertyid.fulfilled]: (state, action) => action.payload,
		/*[saveFloors.fulfilled]: (state, action) => action.payload,*/
		
		
	}
});

export const { newProperty, resetProperty } = propertySlice.actions;

export default propertySlice.reducer;
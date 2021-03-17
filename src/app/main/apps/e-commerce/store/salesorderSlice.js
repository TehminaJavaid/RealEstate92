import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getSalesorder = createAsyncThunk('eCommerceApp/salesorder/getSalesorder', async params => {
	console.log("yoooo")
	console.log("params", params.salesorderId)
	const accid = params.salesorderId;
	console.log("salesorderid", accid);
	const response = await axios.get('https://hacorps.tech/estate92/public/api/saleorders/'+accid);
	const data = await response.data.message;
	console.log("form data", data);
	return data === undefined ? null : data;
});

export const getUserid = createAsyncThunk('eCommerceApp/salesorder/getUserid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/users');
	const data = await response.data.message;
	console.log("user data", data);
	return data === undefined ? null : data;
});
export const getAccountid = createAsyncThunk('eCommerceApp/salesorder/getAccountid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/accounts');
	const data = await response.data.message;
	console.log("account data", data);
	return data === undefined ? null : data;
});
export const getOpportunityid = createAsyncThunk('eCommerceApp/salesorder/getOpportunityid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/opportunities');
	const data = await response.data.message;
	console.log("oppo data", data);
	return data === undefined ? null : data;
});
export const getQuoteid = createAsyncThunk('eCommerceApp/salesorder/getQuoteid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/quotes');
	const data = await response.data.message;
	console.log("user data", data);
	return data === undefined ? null : data;
});
export const getBillingid = createAsyncThunk('eCommerceApp/salesorder/getBillingid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/contacts');
	const data = await response.data.message;
	console.log("bill data", data);
	return data === undefined ? null : data;
});
export const getShippingid = createAsyncThunk('eCommerceApp/salesorder/getShippingid', async () => {

	const response = await axios.get('https://hacorps.tech/estate92/public/api/list/contacts');
	const data = await response.data.message;
	console.log("ship data", data);
	return data === undefined ? null : data;
});
//https://hacorps.tech/estate92/public/api/accounts
export const saveSalesorder = createAsyncThunk('https://hacorps.tech/estate92/public/api/saleorders', async salesorder => {
	console.log("salesorderobject", salesorder);
	console.log("quoteid", salesorder.quote_id);
	
	const response = await axios.post('https://hacorps.tech/estate92/public/api/saleorders', salesorder);
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

export const editSalesorder = createAsyncThunk('eCommerceApp/salesorder/editSalesorder', async salesorder => {
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



const salesorderSlice = createSlice({
	name: 'eCommerceApp/salesorder',
	initialState: null,
	reducers: {
		resetSalesorder: () => null,
		newSalesorder: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					shipping_provider: '',
					status: '',
					description: '',
					user_id: '',
					quote_id: '',
					account_id: '',
					opportunity_id: '',
					shipping_contact_id: '',
					billing_contact_id: '',
					total_amount: '',
					details: []
				}
			})
		}
	},
	extraReducers: {
		[getSalesorder.fulfilled]: (state, action) => action.payload,
		[saveSalesorder.fulfilled]: (state, action) => action.payload,
		[editSalesorder.fulfilled]: (state, action) => action.payload,
		[getUserid.fulfilled]: (state, action) => action.payload,
		[getAccountid.fulfilled]: (state, action) => action.payload,
		[getQuoteid.fulfilled]: (state, action) => action.payload,
		[getOpportunityid.fulfilled]: (state, action) => action.payload,
		[getBillingid.fulfilled]: (state, action) => action.payload,
		[getShippingid.fulfilled]: (state, action) => action.payload,
	}
});

export const { newSalesorder, resetSalesorder } = salesorderSlice.actions;

export default salesorderSlice.reducer;

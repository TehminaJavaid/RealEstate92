import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getInvoice = createAsyncThunk('eCommerceApp/invoice/getInvoice', async params => {
	console.log("yoooo")
	console.log("params", params.InvoiceId)
	const accid = params.invoiceId;
	const response = await axios.get('https://hacorps.tech/estate92/public/api/invoices/'+accid);
	const data = await response.data.message;
	console.log("form data", data);
	return data === undefined ? null : data;
});
//https://hacorps.tech/estate92/public/api/accounts
export const saveInvoice = createAsyncThunk('https://hacorps.tech/estate92/public/api/invoices', async invoice => {
	console.log("rows", invoice)
	const response = await axios.post('https://hacorps.tech/estate92/public/api/invoices', invoice);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("Invoice Created Successfully")
		//newInvoice();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});

export const editInvoice = createAsyncThunk('eCommerceApp/invoice/editInvoice', async invoice => {
	const acid = invoice.id;
	console.log("editid", acid);
	//product.push('_method', 'PATCH');
	const response = await axios.patch('https://hacorps.tech/estate92/public/api/invoices/'+acid, invoice);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("Invoice Edited Successfully")
		//edited Invoice();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});



const invoiceSlice = createSlice({
	name: 'eCommerceApp/invoice',
	initialState: null,
	reducers: {
		resetInvoice: () => null,
		newInvoice: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
                    invoice_unique_id: ''
				}
			})
		}
	},
	extraReducers: {
		[getInvoice.fulfilled]: (state, action) => action.payload,
		[saveInvoice.fulfilled]: (state, action) => action.payload,
		[editInvoice.fulfilled]: (state, action) => action.payload
	}
});

export const { newInvoice, resetInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;

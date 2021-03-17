import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInvoices = createAsyncThunk('eCommerceApp/invoice/getInvoices', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/invoices');
	const data = await response.data.message;
	console.log("item", data);
	return data;
});

export const removeInvoices = createAsyncThunk(
	'eCommerceApp/invoices/removeInvoices',
	async (invoiceIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-invoices', { invoiceIds });

		return invoiceIds;
	}
);

const invoicesAdapter = createEntityAdapter({});

export const { selectAll: selectInvoices, selectById: selectInvoiceById } = invoicesAdapter.getSelectors(
	state => state.eCommerceApp.invoices
);

const invoicesSlice = createSlice({
	name: 'eCommerceApp/invoices',
	initialState: invoicesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setInvoicesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getInvoices.fulfilled]: invoicesAdapter.setAll,
		[removeInvoices.fulfilled]: (state, action) => invoicesAdapter.removeMany(state, action.payload)
	}
});

export const { setInvoicesSearchText } = invoicesSlice.actions;

export default invoicesSlice.reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSalesorders = createAsyncThunk('eCommerceApp/salesorder/getSalesorders', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/saleorders');
	const data = await response.data.message;
	console.log("item", data);
	return data;
});

export const removeSalesorders = createAsyncThunk('eCommerceApp/salesorders/removeSalesorders', async (salesorderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-salesorders', { salesorderIds });

		return salesorderIds;
	}
);

const salesordersAdapter = createEntityAdapter({});

export const { selectAll: selectSalesorders, selectById: selectSalesorderById } = salesordersAdapter.getSelectors(
	state => state.eCommerceApp.salesorders
);

const salesordersSlice = createSlice({
	name: 'eCommerceApp/salesorders',
	initialState: salesordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSalesordersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSalesorders.fulfilled]: salesordersAdapter.setAll,
		[removeSalesorders.fulfilled]: (state, action) => salesordersAdapter.removeMany(state, action.payload)
	}
});

export const { setSalesordersSearchText } = salesordersSlice.actions;

export default salesordersSlice.reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('https://hacorps.tech/estate92/public/api/accounts', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/accounts');
	const data = await response.data.message;
	console.log("orders", data);
	return data;
});

export const removeOrders = createAsyncThunk(
	'eCommerceApp/orders/removeOrders',
	async (orderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-orders', { orderIds });

		return orderIds;
	}
);

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;

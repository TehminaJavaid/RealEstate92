import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('eCommerceApp/product/getProducts', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/accounts');
	const data = await response.data.message;
	console.log("orders", data);
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-products', { productIds });

		return productIds;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.products
);

const productsSlice = createSlice({
	name: 'eCommerceApp/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		[removeProducts.fulfilled]: (state, action) => productsAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;

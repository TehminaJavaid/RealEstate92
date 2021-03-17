import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProperties = createAsyncThunk('eCommerceApp/salesorder/getSalesorders', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/saleorders');
	const data = await response.data.message;
	console.log("item", data);
	return data;
});

export const removeProperties = createAsyncThunk('eCommerceApp/salesorders/removeSalesorders', async (salesorderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-salesorders', { salesorderIds });

		return salesorderIds;
	}
);

const propertiesAdapter = createEntityAdapter({});

export const { selectAll: selectProperties, selectById: selectPropertiesById } = propertiesAdapter.getSelectors(
	state => state.eCommerceApp.properties
);

const propertiesSlice = createSlice({
	name: 'eCommerceApp/properties',
	initialState: propertiesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPropertiesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProperties.fulfilled]: propertiesAdapter.setAll,
		[removeProperties.fulfilled]: (state, action) => propertiesAdapter.removeMany(state, action.payload)
	}
});

export const { setPropertiesSearchText } = propertiesSlice.actions;

export default propertiesSlice.reducer;

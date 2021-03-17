import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProperties = createAsyncThunk('analyticsDashboardApp/salesorder/getSalesorders', async () => {
	const response = await axios.get('https://hacorps.tech/estate92/public/api/saleorders');
	const data = await response.data.message;
	console.log("item", data);
	return data;
});

/*export const removeProperties = createAsyncThunk('AnalyticsDashboardApp/salesorders/removeSalesorders', async (salesorderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-salesorders', { salesorderIds });

		return salesorderIds;
	}
);*/

const propertiesAdapter = createEntityAdapter({});

export const { selectAll: selectProperties, selectById: selectPropertiesById } = propertiesAdapter.getSelectors(
	state => state.analyticsDashboardApp.properties
);

const propertiesSlice = createSlice({
	name: 'analyticsDashboardApp/properties',
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
	}
});

export const { setPropertiesSearchText } = propertiesSlice.actions;

export default propertiesSlice.reducer;

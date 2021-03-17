import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	console.log("yoooo")
	console.log("params", params.productId)
	const accid = params.productId;
	const response = await axios.get('https://hacorps.tech/estate92/public/api/accounts/'+accid);
	const data = await response.data.message;
	console.log("form data", data);
	return data === undefined ? null : data;
});
//https://hacorps.tech/estate92/public/api/accounts
export const saveProduct = createAsyncThunk('https://hacorps.tech/estate92/public/api/accounts', async product => {
	console.log("prodata", "yesbro")
	const response = await axios.post('https://hacorps.tech/estate92/public/api/accounts', product);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("Account Created Successfully")
		//newProduct();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});

export const editProduct = createAsyncThunk('eCommerceApp/product/editProduct', async product => {
	const acid = product.id;
	console.log("editid", acid);
	//product.push('_method', 'PATCH');
	const response = await axios.patch('https://hacorps.tech/estate92/public/api/accounts/'+acid, product);
	const data = await response.data;
	console.log("prodata", data)
	if (response.status === 200)
    {
		alert("Account Edited Successfully")
		//newProduct();
	}
	else
	{
		alert("There is some error")
	}
	return data;
});



const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					first_name: '',
					last_name: '',
					country: '',
					city: '',
					email: '',
					phone_ext: '',
					phone_number: '',
					industry: '',
					state: '',
					user_id:'',
					website_link: '',
					billing_state: '',
					billing_country: '',
					billing_city: '',
					account_type_id: ''
					
					
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload,
		[editProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;

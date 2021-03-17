import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';

import _ from '@lodash';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link, useParams } from 'react-router-dom';
import { resetSalesorder, saveSalesorder, editSalesorder, newSalesorder, getSalesorder, getUserid, getAccountid, getBillingid, getOpportunityid, getQuoteid, getShippingid } from '../store/salesorderSlice';

import reducer from '../store';

const useStyles = makeStyles(theme => ({
	salesorderImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	salesorderImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	salesorderImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $salesorderImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $salesorderImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $salesorderImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Salesorder(props) {
	const dispatch = useDispatch();
	const salesorder = useSelector(({ eCommerceApp }) => eCommerceApp.salesorder);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [noSalesorder, setNoSalesorder] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const [userslist, setUserslist] = useState({});
	const [accountslist, setAccountslist] = useState({});
	const [quoteslist, setQuoteslist] = useState({});
	const [opportunitylist, setOpportunitylist] = useState({});
	const [billinglist, setBillinglist] = useState({});
	const [shippinglist, setShippinglist] = useState({});
	const routeParams = useParams();
    const [state, setState] = useState({
        rows: [{
            item_name: "",
            price: '',
            quantity: '',
            tax: 0,
            discount: 0,
            totalprice: 0,
			alltotal: 0
          }]
        });
	const [quoteid, setQuoteid] = useState({});
	const [totaltax, setTotalTax] = useState(0);
	const [totalallamount, setTotalAmount] = useState(0);
	const [countrows, setCountRows] = useState(1);
	const [totaldiscount, setTotalDiscount] = useState(0);
	const [totalcaculateddata, setTotalData] = useState(0);
	useDeepCompareEffect(() => {
		function updateSalesorderState() {
			const { salesorderId } = routeParams;
				console.log("hurrah");
				dispatch(newSalesorder());	
		}
		updateSalesorderState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((salesorder && !form) || (salesorder && form && salesorder.id !== form.id)) {
			setForm(salesorder);
		}
	}, [form, salesorder, setForm]);

	useEffect(() => {
		dispatch(getUserid()).then(action => {
			if (action.payload) {
				const alluserslist = action.payload;
				const usersarray = Object.values(alluserslist);
				setUserslist(usersarray);
			}
		});
		dispatch(getAccountid()).then(action => {
			if (action.payload) {
				const allaccountslist = action.payload;
				const accountsarray = Object.values(allaccountslist);
				setAccountslist(accountsarray);
			}
		});
		dispatch(getQuoteid()).then(action => {
			if (action.payload) {
				const allquoteslist = action.payload;
				const quotesarray = Object.values(allquoteslist);
				setQuoteslist(quotesarray);
			}
		});
		dispatch(getOpportunityid()).then(action => {
			if (action.payload) {
				const allopportunitylist = action.payload;
				const opportunityarray = Object.values(allopportunitylist);
				setOpportunitylist(opportunityarray);
			}
		});
		dispatch(getBillingid()).then(action => {
			if (action.payload) {
				const allbillinglist = action.payload;
				const billingarray = Object.values(allbillinglist);
				setBillinglist(billingarray);
			}
		});
		dispatch(getShippingid()).then(action => {
			if (action.payload) {
				const allshippinglist = action.payload;
				const shippingarray = Object.values(allshippinglist);
				setShippinglist(shippingarray);
			}
		});
	}, []);
	useEffect(() => {
		
	}, [userslist, accountslist, quoteslist, opportunitylist, billinglist, shippinglist]);
	useEffect(() => {
		return () => {
			dispatch(resetSalesorder());
			setNoSalesorder(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				_.set({ ...form }, `images`, [
					{
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
					},
					...form.images
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
	{console.log("users data", userslist)}

	function canBeSubmitted() {
		return !_.isEqual(salesorder, form);
	}

	function onSaveSalesorder(form) {
		console.log("form1", form);
		console.log("proid", salesorder.id);
		form.details = state.rows;
		form.total_amount = totalallamount;
		console.log("form", form);
		//console.log("quoteee", quoteid);
		if(salesorder.id === undefined)
		{
			console.log("save")
			dispatch(saveSalesorder(form))
		}
		else
		{
			dispatch(editSalesorder(state.rows))
		}
		
	}
    const handleItemChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...state.rows];
        const temp = rows[idx];
        // rows[idx] = {
        //   [name]: value,
        // };
        rows[idx][name] = value;
        setState({
          rows
        });
		let sumrowstax = 0;
		let sumrowsdis = 0;
		let sumrowsall = 0;
		for (var i = 0; i < countrows; i++)
		{
			var rowtax = parseInt(state.rows[i].tax, 10);
			var rowdis = parseInt(state.rows[i].discount, 10);
			var rowall = parseInt(state.rows[i].totalprice, 10);
			sumrowstax = sumrowstax+rowtax;
			sumrowsdis = sumrowsdis+rowdis;
			sumrowsall = sumrowsall+rowall;
		}
		setTotalTax(sumrowstax);
		setTotalDiscount(sumrowsdis);
		setTotalAmount(sumrowsall);
        const tot = Object.values(rows)
        const pri = state.rows[idx].price;
        const qua = state.rows[idx].quantity;
		const taxx = state.rows[idx].tax;
		const dis = state.rows[idx].discount;
		//console.log("taxx", taxx);
		//console.log("totaltax", caltottax)
		const caltax = taxx/100;
		const caldis = dis/100;
        const to = pri*qua;
		const totalcalamount = (to+caltax)-caldis;
		const convertnum = Math.round((totalcalamount + Number.EPSILON) * 100) / 100
		setTotalData(totalcaculateddata+convertnum);
		rows[idx]["totalprice"] = convertnum;
        setState({
          rows
        });
      };
	  const setFormvalues = () => {

	  };
      const handleFocusSelect = idx => event => {
        event.target.select()
      }
    const handleAddRow = idx => {
		setCountRows(countrows+1);
        const item = {
            item_name: "",
            price: '',
          quantity: '',
          tax: 0,
          discount: 0,
         totalprice: 0
        };
        setState({
            rows: [...state.rows, item]
          });
          console.log("item3", state.rows.quantity)
    }
	const handleRemoveRow = idx => {
		console.log("removeidx", idx)
		const {rows} = state;
		const updatedRows = rows.filter((row, index) => {
		  return index !== idx;
		});
		setState({
		  rows: updatedRows
		});
	  };
	if (noSalesorder) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such account!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/e-commerce/salesorders"
						color="inherit"
					>
						Go to Accounts Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if ((!salesorder || (salesorder && routeParams.salesorderId !== salesorder.id)) && routeParams.salesorderId !== 'new') {
		{console.log("yup", routeParams.salesorderId)}
		
	}

	return (
        <div style={{width: '1363px'}} >
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						{console.log("yupnot")}
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/salesorders"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Sales Orders</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.name ? form.name : 'New Salesorder'}
										</Typography>
									</FuseAnimate>
									
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-nowrap"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(onSaveSalesorder(form))}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-6xl">
							<div>
                      <div className="mt-64" style={{marginTop: '100px', marginLeft: '65px'}}>
					  <div className="p-16 sm:p-24 max-w-2xl">
							<div>
								<TextField
									className="mt-8 mb-16"
									required
									autoFocus
									id="name"
									name="name"
									value={form.name}
									onChange={handleChange}
									variant="standard"
									label="Name"
									fullWidth
								/>
							<div class="container">
								<div class="row">
									<div class="col-md-6" style={{float:'left', width: '500px', marginTop: '6px'}}>
									<InputLabel id="label" label="Status">Status</InputLabel>
									<Select labelId="label" id="select" style={{width: '500px'}}
									onChange={value => setInForm('status', value.target.value)}>
												<MenuItem value="In Review">In Review</MenuItem>
												<MenuItem value="Presented">Presented</MenuItem>
												<MenuItem value="Approved">Approved</MenuItem>
												<MenuItem value="Rejected">Rejected</MenuItem>
												<MenuItem value="Canceled">Canceled</MenuItem>
									</Select>
									</div>
									<div class="col-md-6" style={{float:'right', marginTop: '10px'}}>
										<InputLabel id="label" label="Shipping Provider">Shipping Provider</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}}
											onChange={value => setInForm('shipping_provider', value.target.value)}>
                    							<MenuItem value="10">Brommpost</MenuItem>
												<MenuItem value="20">Post-on-time</MenuItem>
											</Select>
									</div>
								</div>
							</div>

							<div class="container">
								<div class="row">
									<div class="col-md-6" style={{width: '200px', marginTop: '70px', float: 'left', marginLeft: '-500px'}}>
										<InputLabel id="label" label="Quote ID" style={{marginTop: '20px'}}>Quote</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} 
											onChange={value => setInForm('quote_id', value.target.value)}>
											{Object.entries(quoteslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.name}</MenuItem>
                							)}
											</Select>

											
									</div>
									<div class="col-md-6" style={{marginTop: '10px', float: 'right', marginLeft: '100px'}}>
										<InputLabel id="label" label="Opportunity ID" style={{marginTop: '30px'}}>Opportunity</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} onChange={value => setInForm('opportunity_id', value.target.value)}>
											{Object.entries(opportunitylist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.first_name}</MenuItem>
                							)}
											</Select>
									</div>
								</div>
							</div>

							<div class="container">
								<div class="row">
									<div class="col-md-6" style={{float: 'left', marginTop: '57px', width: '500px', height: '235px', padding: '10px', boxShadow: '5px 10px 18px #888888'}}>
										<div style={{marginTop: '20px', marginLeft: '25px'}}>
										<TextField 
                                            type="text"
                                            name="billing_address"
                                            onChange={handleChange}
                                            onFocus={handleFocusSelect}
                                            className="form-control"
                                            variant="standard"
                                            placeholder="Billing Address"
                                            style={{width: '420px'}}
											label="Billing Address"    
                                    	/>
										</div>
										<div class="container">
											<div class="row">
												<div class="col-md-6" style={{float: 'left', marginTop: '10px', marginLeft: '25px'}}>
													<TextField 
														type="text"
														name="billing_city"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Billing City"
														style={{width: '170px'}}
														label="Billing City"    
                                    				/>
												</div>
												<div class="col-md-6" style={{float: 'right', marginLeft: '20px', marginTop: '10px', marginRight: '25px'}}>
													<TextField 
														type="text"
														name="billing_state"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Billing State"
														style={{width: '170px'}}
														label="Billing State"    
                                    				/>
												</div>
											</div>
										</div>
										<div class="container">
											<div class="row">
												<div class="col-md-6" style={{float: 'left', marginTop: '10px',  marginLeft: '25px'}}>
													<TextField 
														type="text"
														name="billing_country"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Billing Country"
														style={{width: '170px'}}
														label="Billing Country"    
                                    				/>
												</div>
												<div class="col-md-6" style={{float: 'right', marginLeft: '20px', marginTop: '10px', marginRight: '25px'}}>
													<TextField 
														type="text"
														name="billing_postalcode"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Billing Postal Code"
														style={{width: '170px'}}
														label="Billing Postal Code"    
                                    				/>
												</div>
											</div>
										</div>

									</div>

									<div class="col-md-6" style={{float: 'right', marginTop: '57px', width: '500px', height: '235px', padding: '10px', boxShadow: '5px 10px 18px #888888', marginLeft: '-220px'}}>
										<div style={{marginTop: '20px', marginLeft: '25px'}}>
										<TextField 
                                            type="text"
                                            name="shipping_address"
                                            onChange={handleChange}
                                            onFocus={handleFocusSelect}
                                            className="form-control"
                                            variant="standard"
                                            placeholder="Shipping Address"
                                            style={{width: '430px'}}
											label="Shipping Address"    
                                    	/>
										</div>
										<div class="container">
											<div class="row">
												<div class="col-md-6" style={{float: 'left', marginTop: '10px', marginLeft: '25px'}}>
													<TextField 
														type="text"
														name="shipping_city"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Shipping City"
														style={{width: '170px'}}
														label="Shipping City"    
                                    				/>
												</div>
												<div class="col-md-6" style={{float: 'right', marginLeft: '20px', marginTop: '10px', marginRight: '25px'}}>
													<TextField 
														type="text"
														name="shipping_state"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Shipping State"
														style={{width: '170px'}}
														label="Shipping State"    
                                    				/>
												</div>
											</div>
										</div>
										<div class="container">
											<div class="row">
												<div class="col-md-6" style={{float: 'left', marginTop: '10px', marginLeft: '25px'}}>
													<TextField 
														type="text"
														name="shipping_country"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Shipping Country"
														style={{width: '170px'}}
														label="Shipping Country"    
                                    				/>
												</div>
												<div class="col-md-6" style={{float: 'right', marginLeft: '20px', marginTop: '10px', marginRight: '25px'}}>
													<TextField 
														type="text"
														name="shipping_postalcode"
														onChange={handleChange}
														onFocus={handleFocusSelect}
														className="form-control"
														variant="standard"
														placeholder="Shipping Postal Code"
														style={{width: '170px'}}
														label="Shipping Postal Code"    
                                    				/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="container">
								<div class="row">
									<div class="col-md-6" style={{width: '200px', float: 'left', marginTop: '320px', marginLeft: '-500px'}}>
										<InputLabel id="label" label="Billing Contact ID" style={{marginTop: '20px'}}>Billing Contact</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} onChange={value => setInForm('billing_contact_id', value.target.value)}>
											{Object.entries(billinglist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.first_name}</MenuItem>
                							)}
											</Select>
									</div>
									<div class="col-md-6" style={{float: 'right', marginLeft: '430px', marginTop: '50px'}}>
										<InputLabel id="label" label="Shipping Contact ID">Shipping Contact</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} onChange={value => setInForm('shipping_contact_id', value.target.value)}>
											{Object.entries(shippinglist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.first_name}</MenuItem>
                							)}
											</Select>
									</div>
								</div>
							</div>

							<div class="container">
								<div class="row">
									{console.log("usertype", typeof(userslist))}
									<div class="col-md-6" style={{width: '200px', float: 'left', marginTop: '10px'}}>
																			<InputLabel id="label" label="User ID" style={{marginTop: '20px'}}>Assign User</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} onChange={value => setInForm('user_id', value.target.value)}>
												
											{Object.entries(userslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.name}</MenuItem>
                							)}
											</Select>
									</div>
									<div class="col-md-6" style={{float: 'right', marginLeft: '600px', marginTop: '-70px'}}>
										<InputLabel id="label" label="Account ID" style={{marginTop: '30px'}}>Account</InputLabel>
											<Select labelId="label" id="select" style={{width: '500px'}} onChange={value => setInForm('account_id', value.target.value)}>
											{Object.entries(accountslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.first_name}</MenuItem>
                							)}
											
											</Select>
									</div>
								</div>
							</div>
							
							</div>
							</div>
							<Table className="simple">
								<TableBody>
                                {state.rows.map((item, idx) => (
										<TableRow key={idx}>
                                            <TableCell align="left" style={{border: "1px solid white"}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="item_name"
                                                value={state.rows[idx].item_name}
                                                onChange={handleItemChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="standard"
                                                placeholder="Item Name"
                                                style={{width: '370px'}}
												label="Item Name"
                                                
                                            />
                                            </TableCell>
											
											<TableCell align="right" style={{border: "1px solid white"}}>
                                            <TextField
                                                align="center"
                                                type="number"
                                                name="price"
                                                value={state.rows[idx].price}
                                                onChange={handleItemChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="standard"
                                                placeholder="Price"
												label="Price"
                                                
                                            />
                                            </TableCell>
											<TableCell align="right" style={{border: "1px solid white"}}>
                                                <TextField
                                                    type="number"
                                                    name="quantity"
                                                    value={state.rows[idx].quantity}
                                                    onChange={handleItemChange(idx)}
                                                    onFocus={handleFocusSelect}
                                                    className="form-control"
                                                    variant="standard"
                                                    placeholder="Quantity"
													label="Quantity"
                                                />
                                            </TableCell>
                                            <TableCell align="right" style={{border: "1px solid white"}}>
                                                <TextField
                                                    type="number"
                                                    name="tax"
                                                    value={state.rows[idx].tax}
                                                    onChange={handleItemChange(idx)}

                                                    onFocus={handleFocusSelect}
                                                    className="form-control"
                                                    variant="standard"
                                                    placeholder="Tax"
													label="Tax"
                                                />
                                            </TableCell>
                                            <TableCell align="right" style={{border: "1px solid white"}}>
                                                <TextField
                                                    type="number"
                                                    name="discount"
                                                    value={state.rows[idx].discount}
                                                    onChange={handleItemChange(idx)}
                                                    onFocus={handleFocusSelect}
                                                    className="form-control"
                                                    variant="standard"
                                                    placeholder="Discount"
													label="Discount"
                                                />
                                            </TableCell>
                                            <TableCell align="right" style={{border: "1px solid white"}}>
                                                <TextField
                                                    type="number"
                                                    name="totalprice"
                                                    value={state.rows[idx].totalprice}
                                                    onChange={handleItemChange(idx)}
                                                    className="form-control"
                                                    variant="standard"
													label="Total Price"
                                                    
                                                />
											</TableCell>
                                            <div>
											{ idx===0 ? 
											<Icon className="text-24" onClick={event => handleAddRow(idx)} style={{backgroundColor: 'green', color: 'white', float: 'left', marginTop: '40px'}}>add</Icon> :<Icon className="text-20" onClick={event => handleRemoveRow(idx)} style={{backgroundColor: 'red', color: 'white', float:'right', marginTop: '40px'}}>remove</Icon>}
                                            </div>
                                        </TableRow>
                                    ))}
								</TableBody>
							</Table>
							<div class="container">
								<div class="row">
									<div class="col-md-6" style={{float: 'left', width: '400px', marginTop: '50px', marginLeft:'20px'}}>
										<TextField
										className="mt-8 mb-16"
										id="description"
										name="description"
										onChange={handleChange}
										label="Description"
										type="text"
										value={form.description}
										multiline
										rows={5}
										variant="outlined"
										fullWidth
									/>
									</div>
									<div class="col-md-6" style={{float: 'right', width: '600px'}}>
									<Table className="simple mt-32">
								<TableBody>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												SUBTOTAL
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{totaltax}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												TAX
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{totaltax}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												DISCOUNT
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{totaldiscount}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography className="font-light" variant="h4" color="textSecondary">
												TOTAL
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography className="font-light" variant="h4" color="textSecondary">
												
												{totalallamount}
												
											</Typography>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
									</div>
								</div>
							</div>
							
						</div>	
						</div>
                        
                            </div>
                            
                            
					)}
						
			innerScroll
		/>
        </div>
	);
}

export default withReducer('eCommerceApp', reducer)(Salesorder);

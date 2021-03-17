import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';

import _ from '@lodash';
import Button from '@material-ui/core/Button';
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
import { resetInvoice, saveInvoice, editInvoice, newInvoice, getInvoice } from '../store/invoiceSlice';

import reducer from '../store';

const useStyles = makeStyles(theme => ({
	invoiceImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	invoiceImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	invoiceImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $invoiceImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $invoiceImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $invoiceImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Invoice(props) {
	const dispatch = useDispatch();
	const invoice = useSelector(({ eCommerceApp }) => eCommerceApp.invoice);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [noInvoice, setNoInvoice] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
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
	const [totaltax, setTotalTax] = useState(0);
	const [totalallamount, setTotalAmount] = useState(0);
	const [countrows, setCountRows] = useState(1);
	const [totaldiscount, setTotalDiscount] = useState(0);
	const [totalcaculateddata, setTotalData] = useState(0);
	useDeepCompareEffect(() => {
		function updateInvoiceState() {
			const { invoiceId } = routeParams;

			if (invoiceId === 'new') {
				console.log("hurrah");
				dispatch(newInvoice());
			} else {
				console.log("heyyy");
				dispatch(getInvoice(routeParams)).then(action => {
					if (!action.payload) {
						setNoInvoice(true);
					}
				});
			}
		}

		updateInvoiceState();
	}, [dispatch, routeParams]);

	

	useEffect(() => {
		if ((invoice && !form) || (invoice && form && invoice.id !== form.id)) {
			setForm(invoice);
		}
	}, [form, invoice, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetInvoice());
			setNoInvoice(false);
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

	function canBeSubmitted() {
		return !_.isEqual(invoice, form);
	}

	function onSaveInvoice(form) {
		console.log("proid", invoice.id);
		if(invoice.id === undefined)
		{
			dispatch(saveInvoice(state.rows))
		}
		else
		{
			dispatch(editInvoice(state.rows))
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
		rows[idx]["totalprice"] = convertnum
        setState({
          rows
        });
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
	if (noInvoice) {
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
						to="/apps/e-commerce/invoices"
						color="inherit"
					>
						Go to Accounts Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if ((!invoice || (invoice && routeParams.invoiceId !== invoice.id)) && routeParams.invoiceId !== 'new') {
		{console.log("yup", routeParams.invoiceId)}
		
	}

	return (
        <div style={{width: '1250px', marginTop: '-100px'}} >
		<FusePageCarded
            //style={{width: '1800px'}}
			
			
		
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-6xl">
							<div>
                      <div className="mt-64" style={{marginTop: '100px'}}>
							<Table className="simple">
									<TableHead>
									<TableRow>
										
									</TableRow>
								</TableHead>
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

						<div className="mt-96">
							<Typography className="mb-24 print:mb-12" variant="body1">
								Please pay within 15 days. Thank you for your business.
							</Typography>

							<div className="flex">
								<div className="flex-shrink-0">
									<img className="w-32" src="assets/images/logos/fuse.svg" alt="logo" />
								</div>

								<Typography className="font-medium mb-64 px-24" variant="caption" color="textSecondary">
									In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue
									dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis
									pellentesque. Nunc hendrerit quam at leo commodo, a suscipit tellus dapibus. Etiam
									at felis volutpat est mollis lacinia. Mauris placerat sem sit amet velit mollis, in
									porttitor ex finibus. Proin eu nibh id libero tincidunt lacinia et eget eros.
								</Typography>
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

export default withReducer('eCommerceApp', reducer)(Invoice);

import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import { useForm} from '@fuse/hooks';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import TextField from '@material-ui/core/TextField';
import reducer from '../store';
import InvoiceDetail from './InvoiceDetail';
import AddInvoice from './AddInvoice';
import { resetInvoice, saveInvoice, editInvoice, newInvoice, getInvoice } from '../store/invoiceSlice';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}
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
	const [map, setMap] = useState('shipping');

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
		return () => {
			dispatch(resetInvoice());
			setNoInvoice(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	function canBeSubmitted() {
		return !_.isEqual(invoice, form);
	}

	function onSaveInvoice(form) {
		console.log("proid", invoice.id);
		if(invoice.id >=1)
		{
            dispatch(editInvoice(form))
		}
		else
		{
			dispatch(saveInvoice(form))
		}
		
	}

	if (noInvoice) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Invoice!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/e-commerce/invoices"
						color="inherit"
					>
						Go to invoices Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				invoice && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/invoices"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Invoice Details</span>
								</Typography>
							</FuseAnimate>

							
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					
                    <Tab className="h-64" label="Invoice" />
					<Tab className="h-64" label="Invoice Details" />
				</Tabs>
			}
			content={
				invoice && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
						{/* invoice Details */}
                        {console.log("inoice", invoice)}
						{tabValue === 0 && <AddInvoice />}
						{tabValue === 1 && <InvoiceDetail invoice={invoice} />}
					</div>
				)
			}
			innerScroll
            /*content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 1 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.name === ''}
									required
									placeholder="Name"
									autoFocus
									id="name"
									name="name"
									value={form.name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									required
									placeholder="Status"
									id="status"
									name="status"
									value={form.status}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									required
									placeholder="Amount"
									id="amount"
									name="amount"
									value={form.amount}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									required
									placeholder="User ID"
									id="user_id"
									name="user_id"
									value={form.user_id}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									required
									placeholder="Account ID"
									id="account_id"
									name="account_id"
									value={form.account_id}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									required
									placeholder="Sub Total"
									id="sub_total"
									name="sub_total"
									value={form.sub_total}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

							</div>
						)}
                    </div>
                )}*/
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Invoice);


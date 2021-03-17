import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import { resetSalesorder, getSalesorder } from '../store/salesorderSlice';
import SalesorderDetail from './SalesorderDetail';
import AddSalesorder from './AddSalesorder';

function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function Salesorder(props) {
	const dispatch = useDispatch();
	const salesorder = useSelector(({ eCommerceApp }) => eCommerceApp.salesorder);
	const theme = useTheme();

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noSalesorder, setNoSalesorder] = useState(false);
	const [map, setMap] = useState('shipping');

	useDeepCompareEffect(() => {
		const { salesorderId } = routeParams;
			if (salesorderId === 'new') {
				console.log("hurrah");
				props.history.push(`/apps/e-commerce/salesorder/AddSalesorder`);
			} else {
				console.log("woo");
		dispatch(getSalesorder(routeParams)).then(action => {
			if (!action.payload) {
				setNoSalesorder(true);
			}
		});
	}
	}, [dispatch, routeParams]);

	useEffect(() => {
		return () => {
			dispatch(resetSalesorder());
			setNoSalesorder(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	if (noSalesorder) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Salesorder!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/e-commerce/salesorders"
						color="inherit"
					>
						Go to Salesorders Page
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
				salesorder && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
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
									<span className="mx-4">Salesorders</span>
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
					<Tab className="h-64" label="Salesorder Details" />
					
				</Tabs>
			}
			content={
				salesorder && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
						{/* Invoice */}
						{tabValue === 0 && <SalesorderDetail salesorder={salesorder} />}
						
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Salesorder);

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import OrdersStatus from '../order/OrdersStatus';
import { selectOrders, getOrders } from '../store/ordersSlice';
import OrdersTableHead from './OrdersTableHead';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

function OrdersTable(props) {
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
	
	const [accountid, setAccountid] = useState(true);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(orders);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getOrders()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(FuseUtils.filterArrayByString(orders, searchText));
			setPage(0);
		} else {
			setData(orders);
		}
	}, [orders, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		console.log("item id", item.id)
		props.history.push(`/apps/e-commerce/orders/${item.id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	const deleteAccount = (accountt) => {
		console.log("check", accountt.id);
		const deleteid = accountt.id;
		axios.delete('https://hacorps.tech/estate92/public/api/accounts/'+deleteid)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no orders!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<OrdersTableHead
						selectedOrderIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'id': {
											return parseInt(o.id, 10);
										}
										case 'customer': {
											return o.customer.firstName;
										}
										case 'payment': {
											return o.payment.method;
										}
										case 'status': {
											return o.status[0].name;
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										
										role="checkbox"
										
										//onClick={event => handleClick(n)}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.id}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
										{`${n.first_name} ${n.last_name}`}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.country}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.city}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.email}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.phone_ext}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.phone_number}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.industry}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.state}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.user_id}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.website_link}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.billing_state}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.billing_country}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.billing_city}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.account_type_id}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
												<Icon className="text-20" onClick={event => handleClick(n)}>visibility</Icon>
												<Icon className="text-20">edit</Icon>
												<Icon className="text-20" onClick={event => deleteAccount(n)}>delete</Icon>
										</TableCell>
										

									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(OrdersTable);

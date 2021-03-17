import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
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
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { getSalesorders, selectSalesorders } from '../store/salesordersSlice';
import SalesordersTableHead from './SalesordersTableHead';
import axios from 'axios';

function SalesordersTable(props) {
	const dispatch = useDispatch();
	const salesorders = useSelector(selectSalesorders);
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.salesorders.searchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(salesorders);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getSalesorders()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(salesorders, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(salesorders);
		}
	}, [salesorders, searchText]);

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
		console.log("account id", item.id);
		console.log("account handle", item.name);
		props.history.push(`/apps/e-commerce/salesorder/salesorder/${item.id}/${item.name}`);

	}
	const deleteAccount = (accountt) => {
		console.log("check", accountt.id);
		const deleteid = accountt.id;
		axios.delete('https://hacorps.tech/estate92/public/api/salesorders/'+deleteid)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
	}
	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		console.log("yayy")
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

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no salesorders!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<SalesordersTableHead
						selectedSalesorderIds={selected}
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
										case 'categories': {
											return o.categories[0];
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
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
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
										    {n.name}
										</TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
											{n.user_id}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                                            <div className={clsx('inline text-12 p-5 rounded truncate')} style={{backgroundColor: 'green', color: 'white'}}>
                                                    {n.status}
                                            </div>
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
											{n.created_at}
										</TableCell>

                                        

										<TableCell className="p-4 md:p-16" component="th" scope="row">
												<Icon className="text-20" onClick={event => handleClick(n)}>visibility</Icon>
												<Icon className="text-20" onClick={event => handleClick(n)}>edit</Icon>
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

export default withRouter(SalesordersTable);

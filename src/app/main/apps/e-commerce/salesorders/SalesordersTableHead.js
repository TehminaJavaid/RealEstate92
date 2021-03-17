import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeSalesorders } from '../store/salesordersSlice';

const rows = [
	{
		id: 'id',
		align: 'left',
		disablePadding: false,
		label: 'Id',
		sort: true
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
    {
		id: 'user_id',
		align: 'center',
		disablePadding: false,
		label: 'Customer',
		sort: true
	},
	{
		id: 'status',
		align: 'center',
		disablePadding: false,
		label: 'Status',
		sort: true
	},
	{
		id: 'created_at',
		align: 'center',
		disablePadding: false,
		label: 'Created at',
		sort: true
	},
    {
		id: 'action',
		align: 'left',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function SalesordersTableHead(props) {
	const classes = useStyles(props);
	const { selectedSalesorderIds } = props;
	const numSelected = selectedSalesorderIds.length;

	const [selectedSalesordersMenu, setSelectedSalesordersMenu] = useState(null);

	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedSalesordersMenu(event) {
		setSelectedSalesordersMenu(event.currentTarget);
	}

	function closeSelectedSalesordersMenu() {
		setSelectedSalesordersMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < props.rowCount}
						checked={props.rowCount !== 0 && numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{numSelected > 0 && (
						<div
							className={clsx(
								'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1',
								classes.actionsButtonWrapper
							)}
						>
							<IconButton
								aria-owns={selectedSalesordersMenu ? 'selectedSalesordersMenu' : null}
								aria-haspopup="true"
								onClick={openSelectedSalesordersMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedSalesordersMenu"
								anchorEl={selectedSalesordersMenu}
								open={Boolean(selectedSalesordersMenu)}
								onClose={closeSelectedSalesordersMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											dispatch(removeSalesorders(selectedSalesorderIds));
											props.onMenuItemClick();
											closeSelectedSalesordersMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</TableCell>
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default SalesordersTableHead;

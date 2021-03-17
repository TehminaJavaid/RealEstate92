import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import SalesordersHeader from './SalesordersHeader';
import SalesordersTable from './SalesordersTable';

function Salesorders() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={<SalesordersHeader  tableheading="Sales Orders"/>}
			content={<SalesordersTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Salesorders);
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import PropertiesHeader from './PropertiesHeader';
import PropertiesTable from './PropertiesTable';
//import PropertyprojectsTable from './PropertyprojectTable';

function Properties() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
			}}
			header={<PropertiesHeader  tableheading="Property"/>}
			content={<PropertiesTable />}
			innerScroll
		/>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(Properties);
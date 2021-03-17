import React from 'react';

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboards/analytics',
			component: React.lazy(() => import('./properties/Properties'))
		}
	]
};

export default AnalyticsDashboardAppConfig;

import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/e-commerce/products/:productId/:productHandle?',
			component: React.lazy(() => import('./product/Product'))
		},
		{
			path: '/apps/e-commerce/products',
			component: React.lazy(() => import('./products/Products'))
		},
		{
			path: '/apps/e-commerce/invoices',
			component: React.lazy(() => import('./invoices/Invoices'))
		},
		{
			path: '/apps/e-commerce/invoices/:invoiceId/:invoiceHandle?',
			component: React.lazy(() => import('./invoice/Invoice'))
		},
		/*{
			path: '/apps/e-commerce/properties/:propertyId?',
			component: React.lazy(() => import('./property/Property'))
		},*/
		{
			path: '/apps/e-commerce/property/property/:propertyId?',
			component: React.lazy(() => import('./property/Property'))
		},
		{
			path: '/apps/e-commerce/property/AddFloors',
			component: React.lazy(() => import('./property/AddFloors'))
		},
		{
			path: '/apps/e-commerce/properties',
			component: React.lazy(() => import('./properties/Properties'))
		},
		{
			path: '/apps/e-commerce/salesorders',
			component: React.lazy(() => import('./salesorders/Salesorders'))
		},
		{
			path: '/apps/e-commerce/salesorders/new',
			component: React.lazy(() => import('./salesorder/Salesorder'))
		},
		{
			path: '/apps/e-commerce/salesorder/AddSalesorder',
			component: React.lazy(() => import('./salesorder/AddSalesorder'))
		},
		{
			path: '/apps/e-commerce/salesorder/salesorder/:salesorderId/:salesorderHandle?',
			component: React.lazy(() => import('./salesorder/Salesorder'))
		},
		
		{
			path: '/apps/e-commerce/orders/:orderId',
			component: React.lazy(() => import('./order/Order'))
		},
		{
			path: '/apps/e-commerce/orders',
			component: React.lazy(() => import('./orders/Orders'))
		},
		{
			path: '/apps/e-commerce/order1',
			component: React.lazy(() => import('./orders/Order1'))
		},
		{
			path: '/apps/e-commerce/order2',
			component: React.lazy(() => import('./orders/Order2'))
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/products" />
		}
	]
};

export default ECommerceAppConfig;

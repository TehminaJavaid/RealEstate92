import { authRoles } from 'app/auth';
import i18next from 'i18next';


import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	
			{
				id: 'dashboards',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/dashboards/analytics'
			},
			{
				id: 'role',
				title: 'Role',
				translate: 'Role',
				type: 'item',
				icon: 'person',
				url: '/apps/contacts/all'
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				icon: 'group',
				url: '/apps/e-commerce/orders',
				badge: {
					title: 17,
					bg: 'rgb(9, 210, 97)',
					fg: '#FFFFFF'
				}
			},
			{
				id: 'products',
				title: 'Products',
				translate: 'Products',
				type: 'item',
				icon: 'list_alt',
				url: '/apps/e-commerce/products',
				badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
			},
			{
				id: 'invoices',
				title: 'Invoices',
				type: 'item',
				icon: 'receipt',
				url: '/apps/e-commerce/invoices',
			},
			{
				id: 'salesorders',
				title: 'Sales Orders',
				translate: 'Salesorders',
				type: 'item',
				icon: 'list_alt',
				url: '/apps/e-commerce/salesorders',

			},
			{
				id: 'properties',
				title: 'Add Property',
				translate: 'Property',
				type: 'item',
				icon: 'list_alt',
				url: '/apps/e-commerce/properties',

			},
			{
				id: 'leads',
				title: 'Leads',
				translate: 'Leads',
				type: 'item',
				icon: 'recent_actors',
				url: '/apps/todo',
			},
			{
				id: 'opportunities',
				title: 'Opportunities',
				translate: 'Opportunities',
				type: 'item',
				icon: 'monetization_on',
				url: '/apps/file-manager'
			},
			{
				id: 'contacts',
				title: 'Contacts',
				translate: 'CONTACTS',
				type: 'item',
				icon: 'account_box',
				url: '/apps/contacts/all'
			},
			{
				id: 'quotes',
				title: 'Quotes',
				translate: 'Quotes',
				type: 'item',
				icon: 'chat',
				url: '/apps/chat',
			},
			{
				id: 'calls',
				title: 'Calls',
				translate: 'Calls',
				type: 'item',
				icon: 'call',
				url: '/apps/notes'
			},
	{
		id: 'login',
		title: 'Login',
		type: 'item',
		icon: 'login',
		url: '/pages/auth/login-2'
	},
	{
				id: 'errors',
				title: 'Errors',
				type: 'collapse',
				icon: 'error',
				children: [
					{
						id: '404',
						title: '404',
						type: 'item',
						url: '/pages/errors/error-404'
					},
					{
						id: '500',
						title: '500',
						type: 'item',
						url: '/pages/errors/error-500'
					}
				]
			},
			{
				id: 'reports',
				title: 'Reports',
				type: 'item',
				icon: 'assessment',
				url: '/pages/maintenance'
	},
];

export default navigationConfig;

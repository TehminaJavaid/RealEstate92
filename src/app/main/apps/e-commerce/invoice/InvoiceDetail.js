import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		'& table ': {
			'& th:first-child, & td:first-child': {
				paddingLeft: `${0}!important`
			},
			'& th:last-child, & td:last-child': {
				paddingRight: `${0}!important`
			}
		}
	},
	divider: {
		width: 1,
		backgroundColor: theme.palette.divider,
		height: 144
	},
	seller: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		marginRight: -88,
		paddingRight: 66,
		width: 480,
		'& .divider': {
			backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
			opacity: 0.5
		}
	}
}));

const InvoiceDetail = props => {
	const classes = useStyles(props);
	
	
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
    const calculatetotal =  (price, quantity, tax, discount) =>
    {
        const totalprice = price*quantity;
        console.log("totalprice", totalprice);
        const totalamount = totalprice+((tax/100)*100);
        console.log("tax", totalamount);
        const totalitemamount = totalamount-((discount/100)*100);
        console.log("itemamount", totalitemamount);
        return totalitemamount;
    }
	
	/*const calculateDiscount =  (discount) =>
    {
        const caldis = totaldiscount+discount;
		setDiscount(caldis);
		return caldis;
    }*/

	return (
		<div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0')}>
			{props.invoice && (
				<Card className="w-xl mx-auto shadow-0">
					<CardContent className="p-88 print:p-0">
						<Typography color="textSecondary" className="mb-32" style={{marginTop: '50px'}}>
							{props.invoice.created_at}
						</Typography>
            			<div className="flex justify-between">
							<div>
								<table className="mb-16">
									<tbody>
										<tr>
											<td className="pb-4">
												<Typography className="font-light" variant="h6" color="textSecondary" >
													INVOICE
												</Typography>
											</td>
											<td className="pb-4 px-8">
												<Typography className="font-light" variant="h6" color="inherit" >
													{props.invoice.name}
												</Typography>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className={clsx(classes.seller, 'flex items-center p-16')} style={{marginTop: '-70px'}}>
								<img className="w-80" src="assets/images/logos/fuse.svg" alt="logo" />

								<div className={clsx(classes.divider, 'divider mx-8 h-96')} />

								<div className="px-8">
									<Typography color="inherit">FUSE INC.</Typography>

									<Typography color="inherit">2810 Country Club Road Cranford, NJ 07016</Typography>
									<Typography color="inherit">+66 123 455 87</Typography>
									<Typography color="inherit">hello@fuseinc.com</Typography>
									<Typography color="inherit">www.fuseinc.com</Typography>
								</div>
							</div>
            </div>
            {console.log("invoice", props.invoice)}
						<div className="mt-64" style={{marginTop: '80px'}}>
							<Table className="simple">
								<TableHead>
									<TableRow>
										<TableCell>ITEM NAME</TableCell>
										<TableCell align="right">PRICE</TableCell>
										<TableCell align="right">QUANTITY</TableCell>
										<TableCell align="right">TOTAL</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
                                {props.invoice.details.map(detail => (
										<TableRow key={detail.id}>
											<TableCell>
												<Typography variant="subtitle1">{detail.item}</Typography>
											</TableCell>
											<TableCell align="right">{formatter.format(detail.total_amount)}</TableCell>
											<TableCell align="right">{detail.quantity}</TableCell>
											<TableCell align="right">
												{formatter.format(detail.total_amount * detail.quantity)}
											</TableCell>
										</TableRow>
                                    ))}
								</TableBody>
							</Table>
                            <Table className="simple mt-32">
								<TableBody>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												SUBTOTAL
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{formatter.format(props.invoice.sub_total)}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												TAX
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{formatter.format(props.invoice.total_tax)}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												DISCOUNT
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography
												className="font-medium"
												variant="subtitle1"
												color="textSecondary"
											>
												{formatter.format(props.invoice.total_discount)}
											</Typography>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<Typography className="font-light" variant="h4" color="textSecondary">
												TOTAL
											</Typography>
										</TableCell>
										<TableCell align="right">
                                        {props.invoice.details.map(detail => (
											<Typography className="font-light" variant="h4" color="textSecondary">
												{formatter.format(calculatetotal(detail.total_amount, detail.quantity, detail.tax, detail.discount))}
											</Typography>
                                            ))}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						
						</div>

						
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default React.memo(InvoiceDetail);

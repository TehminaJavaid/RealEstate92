import FuseAnimate from '@fuse/core/FuseAnimate';
import Checkbox from '@material-ui/core/Checkbox';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import nextId from "react-id-generator";
import FuseUtils from '@fuse/utils';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import reducer from '../store';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));


function ProjectFeatures(props) {
	const dispatch = useDispatch();
	//const floors = useSelector(({ eCommerceApp }) => eCommerceApp.floors);
	const theme = useTheme();
	const classes = useStyles(props);
	
	return (
        <div>
					<div className="p-16 sm:p-24 max-w-2xl">
							<div>
                            <div className="pb-16 flex items-center">
										<Icon color="action">foundation</Icon>
										<Typography className="h2 mx-16" color="black">
											Plot Features
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '25px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Electric Backup: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left', marginLeft: '370px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Elevator or Lift: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                    <div class="col-md-2">

                                    </div>
                                    <div class="col-md-2">
                                        
                                    </div>
                                    <div class="col-md-2">
                                        
                                    </div>
                                    <div class="col-md-2">
                                        
                                    </div>
                                </div>
                            </div>
							</div>	
                            </div>
                            <div style={{marginTop: '40px', marginBottom: '50px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">foundation</Icon>
										<Typography className="h2 mx-16" color="black">
											Main Features
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '30px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Sewerage: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '300px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Electricity: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '306px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Water Supply: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                   
                                </div>
                            </div>
                            </div>
                            <div class="row" style={{marginBottom: '100px'}}>
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '50px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Accessible by road: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '278px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Gas: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                            <div style={{marginTop: '60px', marginBottom: '50px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">business</Icon>
										<Typography className="h2 mx-16" color="black">
											Business and Communication
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '25px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Broad Band Internet Access: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '300px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Satellite or Cable tv: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div style={{marginTop: '60px', marginBottom: '50px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">store</Icon>
										<Typography className="h2 mx-16" color="black">
											Community Feature
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '25px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Kids Play Area: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div style={{marginTop: '60px', marginBottom: '50px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">spa</Icon>
										<Typography className="h2 mx-16" color="black">
											Healthcare
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '25px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Gym: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '500px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Swimming Pool: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div style={{marginTop: '40px', marginBottom: '50px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">add_location_alt</Icon>
										<Typography className="h2 mx-16" color="black">
											Near By Locations and Facilities
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '30px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Schools: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '300px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Hospitals: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '306px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Shopping Malls: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                   
                                </div>
                            </div>
                            </div>
                            <div class="row" style={{marginBottom: '100px'}}>
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '50px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Restaurants: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '230px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Public Transport Service: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: '40px', marginBottom: '100px', marginLeft: '20px'}}>
                            <div className="pb-16 flex items-center">
										<Icon color="action">engineering</Icon>
										<Typography className="h2 mx-16" color="black">
											Other Facilities
										</Typography>
							</div>
                            <div class="row">
                                <div class="container">
                                    <div class="col-md-2" style={{float:'left', marginLeft: '30px'}}>
                                    
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '8px'}}>
											Maintenance Staff: 
									</Typography>
                                    
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '230px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											Security Staff: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                    <div class="col-md-2" style={{float: 'left',marginLeft: '280px'}}>
                                    <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '9px'}}>
											CCTV Security: 
									</Typography>
                                    <Checkbox style={{float: 'right'}}
											//checked={isSelected}
											//onClick={event => event.stopPropagation()}
											//onChange={event => handleCheck(event, n.id)}
									/>
                                    </div>
                                   
                                </div>
                            </div>
                            </div>
					</div>
                    
	);
}

export default withReducer('eCommerceApp', reducer)(ProjectFeatures);

import FuseAnimate from '@fuse/core/FuseAnimate';
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
//import { saveFloors } from '../store/propertySlice';

import reducer from '../store';

const useStyles = makeStyles(theme => ({
	propertyImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	propertyImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	propertyImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $propertyImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $propertyImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $propertyImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Developers(props) {
	const dispatch = useDispatch();
	//const floors = useSelector(({ eCommerceApp }) => eCommerceApp.floors);
	const theme = useTheme();

	const classes = useStyles(props);
    const [countrows, setCountRows] = useState(1);
    const [state, setState] = useState({
        rows: [{
            company_name: "",
            files: []
          }]
        });
	const [tabValue, setTabValue] = useState(0);
	//const [floor_id, setFloorId] = useState(0);
	const routeParams = useParams();


	useDeepCompareEffect(() => {
		function updateFloorState() {
				console.log("hurrah");
				
		}

		updateFloorState();
	}, [dispatch, routeParams]);

	const handleAddRow = idx => {
		setCountRows(countrows+1);
        const item = {
            company_name: ""
        };
        setState({
            rows: [...state.rows, item]
          });
		  //dispatch(saveFloors(state.rows));
    }
	const handleRemoveRow = idx => {
		
		const {rows} = state;
		const updatedRows = rows.filter((row, index) => {
		  return index !== idx;
		});
		setState({
		  rows: updatedRows
		});
	  };
      const fileSelectedHandler = (e, idx) => {
		setState({ files: [...state.rows[idx].files, ...e.target.files] })
	  }
	  const handleChange = idx => e => {
		  console.log("hello1");
        const { name, value } = e.target;
        const rows = [...state.rows];
        const temp = rows[idx];
        // rows[idx] = {
        //   [name]: value,
        // };
        rows[idx][name] = value;
		console.log("hello2");
        setState({
          rows
        });
		console.log("hello3");
      };

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
    

      const handleFocusSelect = idx => event => {
        event.target.select()
      }
	
	  /*useEffect(() => {
        console.log("rows",state.rows)
        console.log("dispatch",dispatch(saveFloors(state.rows)));
          },[dispatch, state.rows]);*/
	/*function canBeSubmitted() {
		return !_.isEqual(floor, form);
	}*/

	/*function onSaveFloor(form) {
		console.log("proid", floor.id);
		if(floor.id === undefined)
		{
			dispatch(saveFloor(form))
		}
		else
		{
			dispatch(editFloor(form))
		}
		
	}*/

	/*if (noFloor) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such floor!
					</Typography>
					<Button
						className="mt-24"
						component={Link}
						variant="outlined"
						to="/apps/e-commerce/properties"
						color="inherit"
					>
						Go to Properties Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}*/



	return (		
					<div className="p-16 sm:p-24 max-w-2xl">
						
							<div>
									<Table className="simple">
								<TableBody>
                                {state.rows.map((item, idx) => (
										<TableRow key={idx}>
                                            <TableCell align="left" style={{border: "1px solid white"}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="company_name"
                                                value={state.rows[idx].company_name}
                                                onChange={handleChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="outlined"
                                                placeholder="Company Name"
                                                style={{width: '400px', marginLeft: '40px'}}
												label="Company Name"
                                            />
                                            </TableCell>
                                            <TableCell style={{border: "1px solid white"}}>
                                            <div style={{marginLeft: '-40px', marginTop: '-5px', border: '1px solid #C7D2CC', borderRadius: '5px'   , height: '55px', width: '400px'}}>
        										
        										<input type="file" multiple variant="outlined" fullWidth style={{marginTop: '13px', marginLeft: '20px'}}  onChange={event => fileSelectedHandler(event, idx)} />
											</div>
                                            </TableCell>
                                            <div>
											{ idx===0 ? 
											<Icon className="text-24" onClick={event => handleAddRow(idx)} style={{backgroundColor: 'green', color: 'white', float: 'left', marginTop: '35px', marginLeft: '5px'}}>add</Icon> :<Icon className="text-20" onClick={event => handleRemoveRow(idx)} style={{backgroundColor: 'red', color: 'white', marginTop: '30px', marginLeft: '55px'}}>remove</Icon>}
                                            </div>
                                        </TableRow>
                                    ))}
								</TableBody>
							</Table>
							
										
							
                                
							</div>
							
						
						
						
						
					</div>
				
			
	);
}

export default withReducer('eCommerceApp', reducer)(Developers);

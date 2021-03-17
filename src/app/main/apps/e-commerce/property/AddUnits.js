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


function AddUnits(props) {
	const dispatch = useDispatch();
	//const floors = useSelector(({ eCommerceApp }) => eCommerceApp.floors);
	const theme = useTheme();
	const classes = useStyles(props);
    const [countrows, setCountRows] = useState(1);
    const [state, setState] = useState({
        rows: [{
            
            floor_type: "",
            floor_size: "",
            images: []
          }]
        });
	const [tabValue, setTabValue] = useState(0);
	//const [floor_id, setFloorId] = useState(0);
	const routeParams = useParams();


	useDeepCompareEffect(() => {
		function updateFloorState() {
			//const { floorId } = routeParams;

			//if (propertyId === 'new') {
				console.log("hurrah");
				//dispatch(newFloor());
			/*} else {
				console.log("heyyy");
				dispatch(getProperty(routeParams)).then(action => {
					if (!action.payload) {
						setNoProperty(true);
					}
				});
			}*/
		}

		updateFloorState();
	}, [dispatch, routeParams]);

	

    const handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...state.rows];
        const temp = rows[idx];
        // rows[idx] = {
        //   [name]: value,
        // };
        rows[idx][name] = value;
        setState({
          rows
        });
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

		reader.onload = () => {
            const rowsimage = {
                id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
            };
            const rows = [...state.rows];
            console.log("countrows", countrows);
            console.log("uploadimages", rowsimage);
            state.rows["images"] = rowsimage;
            setState({
                rows
              });
            console.log("image1", state.rows[0].images[1]);
            
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
    const handleAddRow = idx => {
		setCountRows(countrows+1);
        const item = {
            floor_type: "",
            floor_size: "",
            images: []
        };
        setState({
            rows: [...state.rows, item]
          });
    }
	const handleRemoveRow = idx => {
		console.log("removeidx", idx)
		const {rows} = state;
		const updatedRows = rows.filter((row, index) => {
		  return index !== idx;
		});
		setState({
		  rows: updatedRows
		});
	  };

      const handleFocusSelect = idx => event => {
        event.target.select()
      }
     
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
											<TableCell align="left" style={{border: "1px solid white", marginTop: '-5px'}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="unit_num"
                                                value={idx}
                                                onChange={handleChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="outlined"
                                                placeholder="Unit #"
                                                style={{width: '120px'}}
												label="Unit #"
                                            />
                                            </TableCell>
                                            <TableCell align="left" style={{border: "1px solid white", marginTop: '-5px'}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="floor_type"
                                                value={state.rows[idx].floor_type}
                                                onChange={handleChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="outlined"
                                                placeholder="Floor Type"
                                                style={{width: '350px'}}
												label="Floor Type"
                                            />
                                            </TableCell>
                                            <TableCell align="left" style={{border: "1px solid white", marginTop: '-5px'}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="floor_size"
                                                value={state.rows[idx].floor_size}
                                                onChange={handleChange(idx)}
                                                onFocus={handleFocusSelect}
                                                className="form-control"
                                                variant="outlined"
                                                placeholder="Floor Size"
                                                style={{width: '350px'}}
												label="Floor Size"
                                            />
                                            </TableCell>
                                            <TableCell>
                                            <label
										htmlFor="button-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-120 h-120 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											onChange={handleUploadChange}
											label = "Upload Image"
										/>
										<Icon fontSize="large" color="action" style={{margin: '5px'}}>
											insert_photo
										</Icon>
									</label>
									
                                            </TableCell>
                                            <div>
											{ idx===0 ? 
											<Icon className="text-24" onClick={event => handleAddRow(idx)} style={{backgroundColor: 'green', color: 'white', float: 'left', marginTop: '30px', marginLeft: '50px'}}>add</Icon> :<Icon className="text-20" onClick={event => handleRemoveRow(idx)} style={{backgroundColor: 'red', color: 'white', marginTop: '40px', marginLeft: '55px'}}>remove</Icon>}
                                            </div>
                                        </TableRow>
                                    ))}
								</TableBody>
							</Table>
							
										
							
                                
							</div>
							
						
						
						
						
					</div>
	);
}

export default withReducer('eCommerceApp', reducer)(AddUnits);

import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FuseUtils from '@fuse/utils';
import GoogleMap from 'google-map-react';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetProperty, saveProperty, editProperty, newProperty, getProperty, getCitiesid, getPlacesid, getBlocksid } from '../store/propertySlice';

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
function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}
function Property(props) {
	const dispatch = useDispatch();
	const property = useSelector(({ analyticsDashboardApp }) => analyticsDashboardApp.property);
	const theme = useTheme();
	const counterReducer = useSelector((state) => {
        return state;
      });
	  console.log("selector", counterReducer);
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [noProperty, setNoProperty] = useState(false);
	const {form, handleChange, setForm, setInForm} = useForm(null);
	const [regionslist, setRegionslist] = useState({});
	const [placeslist, setPlaceslist] = useState({});
	const [blockslist, setBlockslist] = useState({});
	const [citieslist, setCitieslist] = useState({});
	const [changedropvalue, setDropvalue] = useState(false);
	const [changecitydropvalue, setCityDropvalue] = useState(false);
	const [changeplacedropvalue, setPlaceDropvalue] = useState(false);
	const [changeblockdropvalue, setBlockDropvalue] = useState(false);
	const [map, setMap] = useState('shipping');
	const [state, setState] = useState({
        rows: [{
            phone_num: ""
          }]
        });
    const [picfile, setFiles] = useState({
		files: []
	})
    const [residentiallist, setResidentiallist] = useState({});
    const [countrows, setCountRows] = useState(1);
    const [plotlist, setPlotlist] = useState({});
    const [commerciallist, setCommerciallist] = useState({});
    const [subtypeValue, setSubtype] = useState("");
	const routeParams = props.propertyId;

	useDeepCompareEffect(() => {
		function updatePropertyState() {
			
					dispatch(newProperty());	
				
		}
		updatePropertyState();
	}, [dispatch, routeParams]);

	

	useEffect(() => {
		if ((property && !form) || (property && form && property.id !== form.id)) {
			setForm(property);
		}
	}, [form, property, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetProperty());
			setNoProperty(false);
		};
	}, [dispatch]);
	useEffect(() => {
		const residence = ['House', 'Guest House', 'Apartment', 'Upper portion', 'Lower portion',
                            'Farm House', 'Room', 'Basement']
        const plot= ['Residential Plot', 'Commercial Plot', 'Industrial Land', 'Plot file', 'Farm house plot']
        const commercial = ['Office', 'Shop', 'Ware House', 'Factory', 'Theater',
                            'Gym', 'Food Court', 'Hall']
        setResidentiallist(residence);
        setPlotlist(plot);
        setCommerciallist(commercial);
	}, []);
	useEffect(() => {
		
	}, [residentiallist, plotlist, commerciallist]);

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
			setForm(
				_.set({ ...form }, `images`, [
					{
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
					},
					...form.images
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
	const fileSelectedHandler = (e) => {
		setFiles({ files: [...picfile.files, ...e.target.files] })
	  }

	function canBeSubmitted() {
		return !_.isEqual(property, form);
	}

	function onSaveProperty(form) {
		const picarray = ['dcjdn', 'ndjcnjd']
		//console.log("formpicture", state.files)
		//setInForm('picture', picarray)
		//setInForm('picture', state.files)
		console.log("formpropdata", form)

		/*let file = form.picture;
		let formdata = new FormData();
		formdata.append('image', file);
		formdata.append('name', "yay");
		axios({
			url: "https://estate92.herokuapp.com/api",
			method: "POST",
			data: formdata
		}).then((res)=>{

		})*/
		
		console.log("savepropertyform", form)
		dispatch(saveProperty(form))
		
			//dispatch(editProperty(form))
		
		
	}
	function setSubtypeValue(subtype) {
		setSubtype(subtype)
	}
	function setPlaceDropdown(dropvalue) {
		setCityDropvalue(dropvalue);
		setPlaceDropvalue(false);
		setBlockDropvalue(false);
		setBlockslist(false);
		console.log("selectedvalue", dropvalue);
		axios.get('https://estate92.herokuapp.com/api/list/property/places/'+dropvalue)
  		.then(function (response) {
			if (response.status === 200)
			{
				const allplaceslist = response.data.message; 
				setPlaceslist(allplaceslist);
				setPlaceDropvalue(allplaceslist);
			}
		  })
			
				//console.log("secondplace", placeslist)
			}
	
	function setBlockDropdown(dropvalue) {
		setPlaceDropvalue(dropvalue);
		setBlockDropvalue(false);
		console.log("selectedvalue", dropvalue);
		axios.get('https://estate92.herokuapp.com/api/list/property/phasesOrBlocks/'+dropvalue)
  		.then(function (response) {
			if (response.status === 200)
			{
				console.log("regiondata", response.data)
				const allblockslist = response.data.message; 
				setBlockslist(allblockslist);
				setBlockDropvalue(allblockslist);
			}
		  })
	}
	function setBlocksDropdown(dropvalue) {
		setBlockDropvalue(dropvalue);
		setInForm('block_id', dropvalue)
	}
    const handleAddRow = idx => {
		setCountRows(countrows+1);
        const item = {
            phone_num: ""
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

	  const handleChangePhone = idx => e => {
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

	{console.log("propertyobject", form)}
	if (noProperty) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such property!
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
	}

	
	{console.log("propertyform", form)}
	return (
					form && (
						<div className="p-16 sm:p-24 max-w-2xl" style={{marginBottom: '100px'}}>

								<div >
												<TextField
													className="mt-8 mb-16"
													required
													placeholder="PropertyTittle"
													autoFocus
													id="tittle"
													name="tittle"
													value={form.tittle}
													onChange={handleChange}
													variant="outlined"
													fullWidth
                                                    style={{marginLeft: '80px', marginTop: '13px', marginRight: '200px'}}
													label="Property Tittle"
												/>
                                                <div class="row">
                                                    <div class="container">
                                                        <div class="col-md-4" style={{float: 'left'}}>
                                                <FormLabel component="legend" style={{color: 'black', marginLeft: '80px'}}>Property Type</FormLabel>
                                                <RadioGroup>
                                                <FormControlLabel
                                                    value="Residential"
                                                    control={<Radio color="primary" />}
                                                    label="Residential"
                                                    labelPlacement="end"
                                                    onChange={value => setSubtypeValue(value.target.defaultValue)}
                                                    style={{marginLeft: '70px', marginTop: '7px'}}
                                                    />
                                                    <FormControlLabel
                                                    value="Plot"
                                                    control={<Radio color="primary" />}
                                                    label="Plot"
                                                    onChange={value => setSubtypeValue(value.target.defaultValue)}
                                                    labelPlacement="end"
                                                    style={{marginLeft: '70px', marginTop: '7px'}}
                                                    />
                                                    <FormControlLabel
                                                    value="Commercial"
                                                    control={<Radio color="primary" />}
                                                    label="Commercial"
                                                    onChange={value => setSubtypeValue(value.target.defaultValue)}
                                                    labelPlacement="end"
                                                    style={{marginLeft: '70px', marginTop: '7px'}}
                                                    />
                                                </RadioGroup>
                                                </div>
                                                <div class="col-md-4">

                                                </div>
                                                <div class="col-md-4" style={{float: 'right'}}>
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <InputLabel id="label" label="Sub-Type" htmlFor="outlined-projecttype-native-simple">Sub-Type</InputLabel>
                                                            {(subtypeValue === "") ?
                                                            <Select labelId="label" id="select" style={{width: '400px'}} label="Sub-Type" //onChange={value => setInForm('project_type', value.target.value)}
                                                                >
                                                                    {console.log("residencelist", residentiallist)}
                                                                    <MenuItem value="10">No SubType</MenuItem>
                                                                </Select>
                                                                :
                                                                <div>
                                                            {(subtypeValue === "Residential") ?
                                                                <Select labelId="label" id="select" style={{width: '400px'}} label="Sub-Type" //onChange={value => setInForm('project_type', value.target.value)}
                                                                >
                                                                    {console.log("residencelist", residentiallist)}
                                                                    {residentiallist.map((val,key) => 
                    							                            <MenuItem value={key}>{val}</MenuItem>
                							                        )}
                                                                </Select>
                                                                :
                                                                <span>
                                                                </span>
                                                            }
                                                            {(subtypeValue === "Plot") ?
                                                                <Select labelId="label" id="select" style={{width: '400px'}} label="Sub-Type" //onChange={value => setInForm('project_type', value.target.value)}
                                                                >
                                                                    {console.log("residencelist", commerciallist)}
                                                                    {plotlist.map((val,key) => 
                    							                            <MenuItem value={key}>{val}</MenuItem>
                							                        )}
                                                                </Select>
                                                                :
                                                                <span>
                                                                </span>
                                                            }
                                                            {(subtypeValue === "Commercial") ?
                                                                <Select labelId="label" id="select" style={{width: '400px'}} label="Sub-Type" //onChange={value => setInForm('project_type', value.target.value)}
                                                                >
                                                                    {console.log("commerciallist", commerciallist)}
                                                                    {commerciallist.map((val,key) => 
                    							                            <MenuItem value={key}>{val}</MenuItem>
                							                        )}
                                                                </Select>
                                                                :
                                                                <span>
                                                                </span>
                                                            }
                                                            </div>}
                                                                
                                                        </FormControl>
                                                </div>
                                                </div>
                                                </div>
                                                <div class="row">
                                                    <div class="container">
                                                        <div class="col-md-6" style={{float: 'left', marginTop: '195px', marginLeft: '-130px'}}>
                                                            <FormControl variant="outlined" className={classes.formControl}>
                                                                <InputLabel id="label" label="Enter City" htmlFor="outlined-city-native-simple">Select City</InputLabel>
                                                                    <Select labelId="label" id="select" style={{width: '500px'}} label="Enter City" //onChange={value => setInForm('project_type', value.target.value)}
                                                                    >
                                                                        <MenuItem value="10">Islamabad</MenuItem>
                                                                        <MenuItem value="20">Lahore</MenuItem>
                                                                        <MenuItem value="30">Karachi</MenuItem>
                                                                        <MenuItem value="40">Peshawar</MenuItem>
                                                                        <MenuItem value="50">IAbbotabad</MenuItem>
                                                                        <MenuItem value="60">Multan</MenuItem>
                                                                    </Select>
												            </FormControl>
                                                        </div>
                                                        <div class="col-md-6" style={{float: 'right', marginTop: '130px'}}>
                                                            <TextField
                                                                className="mt-8 mb-16"
                                                                placeholder="Enter City"
                                                                autoFocus
                                                                id="city"
                                                                name="city"
                                                                value={form.city}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                fullWidth
                                                                style={{marginLeft: '80px', marginTop: '13px', marginRight: '200px'}}
                                                                label="Enter City"
												            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="container">
                                                        <div class="col-md-6" style={{float: 'left', marginTop: '30px', marginLeft: '75px'}}>
                                                            <FormControl variant="outlined" className={classes.formControl}>
                                                                <InputLabel id="label" label="Enter Area" htmlFor="outlined-area-native-simple">Select Area</InputLabel>
                                                                    <Select labelId="label" id="select" style={{width: '500px'}} label="Enter City" //onChange={value => setInForm('project_type', value.target.value)}
                                                                    >
                                                                        <MenuItem value="10">Islamabad</MenuItem>
                                                                        <MenuItem value="20">Lahore</MenuItem>
                                                                        <MenuItem value="30">Karachi</MenuItem>
                                                                        <MenuItem value="40">Peshawar</MenuItem>
                                                                        <MenuItem value="50">IAbbotabad</MenuItem>
                                                                        <MenuItem value="60">Multan</MenuItem>
                                                                    </Select>
												            </FormControl>
                                                        </div>
                                                        <div class="col-md-6" style={{float: 'right'}}>
                                                            <TextField
                                                                className="mt-8 mb-16"
                                                                placeholder="Enter Area"
                                                                autoFocus
                                                                id="area"
                                                                name="area"
                                                                value={form.area}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                fullWidth
                                                                style={{marginLeft: '80px', marginTop: '13px', marginRight: '200px'}}
                                                                label="Enter Area"
												            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <TextField
													className="mt-8 mb-16"
													id="address"
													name="address"
													onChange={handleChange}
													label="Address"
													type="text"
													value={form.address}
													multiline
													rows={7}
													variant="outlined"
													fullWidth
                                                    style={{marginLeft: '75px'}}
												/>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-4" style={{float: 'left'}}>
                                                    <TextField
                                                            className="mt-8 mb-16"
                                                            id="size"
                                                            name="size"
                                                            onChange={handleChange}
                                                            label="Size"
                                                            type="text"
                                                            value={form.size}
                                                            variant="outlined"
                                                            style={{marginLeft: '75px', width: '300px'}}
												    />
                                                </div>
                                                <div class="col-md-4" style={{float: 'left', marginLeft: '20px', marginTop: '7px'}}>
                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                <InputLabel id="label" label="Select Unit" htmlFor="outlined-area-native-simple">Select Unit</InputLabel>
                                                                    <Select labelId="label" id="select" style={{width: '300px'}} label="Select Unit" //onChange={value => setInForm('project_type', value.target.value)}
                                                                    >
                                                                        <MenuItem value="10">Marla</MenuItem>
                                                                        <MenuItem value="20">Yard</MenuItem>
                                                                        <MenuItem value="10">Kanal</MenuItem>
                                                                        <MenuItem value="20">Acre</MenuItem>
                                                                    </Select>
												            </FormControl>
                                                </div>
                                                <div class="col-md-4" style={{float: 'right'}}>
                                                        <TextField
                                                            className="mt-8 mb-16"
                                                            id="price"
                                                            name="price"
                                                            onChange={handleChange}
                                                            label="Price"
                                                            type="text"
                                                            value={form.price}
                                                            variant="outlined"
                                                            style={{ width: '350px', marginTop: '10px'}}
												    />
                                                </div>
                                            </div>
                                        </div>
                                        <TextField
													className="mt-8 mb-16"
													id="description"
													name="description"
													onChange={handleChange}
													label="Description"
													type="text"
													value={form.description}
													multiline
													rows={7}
													variant="outlined"
													fullWidth
                                                    style={{marginLeft: '75px'}}
												/>
                                        <div style={{marginLeft: '70px', border: '1px dotted black', borderRadius: '10px', height: '150px', width: '1080px'}}>
                                            <center>
        										<input type="file" multiple variant="outlined"  style={{marginTop: '40px', marginTop: '60px'}}  onChange={event => fileSelectedHandler(event)} />
                                            </center>
                                            </div>

                                        <div>
                                        <Typography className="h4 mx-16" color="black" style={{float: 'left', marginTop: '20px', marginLeft: '70px'}}>
											Contact Information 
									</Typography>
                                    <div>
									<Table className="simple">
								<TableBody>
                                {state.rows.map((item, idx) => (
										<TableRow key={idx}>
                                            <TableCell align="left" style={{border: "1px solid white"}}>
                                                {console.log("idx", idx)}
                                            <TextField 
                                                type="text"
                                                name="phone_num"
                                                value={state.rows[idx].phone_num}
                                                onChange={handleChangePhone(idx)}
                                                
                                                className="form-control"
                                                variant="outlined"
                                                placeholder="Phone Number"
                                                style={{width: '500px', marginLeft: '200px'}}
												label="Phone Number"
                                            />
                                            </TableCell>
                                            <div>
											{ idx===0 ? 
											<Icon className="text-24" onClick={event => handleAddRow(idx)} style={{backgroundColor: 'green', color: 'white', float: 'left', marginTop: '35px', marginLeft: '50px'}}>add</Icon> :<Icon className="text-20" onClick={event => handleRemoveRow(idx)} style={{backgroundColor: 'red', color: 'white', marginTop: '40px', marginLeft: '55px'}}>remove</Icon>}
                                            </div>
                                        </TableRow>
                                    ))}
								</TableBody>
							</Table>
							
										
							
                                
							</div>
                                        </div>
									<br />
									

								
									
									
								</div>
								<div style={{float: 'right', marginTop: '100px', marginLeft: '200px'}}>
								{/*<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Button
										className="whitespace-nowrap"
										variant="contained"
										color="secondary"
										disabled={!canBeSubmitted()}
										onClick={() => onSaveProperty(form)}
										
									>
									Save
									</Button>
										</FuseAnimate>*/}
								</div>
								
							
							
						</div>
					)
	);
}
export default withReducer('analyticsDashboardApp', reducer)(Property);
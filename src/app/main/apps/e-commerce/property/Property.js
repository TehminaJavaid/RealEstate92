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
	const property = useSelector(({ eCommerceApp }) => eCommerceApp.property);
	const theme = useTheme();
	const counterReducer = useSelector((state) => {
        return state;
      });
	  console.log("selector", counterReducer);
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [noProperty, setNoProperty] = useState(false);
	const [propertyid, setPropertyid] = useState(0);
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
		files: []
	})
	const routeParams = props.propertyId;

	useDeepCompareEffect(() => {
		function updatePropertyState() {
			console.log("prop", routeParams);
			const  salesorderId  = routeParams;
				console.log("propid", salesorderId);
				if(salesorderId === 'new')
				{
					dispatch(newProperty());
				}
			setPropertyid(Math.floor((1 + Math.random()) * 0x10000)+'c');	
				
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
		axios.get('https://estate92.herokuapp.com/api/list/property/regions')
  		.then(function (response) {
			if (response.status === 200)
			{
				console.log("regiondata", response.data)
				const allregionslist = response.data.message; 
				setRegionslist(allregionslist);
			}
		  })
		
		setDropvalue(true);
	}, []);
	useEffect(() => {
		
	}, [regionslist]);

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
		setState({ files: [...state.files, ...e.target.files] })
	  }

	function canBeSubmitted() {
		return !_.isEqual(property, form);
	}

	function onSaveProperty(form) {
		const picarray = ['dcjdn', 'ndjcnjd']
		//console.log("formpicture", state.files)
		//setInForm('picture', picarray)
		setInForm('picture', state.files)
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
	function setCityDropdown(dropvalue) {
		console.log("selectedvalue", dropvalue);
		setDropvalue(dropvalue);
		setCityDropvalue(false);
		setPlaceDropvalue(false);
		setBlockDropvalue(false);
		//setPlaceslist(false);
		setBlockslist(false);
		console.log("changedrop", changedropvalue);
		axios.get('https://estate92.herokuapp.com/api/list/property/cities/'+dropvalue)
  		.then(function (response) {
			if (response.status === 200)
			{
				const allcitieslist = response.data.message; 
				setCitieslist(allcitieslist);
				setCityDropvalue(allcitieslist);
			}
		  })
			
		
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
		setInForm('code', propertyid)
		
	}
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

	if ((!property || (property && routeParams.propertyId !== property.id)) && routeParams.propertyId !== 'new') {
		{console.log("yup", routeParams.propertyId)}
		
	}
	{console.log("propertyform", form)}
	return (
					form && (
						<div className="p-16 sm:p-24 max-w-2xl" style={{marginBottom: '100px'}}>

								<div >
									<div class="container" style={{marginTop: '50px'}}>
										<div class="row">
											<div class="col-md-4 col-sm-12" style={{float: 'left', marginLeft: '80px'}}>
												<TextField
													className="mt-8 mb-16"
													placeholder="Project Code"
													id="code"
													name="code"
													value={propertyid}
													
													variant="outlined"
													onChange={handleChange}
													label = "Project Code"
													style={{width: '150px'}}
												/>
											</div>
											<div class="col-md-4 col-sm-12" style={{float: 'left', marginLeft: '30px'}}>
												<TextField
													className="mt-8 mb-16"
													required
													placeholder="ProjectName"
													autoFocus
													id="name"
													name="name"
													value={form.name}
													onChange={handleChange}
													variant="outlined"
													style={{width: '480px'}}
													label="Project Name"
												/>
											</div>
											<div class="col-md-4 col-sm-12" style={{float: 'right', marginLeft: '5px', marginTop: '8px'}}>
												<FormControl variant="outlined" className={classes.formControl}>
													<InputLabel id="label" label="Project Type" htmlFor="outlined-projecttype-native-simple">Project Type</InputLabel>
														<Select labelId="label" id="select" style={{width: '300px'}} label="Project Type" onChange={value => setInForm('project_type', value.target.value)}
														>
															<MenuItem value="10">Commercial</MenuItem>
															<MenuItem value="20">Residencia</MenuItem>
														</Select>
												</FormControl>
											</div>
											

										</div>
									</div>
									<br />
									<div class="container" style={{marginTop: '25px'}}>
										<div class="row">
											<div class="col-md-6 col-sm-12" style={{float: 'left', marginLeft: '80px'}}>
												<TextField
													className="mt-8 mb-16"
													id="description"
													name="description"
													onChange={handleChange}
													label="Description"
													type="text"
													value={form.description}
													multiline
													rows={5}
													variant="outlined"
													style={{width: '470px'}}
												/>
											</div>
											<div class="col-md-6 col-sm-12" style={{float: 'left', marginLeft: '30px'}}>
												<TextField
													className="mt-8 mb-16"
													id="project_address"
													name="project_address"
													onChange={handleChange}
													label="Address"
													type="text"
													value={form.project_address}
													multiline
													rows={5}
													variant="outlined"
													style={{width: '490px'}}
												/>
											</div>
										</div>
									</div>

									<div class="container" style={{marginTop: '25px'}}>
										<div class="row">
											<div class="col-md-3 col-sm-12" style={{float: 'left',  marginTop: '10px', marginLeft: '80px'}}>
											<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel id="label" label="Region" htmlFor="outlined-region-native-simple">Region</InputLabel>
										<Select labelId="label" id="select" style={{width: '230px'}} label="Region" value={changedropvalue} onChange={value => setCityDropdown(value.target.value)}
										>
											{Object.entries(regionslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.region_name}</MenuItem>
                							)}
										</Select>
										</FormControl>
											</div>
											<div class="col-md-3 col-sm-12" style={{float: 'left', marginTop: '10px', marginLeft: '20px'}}>
											<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel id="label" label="City" htmlFor="outlined-city-native-simple">City</InputLabel>
											{!(placeslist === "No Cities Found") ?
											<Select labelId="label" id="select" label="City" style={{width: '230px'}} value={changecitydropvalue} onChange={value => setPlaceDropdown(value.target.value)}
											>
											{Object.entries(citieslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.city_name}</MenuItem>
                							)}
											</Select> :
											<Select labelId="label" id="select" label="City" style={{width: '230px'}} value={changecitydropvalue} onChange={value => setPlaceDropdown(value.target.value)}
											>
												<MenuItem value="1">No Cities Found</MenuItem>
											</Select>
											}
										</FormControl>
											</div>
										
											<div class="col-md-3 col-sm-12" style={{float: 'left', marginTop: '10px', marginLeft: '20px'}}>
											<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel id="label" label="Place" htmlFor="outlined-place-native-simple">Place</InputLabel>
											{!(placeslist === "No Places Found") ?
											<Select labelId="label" id="select" label="Place" style={{width: '230px'}} value={changeplacedropvalue} onChange={value => setBlockDropdown(value.target.value)}
											>
											{Object.entries(placeslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.name}</MenuItem>
                							)}
											</Select> :
											<Select labelId="label" id="select" label="Place" style={{width: '230px'}} value={changeplacedropvalue} onChange={value => setBlockDropdown(value.target.value)}
											>
												<MenuItem value="0">No Places Found</MenuItem>
											</Select>
                							}
										</FormControl>
											</div>

											<div class="col-md-3 col-sm-12" style={{float: 'left', marginTop: '10px', marginLeft: '20px'}}>
											<FormControl variant="outlined" className={classes.formControl}>
											<InputLabel id="label" label="Block" htmlFor="outlined-block-native-simple">Block</InputLabel>
											{(blockslist === "No Phases/Blocks Found") ?
											<Select labelId="label" value="yes" id="select" label="Block" style={{width: '240px'}} value={changeblockdropvalue} onChange={value => setBlocksDropdown(value.target.value)}
											>
											<MenuItem value="0">No Phases/Blocks Found</MenuItem>
											</Select>
										 : 
											<Select labelId="label" value="yes" id="select" label="Block" style={{width: '240px'}} value={changeblockdropvalue} onChange={value => setBlocksDropdown(value.target.value)}
										>{Object.entries(blockslist).map(([key, val]) => 
                    							<MenuItem value={val.id}>{val.name}</MenuItem>
											)}
											</Select>
											}
										</FormControl>
											</div>
											<div style={{marginLeft: '80px'}}>
        										<input type="file" multiple variant="outlined"  style={{marginTop: '40px'}}  onChange={event => fileSelectedHandler(event)} />
											</div>
											
											<div class="col-md-6 col-sm-12" style={{float: 'right', marginLeft: '30px', marginTop: '-50px',}}>
												<TextField
													className="mt-8 mb-16"
													id="video"
													name="video"
													onChange={handleChange}
													label="Video URL"
													type="text"
													value={form.video}
													variant="outlined"
													style={{width: '490px'}}
												/>
											</div>
											<div style={{width: '200px'}}>

											</div>
										</div>
									</div>
									<div sytle={{marginTop: '500px', width: '400px'}}>
										<div className="w-full h-320" style={{marginLeft: '30px', marginTop: '100px'}}>
													<GoogleMap
														bootstrapURLKeys={{
															key: process.env.REACT_APP_MAP_KEY
														}}
														defaultZoom={15}
														defaultCenter={[
															40.854885,
															-88.081807
														]}
													>
														<Marker
															text={"Third Floor, Yaseen Plaza, Jinnah Avenue"}
															lat={40.854885}
															lng={-88.081807}
														/>
													</GoogleMap>
												</div>
										</div>
									
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

export default withReducer('eCommerceApp', reducer)(Property);

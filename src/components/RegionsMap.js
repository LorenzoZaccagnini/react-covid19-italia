import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Topbar from "./Topbar";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./styles/Map.scss";







const backgroundShape = require("../images/shape.svg");

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  positive: {
  	color: 'green'
  },
  negative: {
  	color: 'red'
  },
  card_value: {
	fontWeight: 'bold'
},
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  positive: {
    color: 'green'
  },
  negative: {
    color: 'red'
  },
  card_value: {
  fontWeight: 'bold'
},

  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function AllCities() {
  const classes = useStyles();

  const [andamento, setAndamento] = React.useState([]);
  const [andamentoCompleto, setAndamentoCompleto] = React.useState([]);
  const [playing, setPlaying] = React.useState(false);
  const [category, setCategory] = React.useState('totale_casi');

  useEffect(() => {
    getAndamento();
  }, []);

  const getAndamento = async () => {
      let response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      let responseJson = await response.json();
      const filter_response = responseJson.filter(o => o.data === responseJson[responseJson.length - 1].data)
      setAndamento(filter_response)
      console.log(filter_response);
      setAndamentoCompleto(responseJson)
  }


  const catColor = (val) => {
    if (val <= 10) {
      return '#eeeeee';
    }
    else if (val > 10 && val <= 100) {
      return '#f26161';
    }
    else if (val > 100 && val <= 500) {
      return '#f03939';
    }
    else if (val > 500 && val <= 3000) {
      return '#ea0909';
    }
    else if (val > 3000) {
      return '#9a0707';
    }
  }


  const handleClick = () => {
    if (!playing) {
      console.log(playing);
      setPlaying(true)
      let i = 0;
      let interval = setInterval(() => {
        setAndamento(andamentoCompleto.filter(o => o.data === andamentoCompleto[i].data))
        i += 21;
        if ( i >= andamentoCompleto.length - 1) {
          clearInterval(interval)
          setPlaying(false)
        }
      }, 500)
    }
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar />
    <div className={classes.root}>
    <Grid container justify="center">
      <Grid
        spacing={4}
        alignItems="center"
        justify="center"
        container
        className={classes.grid}
      >
        <Grid container item xs={12}>
          <Grid item xs={12}>
          { andamento.length > 0 &&

            <Paper className={classes.paper}>
            <Typography color="primary"
              style={{ textTransform: "uppercase" }}
               gutterBottom>
                 {andamento[0].data}
            </Typography>
                <Grid container item xs={12}>
                  <Grid item xs={12}
                    alignItems="center"
                    justify="flex-start"
                    container
                    >
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-region">Seleziona campo</InputLabel>
                    <Select
                      native
                      onChange={(e)=>{
                        console.log(e);
                          setCategory(e.target.value)
                      }}
                      inputProps={{
                        name: 'regione',
                        id: 'select-region',
                      }}
                    >
                          <option value="totale_casi">Tot Casi</option>
                          <option value="ricoverati_con_sintomi">Ricoverati</option>
                          <option value="terapia_intensiva">Intensivi</option>
                          <option value="totale_ospedalizzati">Ospedalizzati</option>
                          <option value="isolamento_domiciliare">Isolamento</option>
                          <option value="totale_attualmente_positivi">Positivi</option>
                          <option value="nuovi_attualmente_positivi">Nuovi Positivi</option>
                          <option value="dimessi_guariti">Guariti</option>
                          <option value="deceduti">Deceduti</option>
                          <option value="tamponi">Tamponi</option>
                    </Select>
                  </FormControl>
            <Button variant="contained" onClick={handleClick}>
            {playing ? 'PLAYING' : 'PLAY'}
            </Button>
          </Grid>
        </Grid>
            </Paper>
            }
          </Grid>
        </Grid>

      { andamento.length > 0 &&
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>



      <div className="map__container">
        <svg version="1.1" className="map__italy" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 418.966 469.31" enable-background="new 0 0 418.966 469.31" xmlSpace="preserve">

          <defs>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
          <feOffset dx="1" dy="4" result="offsetblur"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
            <filter id="dropshadow--link" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
          <feOffset dx="1" dy="4" result="offsetblur"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
            <filter id="dropshadow--hover" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="2" dy="5" result="offsetblur"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <a className="map-region__link"  title="Aosta">
          	<path className="map-region__shape" style={{fill: catColor(andamento[19][category])}} id="aosta" d="M47.475,80.497l14.763-4.429l7.61,3.805l6.009-4.506l-3.381-15.215
      		c-0.336,0.062-0.672,0.102-1.004,0.102l-1.98-0.418c-0.832-0.374-1.771-0.562-2.901-0.562c-1.226,0-2.676,0.221-4.461,0.665
      		c-2.689,0.668-7.264,1.216-10.167,1.216c-4.578,0-5.753,0.484-8.86,3.651l-3.582,3.652l4.455,5.956
      		C45.484,76.431,46.674,78.567,47.475,80.497z"/>
          <g className="region__badge">
          <circle cx="40" cy="60" r="15"></circle>
          <text x="40" y="64"> {andamento[19][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Trentino">
      	<path className="map-region__shape" style={{fill: catColor(andamento[17][category])}} id="trentino" d="M156.479,47.741l-3.025,6.05l2.961,2.961l-5.265,11.583l1.186,4.152l6.416-2.75l6.943,9.919
      		l3.977-1.989l8.524-13.852l8.663,2.888l3.121-8.584l-3.258-10.86l19.763-11.528c-1.71-1.635-3.023-3.289-3.264-4.239
      		c-0.474-1.867-1.407-2.523-3.605-2.537l-2.965-0.018l3.528-2.232c1.952-1.235,3.529-3.145,3.529-4.273
      		c0-1.527-1.826-2.254-4.12-2.254c-2.689,0-6.021,0.999-7.812,2.881c-1.277,1.344-2.121,1.953-2.866,1.953l-1.124-0.474l-1.742-0.622
      		c-0.776,0-1.736,0.262-3.028,0.79c-1.298,0.531-2.228,0.794-2.954,0.794l-1.608-0.664c-0.683-0.675-3.306-1.228-5.827-1.228
      		c-4.257,0-4.673,0.263-5.811,3.669c-1.23,3.682-2.524,5.455-4.117,5.455l-2.8-1.617c-1.722-1.599-3.873-2.463-7.026-2.463h-4.426
      		v5.619c0,2.583-0.251,4.261-0.801,5.21L156.479,47.741z"/>
          <g className="region__badge">
          <circle cx="170" cy="24" r="15"></circle>
          <text x="170" y="28"> {andamento[17][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Friuli">
          	<path className="map-region__shape" style={{fill: catColor(andamento[6][category])}} id="friuli" d="M206.241,55.658l5.057,17.698l7.454-3.727l5.382,8.318l0.176-0.112l2.636,0.751
      		c0.746,0.38,2.319,0.591,4.046,0.591l2.73-0.178c1.2-0.162,2.115-0.259,2.849-0.259c1.82,0,2.512,0.598,3.628,2.281
      		c1.127,1.7,2.222,2.549,3.117,2.549c0.894,0,1.589-0.848,1.917-2.544l0.097-0.989c-0.001-1.329-0.548-2.528-1.599-3.468
      		c-1.109-0.991-2.017-2.673-2.017-3.737c0-1.065-1.291-3.118-2.868-4.563c-1.495-1.37-2.222-2.771-2.216-3.879
      		c0.007-1.276,0.984-2.162,2.878-2.162c1.437,0,2.14-0.431,2.136-1.413c-0.002-0.693-0.357-1.662-1.054-2.948
      		c-0.633-1.169-2.265-2.075-3.736-2.075c-2.05,0-3.067-0.396-3.072-1.03c-0.005-0.686,1.175-1.649,3.515-2.692
      		c2.978-1.327,4.37-2.702,4.757-4.702l0.275-2.55l-0.133-0.923c-0.222-0.355-6.614-0.973-14.205-1.374
      		c-4.608-0.243-7.676-0.408-9.919-0.666L206.241,55.658z"/>
          <g className="region__badge">
          <circle cx="240" cy="44" r="15"></circle>
          <text x="240" y="48"> {andamento[6][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Veneto">
          <path className="map-region__shape" style={{fill: catColor(andamento[20][category])}} id="veneto" d="M165.827,102.017l4.876-0.976l8.676,8.677l19.328-1.567l8.071,6.829
      		c0.118-0.65,0.188-1.437,0.188-2.371c0-2.854-0.554-4.534-1.63-4.941c-0.895-0.34-1.628-1.621-1.628-2.847
      		c0-1.227-1.056-3.341-2.348-4.698c-1.255-1.32-1.805-2.08-1.804-3.274c0.001-0.83,0.268-1.87,0.748-3.455
      		c1.052-3.468,1.704-4.839,3.063-4.839c0.699,0,1.584,0.362,2.806,0.989c1.192,0.611,1.946,0.92,2.536,0.92l1.629-1.02l2.586-1.221
      		l0.456,0.048l0.339,0.032c1.882,0,7.073-2.204,9.865-3.949l-6.226-9.622l-8.546,4.273l-6.943-24.302l11.838-13.812
      		c-1.329-0.535-2.437-1.306-4.002-2.476L191.389,49.1l2.742,9.14l-4.879,13.416l-9.337-3.112l-7.476,12.148l-8.023,4.011
      		l-3.986-5.694l-6.816,8.179L165.827,102.017z"/>
          <g className="region__badge">
          <circle cx="210" cy="84" r="15"></circle>
          <text x="210" y="88"> {andamento[20][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Piemonte">
          	<path className="map-region__shape" style={{fill: catColor(andamento[12][category])}} id="piemonte" d="M59.965,138.456c0,0.008-0.004,0.018-0.004,0.027l12.756-1.16l6.961-15.911l26.193-4.366
      		l3.847,4.809l2.475-5.515l-11.088-9.382l-7.537-2.154l-6.501-16.903l10.254,1.025l-5.427-18.092l11.725-16.842l-0.084-0.188
      		l-2.149-1.14c-1.004,0-2.136,0.741-3.824,2.307l-2.586,2.4l-2.073-2.668c-1.105-1.422-1.61-2.718-1.614-4.325l0.188-1.885
      		l0.214-1.957c0.001-1.418-0.481-2.268-1.597-3.103c-1.322-0.99-2.434-1.48-3.248-1.48c-0.953,0-1.499,0.671-1.499,1.999
      		c0,1.16-0.959,2.615-2.133,3.236c-1.173,0.62-2.717,3.052-3.43,5.403c-0.72,2.373-2.075,4.368-3.68,5.73l4.149,18.671l-9.991,7.494
      		l-8.39-4.195l-13.315,3.994c0.028,0.244,0.058,0.491,0.059,0.707c0.001,1.179-0.415,1.905-1.323,1.905
      		c-0.625,0-2.38,1.23-3.902,2.733c-1.714,1.692-2.68,2.313-4.579,2.313c-0.789,0-1.544-0.107-2.776-0.29l-4.589-0.708v3.803
      		c0,2.736,0.359,3.978,1.779,4.424c1.088,0.34,2.692,2.304,3.685,4.363c0.994,2.059,2.318,3.743,3.003,3.743l0.805,1.815
      		c0.006,2.31-1.149,6.125-2.603,7.176l-0.952,1.644c-0.004,1.256,0.837,3.455,2.831,8.163l3.623,8.555l7.53,0.825
      		C57.529,136.156,59.976,136.784,59.965,138.456z"/>
          <g className="region__badge">
          <circle cx="50" cy="104" r="15"></circle>
          <text x="50" y="108"> {andamento[12][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Lombardia">
          <path className="map-region__shape" style={{fill: catColor(andamento[9][category])}} id="lombardia" d="M105.98,62.39c0,3.404-0.344,4.987-1.095,4.987l-0.202-0.035
      		c-1.309-0.431-2.129-2.471-2.266-4.724l-6.201,8.907l6.573,21.908l-9.746-0.975l3.499,9.097l6.463,1.846l10.869,9.196l7.463-16.629
      		l7.923,6.791l4.627-2.776l27.478,11.194l12.86-1.043l-4.816-4.816l-5.124,1.024l-15.788-19.171l9.591-11.51l-0.729-1.041
      		l-7.584,3.25l-2.814-9.848l4.735-10.417l-3.039-3.039l2.975-5.95l-10.198-9.47c-0.511-0.165-0.947-0.262-1.338-0.262
      		c-1.063,0-1.871,0.653-3.435,2.198l-2.819,2.785l2.837,4.234c1.424,2.128,2.134,3.599,2.136,4.489l-1.353,1.052
      		c-0.402,0-1.316-1.268-2.031-2.817c-0.837-1.815-1.378-2.443-2.976-2.443l-2.356,0.242c-2.218,0.338-5.132,0.939-6.476,1.334
      		l-1.364,0.276c-0.956,0-1.079-0.84-1.079-3.438c0-3.556-0.259-3.88-3.117-3.88c-2.77,0-3.269,0.54-4.494,4.859
      		c-0.89,3.141-2.477,5.633-4.484,7.046C106.377,56.732,105.98,57.694,105.98,62.39z"/>
          <g className="region__badge">
          <circle cx="120" cy="54" r="15"></circle>
          <text x="120" y="58"> {andamento[9][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Emilia">
      <path className="map-region__shape" style={{fill: catColor(andamento[5][category])}} id="emilia" d="M193.606,156.217l7.049-11.078l11.946,10.95c0.952-1.615,1.903-3.262,2.794-4.838
      		c-2.409-0.058-4.438-2.021-11.533-10.991c-1.728-2.185-4.413-13.575-4.413-19.047v-0.071c0-2.149,1.066-4.265,2.27-5.301
      		l-4.303-3.631l-36.662,2.972l-26.525-10.806l-5.374,3.224l-6.078-5.209l-9.384,20.908l13.927,3.722l1.684-1.04l22.663,15.674h4.681
      		l9.363,2.586l10.241-7.28l9.195,5.199l-0.986,9.833L193.606,156.217z"/>
          <g className="region__badge">
          <circle cx="200" cy="134" r="15"></circle>
          <text x="200" y="138"> {andamento[5][category]} </text>
        </g>
          </a>

      <a className="map-region__link" title="Toscana">
          <path className="map-region__shape" style={{fill: catColor(andamento[16][category])}} id="toscana" d="M172.68,217.116l11.238-15.479l5.53-2.674v-14l8.463-4.322l-5.194-5.104l6.647-12.428
      		l-19.386-8.714l1.002-10.139l-4.811-2.746l-9.762,6.583l-10.64-3.439h-5.319l-21.337-14.301l-1.228,1.045l8.201,10.085l-0.763,9.574
      		c1.706,3.05,3.237,9.695,3.237,14.755c0,2.056,0.856,5.032,1.9,6.604c1.199,1.803,2.1,5.824,2.444,10.898
      		c0.539,7.988,0.563,8.044,4.026,8.925c2.837,0.722,3.611,1.563,4.176,4.532c0.492,2.591,1.407,3.823,3.163,4.257
      		c3.018,0.749,7.508,6.271,7.511,8.7l-0.291,0.829l-1.22,2.491c-0.003,1.44,1.207,2.77,3.465,3.547
      		c1.242,0.428,2.169,0.641,2.847,0.641l1.325-0.595l1.136-0.458C169.844,216.185,171.06,216.505,172.68,217.116z"/>
        <g className="region__badge">
          <circle cx="140" cy="182" r="15"></circle>
          <text x="140" y="186"> {andamento[16][category]} </text>
        </g>
          </a>

      <a className="map-region__link"  title="Umbria">
          <polygon className="map-region__shape" style={{fill: catColor(andamento[18][category])}} id="umbria" points="193.448,187.398 193.448,201.398 191.027,202.503 206.098,213.686 216.312,205.286
            224.503,204.373 226.618,195.859 219.642,194.988 212.49,176.222 210.451,178.938 199.637,170.829 197.486,174.824 204.593,181.72
            "/>
         <g className="region__badge">
          <circle cx="190" cy="186" r="15"></circle>
          <text x="190" y="190"> {andamento[18][category]} </text>
        </g>
      	</a>

      <a className="map-region__link"  title="Lazio">
        <path className="map-region__shape" style={{fill: catColor(andamento[7][category])}} id="lazio" d="M211.049,254.618c3.298,0.533,4.525,1.465,6.536,4.962c1.842,3.205,3.161,4.306,5.158,4.306
      		c1.476,0,2.682-0.426,2.682-0.948c0-0.942,2.491-1.608,4.629-1.608c1.121,0,2.146,0.183,2.663,0.606
      		c0.468,0.382,1.61,0.589,2.987,0.589l2.562-0.216l2.476-0.294c1.172,0,1.963,0.389,3.04,1.551l3.452-11.505l-0.44-0.367l0.86-1.032
      		l1.176-3.921l-5.782-5.782l-12.104-2.804l-12.047-14.501h10.693l1.541-0.994l-6.715-9.704l6.611-5.722l-2.628-2.281l-0.765,3.046
      		l-9.782,1.08l-11.733,9.597l-19.261-14.194l-0.483,0.241L176.249,218.9c1.527,1.066,2.632,2.409,3.61,4.305
      		c2.15,4.161,10.347,10.646,13.457,10.646c1.118,0,1.705,0.974,1.705,2.831c0,1.842,2.089,5.353,5.984,10.055
      		C205.948,252.706,207.694,254.076,211.049,254.618z"/>
          <g className="region__badge">
          <circle cx="200" cy="246" r="15"></circle>
          <text x="200" y="250"> {andamento[7][category]} </text>
        </g>
      	</a>

      	<a className="map-region__link"  title="Marche">
          <path className="map-region__shape" style={{fill: catColor(andamento[10][category])}} id="marche" d="M241.13,169.508c-0.938-4.454-2.536-5.797-9.733-8.18c-3.382-1.119-6.902-3.358-9.334-5.934
      		c-1.019-1.079-2.023-1.959-2.973-2.635c-1.225,2.168-2.669,4.64-4.345,7.434l-1.241,2.07l-12.047-11.043l-4.22,6.63l7.557,3.4
      		l-3.268,6.069l8.136,6.102l3.962-5.284l8.852,23.234l9.031,1.129l-2.038,8.152l4.145,3.552l6.106-9.597l8.435-3.615
      		c-0.17-1.051-0.323-2.129-0.447-3.265c-0.491-4.492-1.656-8.309-3.276-10.727C243.049,174.936,241.564,171.564,241.13,169.508z"/>
      <g className="region__badge">
          <circle cx="245" cy="166" r="15"></circle>
          <text x="245" y="170"> {andamento[10][category]} </text>
        </g>
      	</a>
      <a className="map-region__link"  title="Abruzzo">
      	<path className="map-region__shape" style={{fill: catColor(andamento[0][category])}} id="abruzzo" d="M242.392,197.751l-7.894,12.403l-0.443-0.379l-4.361,3.738l7.285,10.16l-6.459,2.981h-3.307
      		l5.953,7.525l11.896,3.097l5.829,6.113l7.216-8.736h10.962l6.416-8.777c-2.379-1.994-4.718-3.715-5.249-3.715
      		c-0.547,0-4.522-3.406-8.837-7.503c-6.918-6.568-10.558-12.173-12.442-19.696L242.392,197.751z"/>
          <g className="region__badge">
          <circle cx="255" cy="204" r="15"></circle>
          <text x="255" y="208"> {andamento[0][category]} </text>
        </g>
      	</a>

          <a className="map-region__link"  title="Molise">
          	<path id="molise" className="map-region__shape" style={{fill: catColor(andamento[11][category])}} d="M278.606,227.816l-7.565,9.839h-11.038l-7.17,9.21l-1.076,3.711l2.509,2.153l6.835-3.874
      		l8.194,5.137l9.609-3.384l1.197-5.655l6.348-4.334v-3.778l1.461-3.446c-0.746-0.252-1.373-0.75-2.395-1.544
      		c-1.621-1.259-3.468-2.414-4.176-2.414C280.922,229.437,279.909,228.719,278.606,227.816z"/>
      	<g className="region__badge">
          <circle cx="285" cy="220" r="15"></circle>
          <text x="285" y="224"> {andamento[11][category]} </text>
        </g>
      	</a>
              <a className="map-region__link"  title="Puglia">
      <path id="puglia" className="map-region__shape" style={{fill: catColor(andamento[13][category])}} d="M388.014,291.511c-3.125-3.1-6.282-6.963-7.016-8.586c-1.076-2.38-2.046-2.949-5.021-2.949
      		c-5.015,0-12.691-2.803-14.444-5.275c-2.143-3.024-18.107-11.155-28.607-14.572c-5.237-1.704-10.264-4.094-11.62-5.523
      		c-1.316-1.386-3.539-2.519-4.942-2.519c-3.419,0-5.191-1.781-5.19-4.018c0.001-1.975,1.383-4.304,4.231-6.08
      		c3.212-2.003,4.811-3.788,4.816-5.445c0.004-1.268-0.924-2.462-2.778-3.622c-1.659-1.037-2.632-1.516-3.803-1.516
      		c-0.924,0-1.97,0.298-3.57,0.856c-1.679,0.585-3.189,0.872-4.789,0.872c-1.182,0-2.414-0.156-3.8-0.464
      		c-1.391-0.309-2.717-0.463-4.017-0.463c-1.587,0-3.132,0.231-4.701,0.695c-0.104,0.031-0.392,0.053-0.492,0.082l-1.822,4.539v5.22
      		l-6.871,4.662l-0.312,1.636l3.621-1.038l7.302,12.652h6.148l1.791,3.808l9.56-5.848l7.33,11.463l5.971-1.023l5.374,8.047
      		l4.018-4.025l10.961,16.804c0.654-1.458,1.304-2.395,1.782-2.395c2.477,0,6.553,2.777,7.072,4.819
      		c0.928,3.652,5.956,5.907,13.17,5.907c5.877,0,6.619,0.271,8.838,3.236c1.333,1.78,3.333,5.336,4.446,7.901
      		c2.159,4.974,6.24,8.59,9.283,8.59l1.514-0.359c1.614-0.853,2.291-2.762,2.866-8.073c0.235-2.168,0.378-3.944,0.378-5.475
      		C394.691,298.922,393.098,296.553,388.014,291.511z"/>
      		<g className="region__badge">
          <circle cx="355" cy="270" r="15"></circle>
          <text x="355" y="274"> {andamento[13][category]} </text>
        </g>
      	</a>
      	        <a className="map-region__link"  title="Sicilia">
      	<path id="sicilia" className="map-region__shape" style={{fill: catColor(andamento[15][category])}} d="M302.497,380.18c-1.231,0-2.723,0.346-4.195,1.098c-1.389,0.71-3.025,1.15-4.106,1.15
      		l-0.769-0.111l-0.56-0.101c-0.851,0-1.802,0.637-2.485,1.717c-0.921,1.458-2.697,2.209-4.866,2.209c-1.59,0-3.391-0.404-5.223-1.228
      		l-2.219-0.646c-1.029,0-1.916,0.631-3.533,2.116c-5.744,5.276-7.325,5.977-18.804,5.977l-2.843-0.011
      		c-10.018-0.065-13.388-0.437-13.81-1.525c-0.307-0.791-2.053-1.438-3.878-1.438c-2.832,0-3.416-0.48-3.982-3.277
      		c-0.394-1.943-0.844-2.749-1.66-2.749l-0.756,0.173c-0.963,0.386-3.558,0.955-5.766,1.265c-3.204,0.451-4.232,1.185-5.101,3.649
      		c-0.726,2.057-1.92,3.081-3.156,3.081c-1.267,0-2.577-1.075-3.475-3.214c-0.868-2.071-1.464-3.062-2.125-3.062
      		c-0.547,0-1.139,0.68-1.967,1.988c-0.746,1.181-2.002,2.146-2.791,2.146c-0.788,0-2.558,2.372-3.932,5.27
      		c-1.221,2.574-1.861,4.631-1.858,6.485c0.004,2.847,1.523,5.219,4.782,8.255c2.371,2.21,3.433,3.061,4.679,3.061l2.388-0.653
      		c1.188-0.486,2.053-0.729,2.739-0.729l1.62,0.681c0.683,0.676,2.169,1.227,3.301,1.227c3.089,0,7.903,3.815,9.44,7.481
      		c1.213,2.892,1.864,3.246,5.976,3.246c4.026,0,4.936,0.464,7.14,3.641c2.275,3.28,3.129,3.684,8.613,4.076
      		c8.153,0.583,14.054,3.743,16.81,9.003c2.198,4.193,2.209,4.198,10.034,4.734c5.461,0.374,8.407,1.104,9.73,2.413
      		c1.269,1.256,2.233,1.91,2.947,1.91c1.263,0,1.742-2.051,1.742-6.449c0-5.948,0.198-6.465,2.714-7.089
      		c1.818-0.45,2.761-1.904,2.756-3.417c-0.005-1.314-0.726-2.673-2.213-3.459c-1.362-0.719-2.186-2.155-2.184-3.167l1.098-1.123
      		l1.069-1.101c0-0.997-0.776-2.493-2.155-3.726c-1.378-1.231-2.069-2.702-2.073-4.302c-0.005-1.625,0.698-3.381,2.107-5.152
      		c1.153-1.447,1.699-2.749,1.697-4.112l-0.184-1.391l-0.197-1.349c-0.004-1.411,0.791-2.501,2.876-4.308
      		c1.855-1.609,3.374-3.346,3.374-3.861c0-0.515,0.903-2.218,2.006-3.784c1.103-1.566,2.27-3.811,2.592-4.991
      		c0.321-1.181,0.92-2.947,1.329-3.926l0.182-0.816C305.376,380.827,304.18,380.18,302.497,380.18z"/>
      	<g className="region__badge">
          <circle cx="255" cy="390" r="15"></circle>
          <text x="255" y="394"> {andamento[15][category]} </text>
        </g>
      	</a>

      <a className="map-region__link"  title="Basilicata">
      	<path id="basilicata" className="map-region__shape" style={{fill: catColor(andamento[1][category])}} d="M329.749,283.273l-6.626-9.939l-6.029,1.005l-6.67-10.481l-6.684,4.011l1.713,3.854
      		l-7.108,6.093l2.379,7.136l14.539,10.385l-2.434,10.951l-7.777,6.222c0.213,0.466,0.426,0.973,0.638,1.527l8.812-6.923l12.169,1.738
      		l-0.639-3.828l2.802-8.403l11.423,4.284c1.416-0.633,2.642-2.362,3.02-4.272c0.134-0.678,0.29-1.348,0.458-2.002l-10.003-15.337
      		L329.749,283.273z"/>
      	<g className="region__badge">
          <circle cx="320" cy="280" r="15"></circle>
          <text x="320" y="284"> {andamento[1][category]} </text>
        </g>
      	</a>

      <a className="map-region__link"  title="Calabria">
      	<path id="calabria" className="map-region__shape" style={{fill: catColor(andamento[3][category])}} d="M353.941,341.338c-0.621-7.177-0.927-7.952-3.711-9.374c-1.669-0.852-3.327-2.46-3.684-3.573
      		c-0.472-1.468-2.091-2.211-5.897-2.71c-3.103-0.407-6.024-1.536-7.149-2.765l-1.298-2.187c0.003-0.798,0.586-1.792,1.814-3.755
      		c1.33-2.127,2.728-6.373,3.107-9.438c0.173-1.404,0.362-2.502,0.6-3.377l-6.445-2.417l-1.198,3.597l1.361,8.172l-15.831-2.262
      		l-8.625,6.777c0.367,1.305,0.729,2.741,1.085,4.317c1.453,6.445,2.609,9.117,4.636,10.728c1.904,1.512,3.247,4.36,4.554,9.654
      		c1.018,4.129,2.722,8.473,3.785,9.654c1.101,1.222,1.609,2.659,1.613,3.978c0.006,2.198-1.388,4.068-3.769,4.068
      		c-5.052,0-6.834,1.877-6.837,7.737l0.05,1.854l0.067,2.413c-0.001,3.438-0.519,5.429-1.844,7.604
      		c-1.818,2.982-3.044,8.462-3.044,11.941c0,1.67,0.282,2.879,0.916,3.131c0.76,0.302,3.903,0.587,6.986,0.633l1.013,0.008
      		c4.074,0,5.09-0.508,7.31-3.116c1.496-1.756,3.043-4.646,3.437-6.423c0.411-1.849,2.542-4.772,4.979-6.833
      		c4.126-3.489,4.26-3.818,4.285-10.471c0.032-9.293,1.618-11.108,11.377-13.013c6.243-1.218,7.371-1.584,7.368-3.332l-0.052-0.774
      		C354.745,350.343,354.313,345.642,353.941,341.338z"/>
      	<g className="region__badge">
          <circle cx="310" cy="350" r="15"></circle>
          <text x="310" y="354"> {andamento[3][category]} </text>
        </g>
      	</a>

          <a className="map-region__link"  title="Campania">
          <path id="campania" className="map-region__shape" style={{fill: catColor(andamento[4][category])}} d="M291.924,263.655l-6.749-11.322l-16.358,5.897l-7.806-4.817l-7.165,4.126l-3.32-2.751
      		l-3.768,12.568c2.306,3.125,4.755,6.951,5.456,8.527c1.065,2.393,2.083,2.943,5.978,3.22l4.695,0.335l-0.351,4.622l-0.353,4.623
      		l4.153-0.712c2.284-0.393,5.92-1.079,8.08-1.526c1.095-0.227,1.891-0.379,2.518-0.379c1.554,0,2.079,0.933,3.57,3.978
      		c1.084,2.213,1.587,3.453,1.59,4.77c0.003,1.057-0.317,2.165-0.916,3.865c-0.559,1.586-0.911,2.684-0.911,3.507
      		c0.001,1.684,1.48,2.212,5.694,3.395c2.538,0.713,4.615,2.035,4.615,2.654c0,1.421,4.449,4.419,6.205,5.419h0.023
      		c0.725,0,1.826-1.173,2.459-2.341c0.801-1.478,1.633-2.322,2.477-2.322c0.35,0,0.703,0.08,1.057,0.329l6.485-5.217l1.566-7.063
      		l-13.461-9.622l-3.621-10.868l6.892-6.157l-2.884-6.738H291.924z"/>
      <g className="region__badge">
          <circle cx="270" cy="290" r="15"></circle>
          <text x="270" y="294"> {andamento[4][category]} </text>
        </g>
      	</a>

          <a className="map-region__link"  title="Liguria">
      	<path id="liguria" className="map-region__shape" style={{fill: catColor(andamento[8][category])}} d="M132.028,142.814l-9.799-11.977l1.078-0.808l-15.385-4.112l-3.682-4.603l-21.807,3.634
      		l-7.039,16.089l-17.461,1.587c-0.826,1.598-1.613,3.814-1.949,5.283l-0.81,3.748h6.444c7.344,0,14.144-3.034,17.685-7.573
      		c1.209-1.548,4.596-5.445,7.527-8.536c3.889-4.102,5.031-5.25,7.206-5.25l2.556,0.254c2.438,0.385,7.38,2.509,10.983,4.735
      		c3.603,2.226,8.571,5.28,11.042,6.796c2.47,1.515,6.6,3.487,9.176,4.384c1.272,0.443,2.634,1.03,3.815,1.624L132.028,142.814z"/>
      	<g className="region__badge">
          <circle cx="95" cy="148" r="15"></circle>
          <text x="95" y="152"> {andamento[8][category]} </text>
        </g>
      	</a>

          <a className="map-region__link"  title="Sardegna">
      	<path id="sardegna" className="map-region__shape" style={{fill: catColor(andamento[14][category])}} d="M114.038,274.612c-1.445,0-2.628-0.483-2.628-1.072c0-0.59,0.977-1.073,2.171-1.073
      		c1.594,0,2.173-0.715,2.173-2.682c0-1.966-0.579-2.681-2.173-2.681c-1.205,0-2.171-0.715-2.171-1.606
      		c0-0.883-1.768-3.539-3.929-5.901l-3.929-4.297l-6.482,3.489c-4.034,2.171-7.113,4.705-8.153,6.707
      		c-2.169,4.176-1.645,3.797-6.851,4.952c-1.4,0.311-2.655,0.468-3.842,0.468c-1.52,0-2.929-0.258-4.386-0.778
      		c-2.386-0.852-3.588-1.976-3.584-3.288c0.002-0.988,0.688-2.083,2.066-3.249c1.39-1.176,2.074-2.155,2.074-2.833
      		c-0.001-0.658-0.645-1.033-1.912-1.033l-0.968,0.06c-2.906,0.331-5.307,3.395-5.302,5.743l0.997,2.074l1.104,1.185l-1.322,1.217
      		c-1.367,0.843-1.91,2.562-1.91,6.051c0,4.294,0.352,5.017,2.957,6.083c3.216,1.316,3.74,2.842,4.939,14.407
      		c0.184,1.772,0.278,3.233,0.278,4.432c0,2.137-0.296,3.437-0.909,4.167l-0.827,2.23c-0.004,1.393,0.863,2.629,2.28,2.629
      		c1.427,0,2.133,0.75,2.133,2.011c-0.001,1.386-0.855,3.389-2.546,5.695c-2.977,4.061-3.238,5.134-3.238,13.372
      		c0,5.256-0.448,8.956-1.086,8.956c-0.799,0-1.154,1.525-1.152,3.344c0.003,2.493,0.679,5.536,1.803,5.963l0.688,0.125
      		c1.288,0,2.549-1.215,2.558-2.386l-0.233-0.827l0.614-0.855c0.632,0,1.15,1.419,1.15,3.154c0,2.593,0.828,4.078,2.068,4.078
      		l1.636-0.717l1.242-0.573l1.558,1.016l1.928,1.474c0.777,0,1.873-0.665,4.199-2.085c3.091-1.888,3.657-2.85,3.657-6.221
      		c0-4.246,1.469-6.49,3.74-6.49c1.533,0,3.432,1.024,5.489,3.145c1.997,2.058,3.555,3.093,4.578,3.093
      		c0.906,0,1.393-0.812,1.393-2.441c0-1.411,0.769-2.858,1.709-3.215l1.372-2.113l-0.041-0.415l-0.038-0.41l1.534-3.078
      		c0.967-0.83,1.396-1.607,1.399-2.986c0.001-0.773-0.131-1.735-0.378-3.002l-0.289-2.969c0.001-2.445,0.566-5.282,1.827-9.598
      		c1.213-4.151,1.777-6.264,1.775-7.699c-0.001-1.189-0.391-1.911-1.121-2.94c-0.896-1.262-1.359-2.436-1.357-3.69
      		c0.005-1.958,1.145-4.115,3.553-7.118c2.093-2.609,2.823-3.887,2.826-5.943l-0.253-2.637
      		C116.969,275.002,116.801,274.612,114.038,274.612z"/>
          <g className="region__badge">
          <circle cx="74" cy="306" r="15"></circle>
          <text x="74" y="310"> {andamento[14][category]} </text>
        </g>
      	</a>
      </svg>
      </div>
      </div>
      </Paper>
    </Grid>
  </Grid>
    }
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          La mappa è stata realizzata basandosi su <a href="https://codepen.io/martinopalladini/pen/vKKMRE" target="_blank">questo progetto</a>
        </Paper>
      </Grid>
    </Grid>
    </Grid>
    </Grid>

    </div>
    </React.Fragment>

  );
}

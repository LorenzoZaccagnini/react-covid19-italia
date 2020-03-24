import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {  makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Paper from "@material-ui/core/Paper";








const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
  const [state] = React.useState({
    columns: [
      { title: 'Regione', field: 'denominazione_regione' },
      { title: 'Ricoverati', field: 'ricoverati_con_sintomi',  type: 'numeric'  },
      { title: 'Intensivi', field: 'terapia_intensiva',  type: 'numeric'  },
      { title: 'Ospedalizzati', field: 'totale_ospedalizzati',  type: 'numeric'  },
      { title: 'Isolamento', field: 'isolamento_domiciliare',  type: 'numeric'  },
      { title: 'Positivi', field: 'totale_attualmente_positivi',  type: 'numeric'  },
      { title: 'Nuovi Positivi', field: 'nuovi_attualmente_positivi',  type: 'numeric'  },
      { title: 'Guariti', field: 'dimessi_guariti',  type: 'numeric'  },
      { title: 'Deceduti', field: 'deceduti',  type: 'numeric'  },
      { title: 'Tot Casi', field: 'totale_casi',  type: 'numeric'  },
      { title: 'Tamponi', field: 'tamponi',  type: 'numeric'  }
    ],
    data: [],
  });
  const [andamento, setAndamento] = React.useState([]);

  useEffect(() => {
    getAndamento();
  }, []);

  const getAndamento = async () => {
      let response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      let responseJson = await response.json();
      const filter_response = responseJson.filter(o => o.data === responseJson[responseJson.length - 1].data)
      setAndamento(filter_response)
  }

  return (
    <React.Fragment>
      <CssBaseline />
    <div className={classes.root}>
      { andamento.length > 0 &&
      <Paper className={classes.paper}>
        <MaterialTable
     title="Tabella Regioni"
     columns={state.columns}
     data={andamento}
    options={{
      exportButton: true,
      pageSize: 22
    }}
   />
      </Paper>
    }
    </div>
    </React.Fragment>

  );
}

import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InstructionDialog from "./dialogs/InstructionDialog";
import SwipeDialog from "./dialogs/SwipeDialog";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
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
});

class Main extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false,
    andamento: [],
    andamentoFiltrato:[]

  };

  async getAndamento() {
   try {
     let response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
     let responseJson = await response.json();
     console.log(responseJson);
     this.setState({andamento: responseJson})
    } catch(error) {
     console.error(error);
   }
 }

 incPerc(array, index, key) {
   const { classes } = this.props;
  if (index < array.length - 1 && array[index][key] !== 0) {
    const diff = array[index][key] - array[index + 1][key]
    const diffPerc = diff / array[index][key] * 100
    if (diffPerc > 0) {
      return <span>
          <span className={classes.card_value}>{array[index][key]}</span>
          <span className={classes.positive}>▲{Math.round(diffPerc)}% +{diff}</span>
        </span>
    }
    else {
      return <span>
          <span className={classes.card_value}>{array[index][key]}</span>
          <span className={classes.negative}>▼{Math.round(diffPerc)}% {diff}</span>
        </span>
    }
  }
  else {
    return <span className={classes.card_value}>{array[index][key]}</span>
  }

 }

  componentDidMount() {
    this.getAndamento();
  }

  openDialog = event => {
    this.setState({ learnMoredialog: true });
  };

  dialogClose = event => {
    this.setState({ learnMoredialog: false });
  };

  openGetStartedDialog = event => {
    this.setState({ getStartedDialog: true });
  };

  closeGetStartedDialog = event => {
    this.setState({ getStartedDialog: false });
  };




  render() {
    const { classes } = this.props;


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
                <Paper className={classes.paper}>
                  <div>
                      <Typography color="primary"
                        style={{ textTransform: "uppercase" }}
                         gutterBottom>
                        Andamento Regionale {this.state.andamentoFiltrato.length > 0 ?
					 	                   this.state.andamentoFiltrato[0].denominazione_regione : ''}
                      </Typography>
                      <div> Dati presi dalla repository della <a href="https://github.com/pcm-dpc/COVID-19" target="_blank">Presidenza del Consiglio dei Ministri</a></div>
                      <div>Le percentuali sono calcolate in base alle 24 ore precedenti</div>

                    <br />
                      <br />
                      <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="select-region">Seleziona Regione</InputLabel>
                          <Select
                            native
                            onChange={(e)=>{
                              console.log(e);
                              const filtered_arr = this.state.andamento.filter(o => o.denominazione_regione === e.target.value);

                              this.setState({
                                andamentoFiltrato: filtered_arr
                              });
                              console.log(filtered_arr);
                            }}
                            inputProps={{
                              name: 'regione',
                              id: 'select-region',
                            }}
                          >
                              <option>Seleziona regione</option>
                              <option>Abruzzo</option>
                              <option>Basilicata</option>
                              <option>Bolzano</option>
                              <option>Calabria</option>
                              <option>Campania</option>
                              <option>Emilia Romagna</option>
                              <option>Friuli Venezia Giulia</option>
                              <option>Lazio</option>
                              <option>Liguria</option>
                              <option>Lombardia</option>
                              <option>Marche</option>
                              <option>Molise</option>
                              <option>Piemonte</option>
                              <option>Puglia</option>
                              <option>Sardegna</option>
                              <option>Sicilia</option>
                              <option>Toscana</option>
                              <option>Trento</option>
                              <option>Umbria</option>
                              <option>Valle Aosta</option>
                              <option>Veneto</option>
                          </Select>
                        </FormControl>
                  </div>
                </Paper>
              </Grid>
            </Grid>

              {this.state.andamentoFiltrato.reverse().map((item, index, array) =>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <div>
                          <Typography color="secondary" gutterBottom>
                            {item.data.slice(0, 10)}
                          </Typography>
                        <Typography variant="body1" gutterBottom>Ricov sintomatici: {this.incPerc(array, index, "ricoverati_con_sintomi")}</Typography>
                        <Typography variant="body1" gutterBottom>Terapia intensiva: {this.incPerc(array, index, "terapia_intensiva")}</Typography>
                        <Typography variant="body1" gutterBottom>Tot Ospedalizzati: {this.incPerc(array, index, "totale_ospedalizzati")}</Typography>
                        <Typography variant="body1" gutterBottom>Domiciliare: {this.incPerc(array, index, "isolamento_domiciliare")}</Typography>
                        <Typography variant="body1" gutterBottom>Tot positivi: {this.incPerc(array, index, "totale_attualmente_positivi")}</Typography>
                        <Typography variant="body1" gutterBottom>Tot nuovi positivi: {this.incPerc(array, index, "nuovi_attualmente_positivi")}</Typography>
                        <Typography variant="body1" gutterBottom>Dimessi guariti: {this.incPerc(array, index, "dimessi_guariti")}</Typography>
                        <Typography variant="body1" gutterBottom>Deceduti: {this.incPerc(array, index, "deceduti")}</Typography>
                        <Typography variant="body1" gutterBottom>Tot casi: {this.incPerc(array, index, "totale_casi")}</Typography>
                        <Typography variant="body1" gutterBottom>Tamponi: {this.incPerc(array, index, "tamponi")}</Typography>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <SwipeDialog
            open={this.state.learnMoredialog}
            onClose={this.dialogClose}
          />
          <InstructionDialog
            open={this.state.getStartedDialog}
            onClose={this.closeGetStartedDialog}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Main));

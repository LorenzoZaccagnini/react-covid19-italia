import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InstructionDialog from "./dialogs/InstructionDialog";
import SwipeDialog from "./dialogs/SwipeDialog";


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
    maxwidth: 1200,
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
  }
});

class Main extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false,
    andamentoNazionaleObj: []

  };

  async getAndamentoNazionale() {
   try {
     let response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json');
     let responseJson = await response.json();
     console.log(responseJson);
     this.setState({andamentoNazionaleObj: responseJson})
    } catch(error) {
     console.error(error);
   }
  }

  incPerc(array, index, key) {
    const { classes } = this.props;
   if (index < array.length - 1) {
     const diff = array[index][key] - array[index + 1][key]
     const diffPerc = diff / array[index][key] * 100
     if (diffPerc > 0) {
       return  <span>
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
    this.getAndamentoNazionale();
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
        <div className={classes.root} >
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >

              <Grid container item xs={10}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <Typography
                        style={{ textTransform: "uppercase" }}
                        color="primary"
                        gutterBottom
                      >
                        Andamento nazionale
                      </Typography>
                      <div> Dati presi dalla repository della <a href="https://github.com/pcm-dpc/COVID-19" target="blank">Presidenza del Consiglio dei Ministri</a></div>
                      <div>Le percentuali sono calcolate in base alle 24 ore precedenti</div>

                  </div>
                  </Paper>
                </Grid>
              </Grid>

              {this.state.andamentoNazionaleObj.reverse().map((item, index, array) =>
                <Grid container item xs={10}>
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
                        <Typography variant="body1" gutterBottom>Tot positivi: {this.incPerc(array, index, "totale_positivi")}</Typography>
                        <Typography variant="body1" gutterBottom>Tot nuovi positivi: {this.incPerc(array, index, "nuovi_positivi")}</Typography>
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

import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CssBaseline from "@material-ui/core/CssBaseline";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Topbar from "./Topbar";



const headCells = [
  {
    label: 'Regione',
    id: 'denominazione_regione',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Ricoverati',
    id: 'ricoverati_con_sintomi',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Intensivi',
    id: 'terapia_intensiva',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Ospedalizzati',
    id: 'totale_ospedalizzati',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Isolamento',
    id: 'isolamento_domiciliare',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Positivi',
    id: 'totale_attualmente_positivi',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Nuovi Positivi',
    id: 'nuovi_attualmente_positivi',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Guariti',
    id: 'dimessi_guariti',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Deceduti',
    id: 'deceduti',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Tot Casi',
    id: 'totale_casi',
    numeric: true,
    disablePadding: false
  }, {
    label: 'Tamponi',
    id: 'tamponi',
    numeric: true,
    disablePadding: false
  }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Compara Regioni
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
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
});

class AllRegions extends Component {

  state = {
    order: 'asc',
    orderBy: 'totale_casi',
    selected: [],
    page: 0,
    dense: false,
    rowsPerPage: 23,
    andamento: []
  };

  async getAndamento() {
   try {
     let response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
     let responseJson = await response.json();
     const filter_response = responseJson.filter(o => o.data === responseJson[responseJson.length - 1].data)
     this.setState({andamento: filter_response})
     console.log(this.state.andamento);
    } catch(error) {
     console.error(error);
   }
 }

 componentDidMount() {
   this.getAndamento();
 }

  handleRequestSort(event, property) {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({order: isAsc ? 'desc' : 'asc'});
    this.setState({orderBy: property});

  };

  handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = this.state.andamento.map(n => n.denominazione_regione);
      this.setState({selected: newSelecteds});
      return;
    }
    this.setState({selected: []});
  };

  handleClick(event, name) {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }
    this.setState({selected: newSelected});

  };

  handleChangePage(event, newPage) {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage(event) {
    this.setState({rowsPerPage: parseInt(event.target.value, 10)});
    this.setState({page: 0});
  };

  handleChangeDense(event) {
    this.setState({dense: event.target.checked});
  };

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => - this.descendingComparator(a, b, orderBy);
  }

  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  isSelected = name => this.state.selected.indexOf(name) !== -1;

  emptyRows = this.state.rowsPerPage - Math
    .min(this.state.rowsPerPage,
      this.state.andamento.length - this.state.page * this.state.rowsPerPage)
  render() {
  const { classes } = this.props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar />
    <div className={classes.root}>
      { this.state.andamento.length > 0 &&
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={this.state.selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={this.state.dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.andamento.length}
            />
            <TableBody>
              {this.stableSort(this.state.andamento, this.getComparator(this.state.order, this.state.orderBy))
                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = this.isSelected(row.denominazione_regione);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, row.denominazione_regione)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.denominazione_regione}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.denominazione_regione}
                      </TableCell>
                      <TableCell align="right">{row.ricoverati_con_sintomi}</TableCell>
                      <TableCell align="right">{row.terapia_intensiva}</TableCell>
                      <TableCell align="right">{row.totale_ospedalizzati}</TableCell>
                      <TableCell align="right">{row.isolamento_domiciliare}</TableCell>
                      <TableCell align="right">{row.totale_attualmente_positivi}</TableCell>
                      <TableCell align="right">{row.nuovi_attualmente_positivi}</TableCell>
                      <TableCell align="right">{row.dimessi_guariti}</TableCell>
                      <TableCell align="right">{row.deceduti}</TableCell>
                      <TableCell align="right">{row.totale_casi}</TableCell>
                      <TableCell align="right">{row.tamponi}</TableCell>
                    </TableRow>
                  );
                })}
              {this.emptyRows > 0 && (
                <TableRow style={{ height: (this.state.dense ? 33 : 53) * this.emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.andamento.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    }

      <FormControlLabel
        control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
        label="Dense padding"
      />
    </div>
    </React.Fragment>

  );
 }
}

export default withRouter(withStyles(styles)(AllRegions));

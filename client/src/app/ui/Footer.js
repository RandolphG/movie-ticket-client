import React, { Component } from "react";
import { AppBar, Slide, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Snackbar from "@material-ui/core/Snackbar";
import { AutoComplete, Tooltip } from "antd";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: "",
      open: false,
      transition: undefined,
      title: null,
      operation: null,
      options: null
    };
  }

  /**
   * handle changes to text input
   * @param event
   */
  handleChange = event => {
    console.log(`handleChange() called `);
    this.setState({ values: event.target.value });
    console.log(this.state.values);
  };

  /**
   * set open state
   * @param open
   */
  setOpen = open => {
    console.log(`setOpen() called `);
    this.setState({ open });
  };
  /**
   * set transition state
   * @param transition
   */
  setTransition = transition => {
    console.log(`setTransition() called `);
    this.setState({ transition });
  };

  /**
   * return a slide component from left
   * @param props
   * @returns {*}
   */
  TransitionLeft = props => {
    console.log(`</Slide component returned `);
    return <Slide {...props} direction={"left"} />;
  };

  /**
   * handleClose()
   */
  handleClose = (event, reason) => {
    console.log(`handleClose() called `);
    if (reason === "clickaway") {
      return;
    }
    this.setOpen(false);
  };

  /**
   *
   * delete db entries amd sound | snackbar
   */
  handleDelete = Transition => () => {
    if (this.props.selectedIndex === null) {
      this.setState({
        open: true,
        transition: Transition,
        title: "NOTHING",
        operation: "DELETED"
      });
    }
    {
      console.log(`handleDelete() called on ${this.props.movies} `);
      this.props.removeMovie(this.props.selectedIndex);
      this.setState({
        open: true,
        title: this.props.title,
        transition: Transition,
        operation: "DELETED"
      });
    }
  };
  /**
   *
   *  add db entries amd sound | snackbar
   */
  handleAdd = Transition => () => {
    console.log(`handleAdd called `);
    this.props.showDrawer();
    this.props.addMovie();
    this.setState({ open: true, transition: Transition, operation: "ADDED" });
  };

  /**
   *  update db entries and sound | snackbar
   * @param Transition
   */
  handleUpdate = Transition => () => {
    console.log(`handleUpdate() called `);
    if (this.props.selectedIndex === null) {
      this.setState({
        open: true,
        transition: Transition,
        title: "NOTHING",
        operation: "UPDATED"
      });
    } else {
      this.props.updateMovie(this.props.selectedIndex);
      this.setState({
        open: true,
        transition: Transition,
        title: this.props.title,
        operation: "UPDATED"
      });
    }
  };

  componentDidMount() {
    this.setState({ options: this.props.movies.title });
  }

  render() {
    return (
      <AppBar
        style={{ top: "auto", bottom: 0 }}
        position="fixed"
        color="default"
      >
        <Toolbar>
          <div style={{ flexGrow: 1 }} />

          <AutoComplete
            className={"mr-4"}
            style={{ width: 200 }}
            options={this.state.options}
            placeholder="type search here.."
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
          <Tooltip placement={"top"} title={"update selection"}>
            <Button
              onClick={this.handleUpdate(this.TransitionLeft)}
              variant="contained"
              edge={"end"}
              className="d-flex mr-4 flex-column"
              color="default"
              size="small"
              startIcon={<UpdateIcon />}
            >
              UPDATE
            </Button>
          </Tooltip>
          <Tooltip placement={"topLeft"} title={"delete entry"}>
            <Button
              onClick={this.handleDelete(this.TransitionLeft)}
              variant="contained"
              edge={"end"}
              className="d-flex mr-4 flex-column"
              color="default"
              size="small"
              startIcon={<DeleteIcon />}
            >
              DELETE
            </Button>
          </Tooltip>
          <Tooltip placement={"topLeft"} title={"add entry"}>
            <Button
              onClick={this.handleAdd(this.TransitionLeft)}
              variant="contained"
              edge={"end"}
              className="d-flex flex-column"
              color="secondary"
              size="small"
              startIcon={<PlaylistAddIcon />}
            >
              ADD
            </Button>
          </Tooltip>
        </Toolbar>
        <Snackbar
          autoHideDuration={1750}
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.transition}
          message={`${this.state.title}  ${this.state.operation}`}
        />
      </AppBar>
    );
  }
}

export default Footer;

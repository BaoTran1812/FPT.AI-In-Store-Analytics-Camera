import React, { Component } from "react";
import "./vendor/mdi-font/css/material-design-iconic-font.min.css";
import "./vendor/font-awesome-4.7/css/font-awesome.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/datepicker/daterangepicker.css";
import "./css/main.css";
import classNames from "classnames";
import ReactPlayer from "react-player";
import CanvasDraw from "react-canvas-draw";
import captureVideoFrame from "capture-video-frame";
import { withRouter } from 'react-router-dom'
import client from "../../api";

class EditShop extends Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.shopList = [];
    this.state = {
      x: 0,
      y: 0,
      a: 0,
      b: 0,
      file: "",
      image: "",
      imgLoaded: false,
      playing: true,
      width: 0,
      height: 0,
      showFlex: "",
      containerWidth: "",
      dimensions: null,
      shopName: "",
      cameraNum: "",
    };
    this.onMouseClick = this.onMouseClick.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
    client.get("/api/editShop").then(res => {
      if (res.data.length === 0) {
        alert("Please select a shop to delete in Shop List first")
        this.props.history.push("/shoplist")
      }
      else {
        console.log(res.data)
        this.setState({
          shopName: res.data[res.data.length-1].store.shopName,
          cameraNum: res.data[res.data.length-1].store.cameraNum
        })
      }
      
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onMouseClick(e) {
    this.count += 1;
    if (this.count === 1 && e.nativeEvent.offsetX < this.state.width * 0.42) {
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    } else if (
      this.count === 2 &&
      e.nativeEvent.offsetX < this.state.width * 0.42
    ) {
      this.setState({ a: e.nativeEvent.offsetX, b: e.nativeEvent.offsetY });
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleChangeFile = (evt) => {
    var self = this;
    const { name } = evt.target;
    var reader = new FileReader();
    var file = evt.target.files[0];
    let file_size = evt.target.files[0].size;

    reader.onload = function (upload) {
      console.log(file_size);
      if (file_size / 1000000 < 20) {
        self.setState({
          file: upload.target.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  save = e => {
    e.preventDefault()
    client.get("/api/editShop").then(res => {
      console.log(res.data[0].store)
      let editedID = res.data[0].store._id
      console.log(this.state.shopName)
      client.put("/api/createShop/" + editedID, {
        shopName: this.state.shopName,
        cameraNum: this.state.cameraNum,
        x: this.state.x,
        y: this.state.y,
        a: this.state.a,
        b: this.state.b
      })
    })
    client.delete("/api/editShop")
    .then(res => {
      this.props.history.push("/shoplist")
    })
  }

  render() {
    var paddingButton = classNames(
      "btn btn--radius-2 btn--red",
      "element-flex"
    );
    return (
      <div className="main-page">
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Colorlib Templates" />
        <meta name="author" content="Colorlib" />
        <meta name="keywords" content="Colorlib Templates" />
        {/* Icons font CSS*/}
        <link
          href="/vendor/mdi-font/css/material-design-iconic-font.min.css"
          rel="stylesheet"
          media="all"
        />
        <link
          href="/vendor/font-awesome-4.7/css/font-awesome.min.css"
          rel="stylesheet"
          media="all"
        />
        {/* Font special for pages*/}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
          rel="stylesheet"
        />
        {/* Vendor CSS*/}
        <link
          href="/vendor/select2/select2.min.css"
          rel="stylesheet"
          media="all"
        />
        <link
          href="/vendor/datepicker/daterangepicker.css"
          rel="stylesheet"
          media="all"
        />
        {/* Main CSS*/}
        <link href="/css/main.css" rel="stylesheet" media="all" />
        {/* <div className="page-wrapper bg-gra-03 p-t-45 p-b-50"> */}
        <div className="wrapper wrapper--w790">
          <div className="card card-5" ref={(el) => (this.container = el)}>
            <div className="card-heading">
              <h2 className="title">EDITING SHOP : {this.state.shopName}</h2>
            </div>
            <div className="card-body">
              {/* <label className="label--desc">first name</label> */}

              <div className="form-row">
                <div className="name">Shop Name</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-5"
                      type="text"
                      name="shopName"
                      value = {this.state.shopName}
                      onChange={this.handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Camera Number</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-5"
                      type="text"
                      name="cameraNum"
                      value = {this.state.cameraNum}
                      onChange={this.handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Upload Video</div>
                <div className="value">
                  <input
                    type="file"
                    onChange={this.handleChangeFile}
                    className="file-position"
                    name="fileUpload"
                  />
                </div>
              </div>
              {this.state.file !== "" && (
                <div className="centered">
                  <ReactPlayer
                    ref={(player) => {
                      this.player = player;
                    }}
                    url={this.state.file}
                    playing={this.state.playing}
                    width={this.state.width * 0.42}
                    height={this.state.height * 0.6}
                    controls={true}
                    config={{
                      file: {
                        attributes: {
                          crossorigin: "anonymous",
                        },
                      },
                    }}
                  />
                </div>
              )}
              {this.state.file !== "" && <br />}
              {this.state.file !== "" && (
                <button
                  onClick={() => {
                    const frame = captureVideoFrame(
                      this.player.getInternalPlayer()
                    );
                    this.setState({
                      image: frame.dataUri,
                      imgLoaded: true,
                      playing: false,
                      showFlex: "flex",
                    });
                  }}
                  className={paddingButton}
                >
                  Capture Frame
                </button>
              )}
              {this.state.imgLoaded && <br />}
              {this.state.imgLoaded && (
                <div onClick={this.onMouseClick} className="centered">
                  <CanvasDraw
                    ref={(canvasDraw) => (this.myCanvas = canvasDraw)}
                    brushRadius={10}
                    brushColor="red"
                    canvasWidth={this.state.width * 0.42}
                    imgSrc={this.state.image}
                    lazyRadius={0}
                  />
                </div>
              )}
              {this.state.imgLoaded && (
                <h2>Please click on the 2 corner edges of your shop's door </h2>
              )}
              {this.state.imgLoaded &&
                this.state.x !== 0 &&
                this.state.a !== 0 && (
                  <div>
                    <h2>
                      The door coordinates of your shop: ({this.state.x},
                      {this.state.y}), ({this.state.a},{this.state.b})
                    </h2>
                  </div>
                )}

              <div className={this.state.showFlex}>
                {this.state.imgLoaded && (
                  <button
                    onClick={() => {
                      this.myCanvas.clear();
                      this.setState({ x: 0, y: 0, a: 0, b: 0 });
                      this.count = 0;
                    }}
                    className="btn btn--radius-2 btn--red"
                  >
                    Clear
                  </button>
                )}
                <br />
                <div className="flex1">
                  <button
                    className="btn btn--radius-2 btn--red"
                    type="submit"
                    onClick={this.save}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      //   </div>
    );
  }
}

export default EditShop
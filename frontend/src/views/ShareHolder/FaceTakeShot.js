import React, { Component } from "react";
import {
  Row,
  Col,
  CardBody,
  Button,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from "reactstrap";
import logo from "../../assets/img/brand/2.png";
import styles from "../../views/Report/Report.css";
import { data } from "../../constants/ActionTypes";
import LocalizedStrings from "react-localization";
import uploadImage from "../../assets/img/brand/face.png";
import client from "../../api";
import Resizer from "react-image-file-resizer";
//import Webcam from "react-webcam";

let strings = new LocalizedStrings(data);

const Loader = () => <div className={styles.loader}></div>;

class FaceTakeShot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image_root: "",
      imageSrc: "",
      imageState: 1,
      valid: 0,
      is_mobile: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  hideLoader = () => {
    this.setState({ loading: false });
  };

  showLoader = () => {
    this.setState({ loading: true });
  };

  componentDidMount() {
    this.hideLoader();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ is_mobile: window.innerWidth <= 760 });
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  continue = (e) => {
    // this.showLoader();
    const {values} = this.props;
    // client.put('/api/facematch/' + values._id, {
    //   file1: values.image,
    //   file2: this.state.imageSrc
    // })
    //   .then((response) => {
    //     this.hideLoader();
    //     if (response.data.message === "OK") {
    //       //console.log(response.data.data)
    //       //localStorage.setItem('ocrData', JSON.stringify(response.data.data));
    //       this.props.nextStep();
    //     } else {
    //       this.hideLoader();
    //       this.toggleDanger();
    //     }
    //   })
    //   .catch((error) => {
    //     this.hideLoader();
    //     this.toggleDanger();
    //   });
    // const {values} = this.props
    client
      .put("/api/shareholders/" + values._id, {
        image_root: this.state.image_root,
        imageSrc: this.state.imageSrc,
      })
      .then((response) => {
        console.log(response.data);
      });
    this.props.nextStep();
  };

  back = (e) => {
    const { giveChange } = this.props;
    giveChange("is_back", 1);
    e.preventDefault();
    this.props.prevStep();
  };

  validateSingleInput(oInput) {
    var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    if (oInput.type == "file") {
      var sFileName = oInput.value;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (
            sFileName
              .substr(
                sFileName.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() == sCurExtension.toLowerCase()
          ) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          alert(
            "Sorry, " +
              sFileName +
              " is invalid, allowed extensions are: " +
              _validFileExtensions.join(", ")
          );
          oInput.value = "";
          return false;
        }
      }
    }
    return true;
  }

  handleChangeImage = (evt) => {
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];
    if (this.validateSingleInput(evt.target)) {
      try {
        reader.onload = function (upload) {
          Resizer.imageFileResizer(
            file,
            50,
            50,
            "JPEG",
            90,
            0,
            (uri) => {
              self.setState(
                {
                  image_root: upload.target.result,
                  imageSrc: uri,
                  imageState: 0,
                  valid: 1,
                },
                function () {}
              );
            },
            "base64"
          );
        };
        reader.readAsDataURL(file);
      } catch (e) {
        alert("Wrong type Upload!!!");
      }
    }
  };

  onclick = (e) => {
    e.preventDefault();
    document.getElementById("file-input2").click();
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    // let is_wc = false;
    // navigator.getMedia = (navigator.getUserMedia || // use the proper vendor prefix
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia);
    // navigator.getMedia({video: true}, function () {
    //   is_wc = true;
    //   alert(this.state.is_mobile)
    // }, function () {
    //   alert('No Webcam detected!!');
    // });
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageSrc: imageSrc,
      imageState: 0,
      valid: 1,
    });
  };

  render() {
    // const videoConstraints = {
    //   width: 1280,
    //   height: 720,
    //   facingMode: "user"
    // };
    const language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "vi";
    strings.setLanguage(language);
    return (
      <div className="animated fadeIn">
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            {this.state.is_mobile ? (
              <Row>
                <Col className="text-center">
                  <img src={logo} className={styles.logo} alt="N/A" />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="text-center">
                  <img src={logo} className={styles.logoPC} alt="N/A" />
                </Col>
              </Row>
            )}
            <Row>
              <Col className="text-center">
                <span className={styles.titleLogoStyle}>{strings.brand}</span>
              </Col>
            </Row>
            <br />
            <br />
            <div className="card">
              <CardBody>
                <Row>
                  <Col className="text-center">
                    <span className={styles.titleInformStyle}>
                      {strings.face_command}
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="text-center">
                    <Input
                      className={styles.hiddenInputStyle}
                      type="file"
                      id="file-input2"
                      name="file-input2"
                      accept="image/*"
                      onChange={this.handleChangeImage}
                    />
                  </Col>
                </Row>
                <br />
                {this.state.valid === 0 ? (
                  <div>
                    {
                      this.state.is_mobile ? (
                        <div>
                          <Row>
                            <Col className="text-center">
                              <img
                                src={uploadImage}
                                alt="N/A"
                                className={styles.imageStyle}
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col className="text-center">
                              <button
                                onClick={this.onclick}
                                className={styles.button}
                              >
                                {strings.face_take_button}
                              </button>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div>
                          <Row>
                            <Col
                              className={"text-center " + styles.imageStylePc}
                            >
                              <img src={uploadImage} alt="N/A" />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col className="text-center">
                              <button
                                onClick={this.onclick}
                                className={styles.button}
                              >
                                {strings.face_take_button}
                              </button>
                            </Col>
                          </Row>
                        </div>
                      )
                      // <div>
                      //   <Row>
                      //     <Col className="text-center">
                      //       <Webcam
                      //         audio={false}
                      //         height={720}
                      //         ref={this.setRef}
                      //         screenshotFormat="image/jpeg"
                      //         width={1280}
                      //         videoConstraints={videoConstraints}
                      //       />
                      //     </Col>
                      //   </Row>
                      //   <br/>
                      //   <Row>
                      //     <Col className="text-center">
                      //       <button onClick={this.capture}
                      //               className={styles.button}>{strings.face_take_button_pc}</button>
                      //     </Col>
                      //   </Row>
                      // </div>
                    }
                  </div>
                ) : (
                  <div>
                    {this.state.is_mobile ? (
                      <Row>
                        <Col className="text-center">
                          <img
                            src={this.state.image_root}
                            className={styles.imageStyle}
                            alt="N/A"
                            hidden={this.state.imageState}
                          />
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col className={"text-center " + styles.imageStylePc}>
                          <img
                            src={this.state.image_root}
                            className={styles.imageStylePc}
                            alt="N/A"
                            hidden={this.state.imageState}
                          />
                        </Col>
                      </Row>
                    )}

                    <br />
                    <Row>
                      {this.state.is_mobile ? (
                        <Col className="text-center">
                          <button
                            onClick={this.onclick}
                            className={styles.buttonPrev}
                          >
                            {strings.recap_button}
                          </button>
                        </Col>
                      ) : (
                        <Col className="text-center">
                          <button
                            onClick={this.onclick}
                            className={styles.buttonPrev}
                          >
                            {strings.recap_button}
                          </button>
                        </Col>
                      )}

                      <Col className="text-center">
                        <button
                          onClick={this.continue}
                          className={styles.button}
                        >
                          {strings.next_button}
                        </button>
                      </Col>
                    </Row>
                  </div>
                )}
                <br />
                <Row>
                  <Col className="text-center">
                    <button
                      onClick={this.back}
                      className={styles.buttonPrevBreakLine}
                    >
                      {strings.prev_button_break}
                    </button>
                  </Col>
                </Row>
              </CardBody>
            </div>
            <Modal
              isOpen={this.state.danger}
              toggle={this.toggleDanger}
              className={"modal-warning " + this.props.className}
            >
              <ModalHeader toggle={this.toggleDanger}>
                {strings.notify}
              </ModalHeader>
              <ModalBody>{strings.alert_3}</ModalBody>
              <ModalFooter className="text-center">
                <button color="secondary" onClick={this.toggleDanger}>
                  {strings.confirm}
                </button>
              </ModalFooter>
            </Modal>
            {/*<Modal isOpen={this.state.modal} toggle={this.toggle}*/}
            {/*       className={'modal-warning ' + this.props.className}>*/}
            {/*  <ModalHeader toggle={this.toggleDanger}>{strings.notify}</ModalHeader>*/}
            {/*  <ModalBody>*/}
            {/*    {strings.alert_6}*/}
            {/*  </ModalBody>*/}
            {/*  <ModalFooter className="text-center">*/}
            {/*    <button color="secondary" onClick={window.reload()}>{strings.confirm}</button>*/}
            {/*  </ModalFooter>*/}
            {/*</Modal>*/}
          </div>
        )}
      </div>
    );
  }
}

export default FaceTakeShot;

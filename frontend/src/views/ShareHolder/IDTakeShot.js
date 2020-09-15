import React, {Component} from "react";
import {Row, Col, CardBody, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import logo from '../../assets/img/brand/2.png';
import uploadImage from '../../assets/img/brand/cmt.png'
import passportImage from '../../assets/img/brand/passport.png'
import styles from '../../views/Report/Report.css';
import {data} from '../../constants/ActionTypes';
import LocalizedStrings from 'react-localization';
import client from "../../api";


let strings = new LocalizedStrings(data);


const Loader = () => <div className={styles.loader}></div>;

class IDTakeShot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      take_picture: false,
      is_mobile: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger
    });
  }

  hideLoader = () => {
    this.setState({loading: false});
  };

  showLoader = () => {
    this.setState({loading: true});
  };

  componentDidMount() {
    this.hideLoader();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 760});
  }

  continue = e => {
    const {values, giveChange, giveChangeData} = this.props;
    const type_sh = localStorage.getItem('type_sh') ? localStorage.getItem('type_sh') : 0;
    if (type_sh === 2) {
      if (values.valid === 1) {
        localStorage.setItem('ocrData', "");
        this.props.nextStep();
      } else {
        this.toggleDanger();
      }
    } else {
      this.showLoader();
      // e.preventDefault();
      // this.props.nextStep();
      if (values.valid === 1) {
        client.post('/api/ocr', {
          data: values.image
        })
          .then((response) => {
            this.hideLoader();
            if (response.data.message === "OK") {
              //console.log(response.data.data)
              localStorage.setItem('ocrData', JSON.stringify(response.data.data));
              //let data = JSON.parse(localStorage.getItem("ocrData"));
              giveChangeData(response.data.data);
              giveChange('is_back', 0);
              this.props.nextStep();
            } else {
              this.hideLoader();
              this.toggleDanger();
            }
          })
          .catch((error) => {
            this.hideLoader();
            this.toggleDanger();
          });
        // fetch('https://cors-anywhere.herokuapp.com/https://api.fpt.ai/vision/idr/vnm', {
        //   method: 'POST',
        //   headers: {
        //     // 'Authorization': `bearer ${token}`,
        //     'api_key': 'DMP@2019'
        //   },
        //   body: data
        // })
        //   .then(response => response.json())
        //   .then(resData => {
        //     if (resData.data[0]) {
        //       localStorage.setItem('ocrData', JSON.stringify(resData.data[0]));
        //       this.props.nextStep();
        //     } else {
        //       localStorage.setItem('ocrData', "");
        //       this.toggleDanger();
        //       this.hideLoader();
        //     }
        //   })
        // ;
      } else {
        this.toggleDanger();
        this.hideLoader();
      }
    }

  };

  back = e => {
    e.preventDefault();
    this.props.prevStepInv();
  };

  onclick = e => {
    e.preventDefault();
    document.getElementById('file-input').click();
  };


  render() {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    const type_sh = localStorage.getItem('type_sh') ? localStorage.getItem('type_sh') : 0;
    strings.setLanguage(language);
    const {values, handleChangeImage} = this.props;
    return (
      <div className="animated fadeIn">
        {(this.state.loading) ? <Loader/> :
          <div>
            {this.state.is_mobile ?
              <Row>
                <Col className="text-center">
                  <img src={logo} className={styles.logo}
                       alt="N/A"/>

                </Col>
              </Row>
              :
              <Row>
                <Col className="text-center">
                  <img src={logo} className={styles.logoPC}
                       alt="N/A"/>

                </Col>
              </Row>
            }
            <Row>
              <Col className="text-center">
                <span className={styles.titleLogoStyle}>{strings.brand}</span>
              </Col>
            </Row>
            <br/>
            <br/>
            <div className="card">
              <CardBody>
                {type_sh != 2 ?
                  <div>
                    <Row>
                      <Col className="text-center">
                        <span className={styles.titleInformStyle}>{strings.id_command}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <span className={styles.noteStyle}>{strings.note_id_command}</span>
                      </Col>
                    </Row>
                  </div>
                  :
                  <Row>
                    <Col className="text-center">
                      <span className={styles.titleInformStyle}>{strings.id_command2}</span>
                    </Col>
                  </Row>}

                <br/>
                <Row>
                  <Col className="text-center">
                    <Input type="file" id="file-input" name="file-input"
                           className={styles.hiddenInputStyle}
                           onChange={handleChangeImage}
                           accept="image/*"/>
                  </Col>
                </Row>
                {values.valid === 0 ?
                  <div>
                    <Row>

                      {this.state.is_mobile ?
                        ((type_sh != 2) ?
                            <Col className="text-center">
                              <img src={uploadImage} alt="N/A" className={styles.imageStyle}/>
                            </Col>
                            :
                            <Col className="text-center">
                              <img src={passportImage} alt="N/A" className={styles.imageStyle}/>
                            </Col>
                        )
                        :
                        ((type_sh != 2) ?
                            <Col className={"text-center " + styles.imageStylePc}>
                              <img src={uploadImage} alt="N/A"/>
                            </Col>
                            :
                            <Col className={"text-center " + styles.imageStylePc}>
                              <img src={passportImage} alt="N/A"/>
                            </Col>
                        )
                      }


                    </Row>
                    <br/>
                    {(type_sh == 2) ?
                      <Row>
                        <Col className="text-center">
                          <button onClick={this.onclick} className={styles.button}>{strings.id_take_button_2}</button>
                        </Col>
                      </Row>
                      :
                      <Row>
                        <Col className="text-center">
                          <button onClick={this.onclick} className={styles.button}>{strings.id_take_button}</button>
                        </Col>
                      </Row>
                    }

                  </div>
                  :
                  <div>
                    <Row>

                      {this.state.is_mobile ?
                        <Col className="text-center">
                          <img src={values.image_root} className={styles.imageStyle} alt="N/A"
                               hidden={values.imageState}/>
                        </Col>
                        :
                        <Col className={"text-center " + styles.imageStylePc}>
                          <img src={values.image_root} className={styles.imageStylePc} alt="N/A"
                               hidden={values.imageState}/>
                        </Col>
                      }


                    </Row>
                    <br/>
                    <Row>
                      <Col className="text-center">
                        <button onClick={this.onclick} className={styles.buttonPrev}>{strings.recap_button}</button>
                      </Col>
                      <Col className="text-center">
                        <button onClick={this.continue} className={styles.button}>{strings.next_button}</button>
                      </Col>
                    </Row>
                  </div>
                }
                <br/>
                <Row>
                  <Col className="text-center">
                    <button onClick={this.back}
                            className={styles.buttonPrevBreakLine}>{strings.prev_button_break}</button>
                  </Col>
                </Row>


              </CardBody>
            </div>
            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                   className={'modal-warning ' + this.props.className}>
              <ModalHeader toggle={this.toggleDanger}>{strings.notify}</ModalHeader>
              <ModalBody>
                {strings.alert_1}
              </ModalBody>
              <ModalFooter className="text-center">
                <button color="secondary" onClick={this.toggleDanger}>{strings.confirm}</button>
              </ModalFooter>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

export default IDTakeShot;

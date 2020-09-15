import React, {Component} from "react";
import {
  Row,
  Col,
  CardBody,
  Button,
  Input, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import logo from '../../assets/img/brand/2.png'
import styles from '../../views/Report/Report.css';
import {data} from '../../constants/ActionTypes';
import LocalizedStrings from 'react-localization';
import client from "../../api/";

let strings = new LocalizedStrings(data);
const Loader = () => <div className={styles.loader}></div>;


class ConfirmInfoOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      test: "",
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
    const {giveChangeData, values} = this.props;
    let data = {};
    if (localStorage.getItem("ocrData") && values.is_back === 0) {
      data = JSON.parse(localStorage.getItem("ocrData"));
      giveChangeData(data);
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 760});
  }

  continue = e => {
    const {values, giveChange} = this.props;
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    const orc = localStorage.getItem("ocrData") ? localStorage.getItem("ocrData") : "";
    let type_sh = localStorage.getItem("type_sh") ? localStorage.getItem("type_sh") : 0;
    if (values.id && values.name) {
      this.showLoader();
      client.post('/api/shareholders', {
        id: values.id,
        id_prob: values.id_prob,
        name: values.name,
        name_prob: values.name_prob,
        dob: values.dob,
        dob_prob: values.dob_prob,
        home: values.town,
        home_prob: values.town_prob,
        address: values.address,
        address_prob: values.address_prob,
        image_id_front: values.image,
        //image_face: "",
        type_sh: type_sh,
        ocr_init: orc,
        type_reg: values.type_reg,
        //type_online: "",
        //phone: "",
        //: "",
        //activated: "",
        //verification_sent_count: "",
        //verification_nonce: "",
        created_time: Date.now(),
        updated_time: Date.now(),
        language: language
      })
        .then((response) => {
          this.hideLoader();
          if (response.data.message === "OK") {
            giveChange('_id', response.data.id);
            giveChange('id_sh', response.data.id_sh);
            this.props.nextStepTS();
          } else {
            this.hideLoader();
            this.toggleDanger();
          }
        })
        .catch((error) => {
          this.hideLoader();
          this.toggleDanger();
        });
    } else {
      this.toggleDanger();
    }

  }
  ;

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    strings.setLanguage(language);
    const {values, handleChange} = this.props;
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
                <Row>
                  <Col className="text-center">
                    <span className={styles.titleInformStyle}>{strings.confirm_command}</span>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <span className={styles.noteStyle}>{strings.note_confirm_command_o}</span>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col className="was-validated text-center">
                    <Input type="text" className="form-control-warning" name="id"
                           onChange={handleChange('id')}
                           defaultValue={values.id}
                      //value={this.state.test}
                           placeholder={strings.plc_type_o}
                           required/>
                  </Col>

                </Row>
                <br/>
                <Row>
                  <Col className="was-validated text-center">
                    <Input type="text" className="form-control-warning" name="name"
                           onChange={handleChange('name')}
                           defaultValue={values.name}
                           placeholder={strings.plc_name_o}
                           required/>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col className="text-center">
                    <button onClick={this.back} className={styles.buttonPrev}>{strings.prev_button}</button>
                  </Col>
                  <Col className="text-center">
                    <button onClick={this.continue} className={styles.button}>{strings.next_button}</button>
                  </Col>
                </Row>
              </CardBody>
            </div>
            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                   className={'modal-warning ' + this.props.className}>
              <ModalHeader toggle={this.toggleDanger}>{strings.notify}</ModalHeader>
              <ModalBody>
                {strings.alert_2}
              </ModalBody>
              <ModalFooter className="text-center">
                <button color="secondary" onClick={this.toggleDanger}>{strings.confirm}</button>
              </ModalFooter>
            </Modal>

          </div>}
      </div>
    );
  }
}

export default ConfirmInfoOrganization;

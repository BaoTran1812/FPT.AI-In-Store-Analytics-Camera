import React, {Component} from "react";
import {
  Row,
  Col,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label, ModalHeader, ModalBody, ModalFooter, Modal
} from "reactstrap";
import logo from '../../assets/img/brand/2.png';
import styles from '../../views/Report/Report.css';
import {data} from '../../constants/ActionTypes';
import LocalizedStrings from 'react-localization';
import client from "../../api/";

let strings = new LocalizedStrings(data);


class TypeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox1: false,
      checkbox2: false,
      is_mobile: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 760});
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

  continue = e => {
    if (!this.state.checkbox1 && !this.state.checkbox2) {
      this.toggleDanger();
    } else {
      const {values} = this.props;
      let type;
      if (this.state.checkbox1 && this.state.checkbox2) {
        type = 1;
      } else if (this.state.checkbox1) {
        type = 2;
      } else if (this.state.checkbox2) {
        type = 3
      } else {
        type = 4
      }
      if (type === 1 || type === 2) {
        this.props.nextStep()
      }
      else if (type === 3) {
        this.props.nextStepInv()
      }
      else {
        this.toggleDanger()
      }
    }
  }
      // client.put('/api/shareholders/' + values._id, {
      //   type_online: type,
      //   updated_time: Date.now(),
      // })
      //   .then((response) => {
  //         if (response.data.message === "OK") {
  //           this.props.nextStep();
  //         } else {
  //           this.toggleDanger();
  //         }
  //         if (response.data.message === "OK" && type === 2) {
  //           this.props.nextStep()
  //         } else if (response.data.message === "OK" && type === 3) {
  //           this.props.nextStep()
  //         } else if (response.data.message === "OK" && type === 1) {
  //           this.props.nextStep()
  //         } else {
  //           this.toggleDanger()
  //         }
  //       // })
  //       // .catch((error) => {
  //       //   this.toggleDanger();
  //       // });
  //   }

  // };


  back = e => {
    e.preventDefault();
    if (localStorage.getItem("type_sh") === '3')// 3-organization
      this.props.prevStepTS();
    else
      this.props.prevStep();
    // const {giveChange} = this.props;
    // giveChange('image', "");


  };

  handleCheckbox1Change = (changeEvent) => {
    var someProperty = this.state;
    someProperty.checkbox1 = changeEvent.target.checked;
    this.setState({
      someProperty
    });
  };

  handleCheckbox2Change = (changeEvent) => {
    var someProperty = this.state;
    someProperty.checkbox2 = changeEvent.target.checked;
    this.setState({
      someProperty
    });
  };

  render() {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    const {values} = this.props;
    strings.setLanguage(language);
    //const {values, handleChange} = this.props;
    return (
      <div className="animated fadeIn">
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
                <span className={styles.contentStyle}>{strings.type_select_command}
                  <strong>{values.name}</strong>{strings.type_select_command2}<strong>{values.id_sh}</strong>{strings.type_select_command3}</span>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <span className={styles.noteTSStyle}>{strings.type_select_note}</span>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col className="text-center">
                <FormGroup check className="checkbox">
                  <Input className={"form-check-input " + styles.contentStyle} type="checkbox" id="checkbox1"
                         name="checkbox1"
                         onChange={this.handleCheckbox1Change}/>
                  <Label check className={"form-check-label " + styles.contentStyle}
                         htmlFor="checkbox1">{strings.type_select_checkbox1}</Label>
                </FormGroup>
              </Col>

              <Col className="text-center">
                <FormGroup check className="checkbox">
                  <Input className={"form-check-input " + styles.contentStyle} type="checkbox" id="checkbox2"
                         name="checkbox2"
                         onChange={this.handleCheckbox2Change}/>
                  <Label check className={"form-check-label " + styles.contentStyle}
                         htmlFor="checkbox2">{strings.type_select_checkbox2}</Label>
                </FormGroup>
              </Col>
            </Row>
            <br/>
            {/*{this.state.radio === 2*/}
            {/*&&*/}
            {/*<div className={styles.divCheckbox}>*/}
            {/*  <br/>*/}
            {/*  <Row>*/}
            {/*    <Col>*/}
            {/*      <FormGroup check className="checkbox">*/}
            {/*        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"*/}
            {/*               value="option1"/>*/}
            {/*        <Label check className="form-check-label" htmlFor="checkbox1">Bỏ phiếu từ xa</Label>*/}
            {/*      </FormGroup>*/}
            {/*    </Col>*/}
            {/*  </Row>*/}
            {/*  <br/>*/}
            {/*  <Row>*/}
            {/*    <Col>*/}
            {/*      <FormGroup check className="checkbox">*/}
            {/*        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"*/}
            {/*               value="option1"/>*/}
            {/*        <Label check className="form-check-label" htmlFor="checkbox1">Xem trực tuyến</Label>*/}
            {/*      </FormGroup>*/}
            {/*    </Col>*/}
            {/*  </Row>*/}
            {/*</div>*/}
            {/*}*/}
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
            {strings.alert_4}
          </ModalBody>
          <ModalFooter className="text-center">
            <button color="secondary" onClick={this.toggleDanger}>{strings.confirm}</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TypeSelect;

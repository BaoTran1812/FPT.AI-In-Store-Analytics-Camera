import React, {Component} from "react";
import {Row, Col, Button, FormGroup, Input, Label} from "reactstrap";
import logo from '../../assets/img/brand/2.png';
import styles from '../../views/Report/Report.css';
import {data} from '../../constants/ActionTypes';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings(data);

class TypeSHSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: 1,
      is_mobile: false
    }
  }

  continue = e => {
    const {values} = this.props;
    localStorage.setItem("type_sh", this.state.radio);
    e.preventDefault();
    if (localStorage.getItem("type_sh") === '3')// 3-organization
      this.props.nextStep();
    else
      this.props.nextStepInv();
  };

  componentDidMount() {
    if (localStorage.getItem("type_sh")) {
      this.setState(
        {
          radio: parseInt(localStorage.getItem("type_sh"))
        }
      )
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 760});
  }


  handleOptionChange = (changeEvent) => {
    var someProperty = this.state;
    someProperty.radio = parseInt(changeEvent.target.value);
    this.setState({
      someProperty
    });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    strings.setLanguage(language);
    // const {values, handleOptionChange} = this.props;
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
            {/*<span className={styles.titleLogoStyle}>Công Ty Cổ Phần FPT</span>*/}
            <span className={styles.titleLogoStyle}>{strings.brand}</span>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col className="text-center">
            <span className={styles.titleInformStyle}>{strings.type_sh_command}</span>
          </Col>
        </Row>
        <br/>
        <FormGroup check className="radio">
          <Input className={"form-check-input " + styles.contentStyle} type="radio" id="radio1" name="radios" value={1}
                 checked={this.state.radio === 1}
                 onChange={this.handleOptionChange}
          />
          <Label check className={"form-check-label " + styles.contentStyle}
                 htmlFor="radio1">{strings.type_sh_1}</Label>
        </FormGroup>
        <br/>
        <FormGroup check className="radio">
          <Input className={"form-check-input " + styles.contentStyle} type="radio" id="radio2" name="radios" value={2}
                 checked={this.state.radio === 2}
                 onChange={this.handleOptionChange}
          />
          <Label check className={"form-check-label " + styles.contentStyle}
                 htmlFor="radio2">{strings.type_sh_2}</Label>
        </FormGroup>
        <br/>
        <FormGroup check className="radio">
          <Input className={"form-check-input " + styles.contentStyle} type="radio" id="radio3" name="radios" value={3}
                 checked={this.state.radio === 3}
                 onChange={this.handleOptionChange}
          />
          <Label check className={"form-check-label " + styles.contentStyle}
                 htmlFor="radio3">{strings.type_sh_3}</Label>
        </FormGroup>
        <br/>
        {/*<FormGroup check className="radio">*/}
        {/*  <Input className="form-check-input" type="radio" id="radio3" name="radio3" value={3}*/}
        {/*         onChange={handleOptionChange}*/}
        {/*  />*/}
        {/*  <Label check className="form-check-label" htmlFor="radio3">{strings.type_sh_3}</Label>*/}
        {/*</FormGroup>*/}
        {/*<br/>*/}
        <Row>
          <Col className="text-center">
            <button onClick={this.back} className={styles.buttonPrev}>{strings.prev_button}</button>
          </Col>
          <Col className="text-center">
            <button onClick={this.continue} className={styles.button}>{strings.next_button}</button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TypeSHSelect;

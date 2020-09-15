import React, {Component} from "react";
import {Row, Col} from "reactstrap";
import logo from '../../assets/img/brand/2.png'
import styles from '../../views/Report/Report.css';
import {data} from '../../constants/ActionTypes';
import LocalizedStrings from 'react-localization';
import checkImage from "../../assets/img/brand/check.png";

let strings = new LocalizedStrings(data);


class FinishLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_mobile: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 760});
  }

  onClick = e => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
    strings.setLanguage(language);
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
        <br/>
        <Row>
          <Col className={"text-center " + styles.imageCheck}>
            <img src={checkImage} alt={"N/A"}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col className="text-center">
            <span className={styles.titleStyle}>{strings.success_live_title}</span>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <span>{strings.success_live_command}</span>
          </Col>
        </Row>
        <br/>
        <br/>

        <Row>
          <Col className="text-center">
            <button onClick={this.onClick} className={styles.button}>{strings.home_button}</button>
          </Col>
        </Row>
        <br/>

      </div>
    );
  }
}

export default FinishLive;

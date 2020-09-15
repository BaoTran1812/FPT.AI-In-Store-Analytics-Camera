import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from "reactstrap";
import logo from "../../assets/img/brand/2.png";
import doc_vi from "../../assets/doc/chuongtrinh.pdf";
import doc_en from "../../assets/doc/agenda.pdf";
import flag_vi from "../../assets/img/brand/flag_vi.png";
import flag_uk from "../../assets/img/brand/flag_uk.png";
import styles from "../../views/Report/Report.css";
import { data } from "../../constants/ActionTypes";
import LocalizedStrings from "react-localization";
import client from "../../api";

let strings = new LocalizedStrings(data);

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "vi",
      hidden: true,
      hidden_doc: true,
      hidden_program: true,
      valid: 0,
      is_mobile: false,
      logo: "",
      logoTitle: "",
      programTitle: "",
      location: "",
      program: "",
      doc: "",
      phoneNum: "",
    };
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

  continue_live = (e) => {
    this.setState({ valid: this.state.valid + 1 });
    e.preventDefault();
    const { giveChange } = this.props;
    giveChange("type_reg", 1);
    localStorage.setItem("language", this.state.language);
    this.props.nextStepLive();
  };

  componentDidMount() {
    const language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "vi";

    client.get("/api/form").then((response) => {
      let updated = response.data[response.data.length - 1];
      this.setState({
        logo: updated.logo,
        logoTitle: updated.logoTitle,
        programTitle: updated.programTitle,
        location: updated.location,
        program: updated.program,
        doc: updated.doc,
        phoneNum: updated.phoneNum,
      });
    });

    this.setState({
      language,
    });
    if (language === "vi") {
      document.getElementById("vi").style.opacity = "0.5";
      document.getElementById("en").style.opacity = "1";
    } else {
      document.getElementById("en").style.opacity = "0.5";
      document.getElementById("vi").style.opacity = "1";
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ is_mobile: window.innerWidth <= 760 });
  }

  continue_online = (e) => {
    e.preventDefault();
    const { giveChange } = this.props;
    giveChange("type_reg", 2);
    localStorage.setItem("language", this.state.language);
    this.props.nextStep();
  };

  onClickVi = (e) => {
    e.preventDefault();
    document.getElementById("vi").style.opacity = "0.5";
    document.getElementById("en").style.opacity = "1";
    this.setState({ language: "vi" });
  };

  onClickEn = (e) => {
    e.preventDefault();
    document.getElementById("en").style.opacity = "0.5";
    document.getElementById("vi").style.opacity = "1";
    this.setState({ language: "en" });
  };

  render() {
    strings.setLanguage(this.state.language);
    return (
      <div className="animated fadeIn">
        {/*<Row>*/}
        {/*  <Col className={styles.imageLang}>*/}
        {/*    <img src={flag_vi} className={styles.imageLang} onClick={e => this.onClickVi(e)}*/}
        {/*         alt="N/A"/>*/}
        {/*    <img src={flag_uk} className={styles.imageLang} onClick={e => this.onClickEn(e)}*/}
        {/*         alt="N/A"/>*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        {this.state.is_mobile ? (
          <Row>
            <Col className="text-center">
              <img src={this.state.logo} className={styles.logo} alt="N/A" />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-center">
              <img src={this.state.logo} className={styles.logoPC} alt="N/A" />
            </Col>
          </Row>
        )}
        <Row>
          <Col className="text-center">
            <span className={styles.titleLogoStyle}>
              {this.state.logoTitle}
            </span>
          </Col>
        </Row>

        <br />
        <Row>
          <Col className="text-center">
            <span className={styles.titleStyle}>{this.state.programTitle}</span>
          </Col>
        </Row>
        {/* <Row>
          <Col className="text-center">
            <span className={styles.titleStyle}>{strings.inform_2}</span>
          </Col>
        </Row> */}
        {/* <Row>
          <Col className="text-center">
            <span className={styles.titleStyle}>{strings.inform_3}</span>
          </Col>
        </Row> */}
        <br />
        <Row>
          <Col className="text-center">
            <span className={styles.contentStyle}>{this.state.location}</span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className="text-right">
            <div
              id={"vi"}
              onClick={(e) => this.onClickVi(e)}
              aria-disabled="true"
            >
              <img src={flag_vi} className={styles.imageLang} alt="N/A" />
              <span className={styles.contentStyle}>Tiếng Việt</span>
            </div>
          </Col>
          <Col className="text-left">
            <div id={"en"} onClick={(e) => this.onClickEn(e)}>
              <img src={flag_uk} className={styles.imageLang} alt="N/A" />
              <span className={styles.contentStyle}>English</span>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className="text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (this.state.language === "en")
                  window.location.href = this.state.program;
                if (this.state.language === "vi")
                  window.location.href = this.state.program;
                if (this.state.hidden_program === this.state.hidden_doc === true) {
                  this.setState({
                  hidden_program: false
                });
                }
                if (this.state.hidden_program !== this.state.hidden_doc && this.state.hidden_doc === false) {
                  this.setState({
                    hidden_doc: true,
                    hidden_program: false
                  })
                } 
                if (this.state.hidden_program === false && this.state.hidden_doc === true)
                  this.setState({
                    hidden_program:true
                  })
                
              }}
              className={styles.buttonRef}
              target="_blank"
            >
              {strings.program_button}
            </button>
          </Col>
          <Col className="text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (this.state.hidden_program === this.state.hidden_doc === true) {
                  this.setState({
                  hidden_doc: false
                });
                }
                if (this.state.hidden_program !== this.state.hidden_doc && this.state.hidden_program === false) {
                  this.setState({
                    hidden_program: true,
                    hidden_doc: false
                  })
                } 
                if (this.state.hidden_doc === false && this.state.hidden_program === true)
                  this.setState({
                    hidden_doc:true
                  })
              }}
              className={styles.buttonRef}
              target="_blank">
              {strings.doc_button}
            </button>
          </Col>
        </Row>
        <br />
        {/*<Row>*/}
        {/*  <Col className="text-center">*/}
        {/*    <div hidden={this.state.hidden}>*/}
        {/*      {(this.state.language === 'en') ?*/}
        {/*        <Row>*/}
        {/*          <Col className="text-center">*/}
        {/*            <a*/}
        {/*              href={strings.link_2}>{strings.doc_2}</a>*/}
        {/*          </Col>*/}
        {/*        </Row>*/}
        {/*        :*/}
        {/*        <Row>*/}
        {/*          <Col className="text-center">*/}
        {/*            <a*/}
        {/*              href={strings.link_2}>{strings.doc_2}</a>*/}
        {/*          </Col>*/}
        {/*        </Row>}*/}
        {/*    </div>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <div hidden={this.state.hidden_program}>
          <Row>
            <Col className="text-center">
              <a
                className={styles.contentStyleLink}
                href={this.state.program}
                target="_blank"
                rel="noopener noreferrer">
                Chương trình theo ngày
              </a>
            </Col>
          </Row>
        </div>

        <div hidden={this.state.hidden_doc}>
          <Row>
            <Col className="text-center">
              <a
                className={styles.contentStyleLink}
                href={this.state.doc}
                target="_blank"
                rel="noopener noreferrer">
                {strings.doc_1}
              </a>
            </Col>
          </Row>
        </div>
        {/* <br/>
          <Row>
            <Col className="text-center">
              <a className={styles.contentStyleLink}
                 href={strings.link_2}>{strings.doc_2}</a>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className="text-center">
              <a className={styles.contentStyleLink}
                 href={strings.link_3}
                 target="_blank">{strings.doc_3}</a>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className="text-center">
              <a className={styles.contentStyleLink}
                 href={strings.link_4}
                 target="_blank">{strings.doc_4}</a>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col className="text-center">
              <a className={styles.contentStyleLink}
                 href={strings.link_5}
                 target="_blank">{strings.doc_5}</a>
            </Col>
          </Row> */}

        <br />
        <div className={styles.separator}>{strings.reg}</div>
        <br />
        <Row>
          <Col className="text-center">
            <button onClick={this.continue_online} className={styles.button}>
              {strings.online_button}
            </button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <span className={styles.noteStyle}>{strings.note_online}</span>
          </Col>
        </Row>

        <br />
        <Row>
          <Col className="text-center">
            <button onClick={this.continue_online} className={styles.button}>
              {strings.live_button}
            </button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <span className={styles.noteStyle}>{strings.note_live}</span>
          </Col>
        </Row>

        <br />
        <Row>
          <Col className="text-center">
            <span className={styles.noteTSStyle}>
              {strings.note_lp_1} <strong>{this.state.phoneNum}</strong>
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <span className={styles.noteTSStyle}>{strings.note_lp_3}</span>
          </Col>
        </Row>
        <br />
        <Modal
          isOpen={this.state.danger}
          toggle={this.toggleDanger}
          className={"modal-warning " + this.props.className}
        >
          0
          <ModalHeader toggle={this.toggleDanger}>{strings.notify}</ModalHeader>
          <ModalBody>
            <strong>{strings.button_live_alert_1}</strong>
            <br />
            {strings.button_live_alert_2}
            <br />
            {strings.button_live_alert_3}
            <br />
            {strings.button_live_alert_4}
          </ModalBody>
          <ModalFooter className="text-center">
            <Button color="danger" onClick={this.continue_live}>
              {strings.button_live_alert}
            </Button>
            <Button color="success" onClick={this.continue_online}>
              {strings.online_button}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LandingPage;

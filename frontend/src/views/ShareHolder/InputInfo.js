import React, { Component } from "react";
import styles from '../../views/Report/Report.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Table from "./Table";
import Button from "./Button"
import { Form } from "react-bootstrap";
import {Row, Col} from "reactstrap";

class InputInfo extends Component {
    constructor(props) {
        super(props)
    }
    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }


  render() {
    return (
      <div>
        <Navbar />
        <br />
        <Table />
        {/* <Row>
          <Col className="text-center">
            <button onClick={this.continue} className={styles.new_button}>
              Tiếp theo
            </button>
          </Col>
        </Row> */}
        <Button continue = {this.continue}/>

      </div>
    );
  }
}

export default InputInfo;

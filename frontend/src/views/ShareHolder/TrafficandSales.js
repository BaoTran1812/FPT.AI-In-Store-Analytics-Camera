import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
  } from "reactstrap";
import classNames from "classnames";
import MultiChart from "./MultiChart"

class TrafficandSales extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tableClass = classNames(
        "table-outline mb-0 d-none d-sm-table",
        "checking"
    );
    
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>Traffic {" & "} Sales</CardHeader>
            <CardBody>
              <Table hover responsive className={tableClass}>
                <thead className="thead-light">
                  <tr>
                    {/* <th className="text-center">
                        <i className="icon-people"></i>
                      </th> */}
                    <th>Store Name</th>
                    <th className="text-center">Total Visits</th>
                    <th>Conversion Rate</th>
                    <th className="text-center">Average Dwelltime</th>
                    {/* <th>Activity</th> */}
                  </tr>
                </thead>
                {/* {tableItem} */}
                <tbody>{this.props.state.postData}</tbody>
              </Table>
              <br />
              <br />
              <br />
              <div>
                <MultiChart
                  stateNew={this.props.state.new_data}
                  state={this.props.state.data}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default TrafficandSales

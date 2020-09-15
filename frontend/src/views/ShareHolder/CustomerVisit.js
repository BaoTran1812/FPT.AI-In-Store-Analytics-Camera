import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import HeatMap from "react-heatmap-grid";

export default class CustomerVisit extends Component {
  render() {
    const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Display only even labels
    const xLabelsVisibility = new Array(24)
      .fill(0)
      .map((_, i) => (i % 1 === 0 ? true : false));

    const yLabels = [
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
    ];
    

    return (
            <CardBody>
              <div className="heatmap-style">
                {this.props.state.length !== 0 && (
                  <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    xLabelsLocation={"bottom"}
                    xLabelsVisibility={xLabelsVisibility}
                    xLabelWidth={60}
                    data={this.props.state[this.props.index]}
                    height={35}
                    cellStyle={(background, value, min, max, data, x, y) => ({
                      background: `rgb(0, 151, 230, ${
                        1 - (max - value) / (max - min)
                      })`,
                      fontSize: "11.5px",
                      color: "#444",
                    })}
                    cellRender={(value) => value && <div>{value}</div>}
                  />
                )}
              </div>
            </CardBody>
    );
  }
}

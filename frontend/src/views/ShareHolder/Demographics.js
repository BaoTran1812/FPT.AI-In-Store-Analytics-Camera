import React, { Component } from "react";
import {
  Card,
  CardBody, 
  CardHeader,
  Col,
  Row,
  CardDeck
  
} from "reactstrap";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class Demographics extends Component {
  render() {
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Age Range",
      },
      axisX: {
        reversed: true,
      },
      axisY: {
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          type: "bar",
          dataPoints: [
            { y: this.props.state.under20, label: "Under 20" },
            { y: this.props.state.over20, label: "20-30" },
            { y: this.props.state.over30, label: "30-40" },
            { y: this.props.state.over40, label: "Over 40" },
          ],
        },
      ],
    };

    const options2 = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Gender",
      },
      axisX: {
        reversed: true,
      },
      axisY: {
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          type: "bar",
          dataPoints: [
            { y: this.props.state.num_male, label: "Male" },
            { y: this.props.state.num_female, label: "Female" },
            { y: this.props.state.num_unknown, label: "Unknown" },
          ],
        },
      ],
    };
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>Demographics</CardHeader>
            <CardBody>
              <div>
                <CardDeck className="flex-chart">
                  <Card className="card-border">
                    <CardBody>
                      <CanvasJSChart
                        options={options}
                        className="separate-line"
                        /* onRef={ref => this.chart = ref} */
                      />
                    </CardBody>
                  </Card>

                  <Card className="card-border">
                    <CardBody>
                      <CanvasJSChart
                        options={options2}
                        className="separate-line"
                        /* onRef={ref => this.chart = ref} */
                      />
                    </CardBody>
                  </Card>
                </CardDeck>

                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

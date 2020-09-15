import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
import { Card, CardBody, CardDeck } from "reactstrap";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends Component {
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

          <Card className= "card-border">
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
    );
  }
  addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
}
export default BarChart;

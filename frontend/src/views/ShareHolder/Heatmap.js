import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [
            {
              name: "9pm",
              data: this.props.state.data9pm
            },
            {
              name: "8pm",
              data: this.props.state.data8pm
            },
            {
                name: "7pm",
                data: this.props.state.data7pm
            },
            {
                name: "6pm",
                data: this.props.state.data6pm
            },
            {
                name: "5pm",
                data: this.props.state.data5pm
            },
            {
                name: "4pm",
                data: this.props.state.data4pm
            },
            {
                name: "3pm",
                data: this.props.state.data3pm
            },
            {
                name: "2pm",
                data: this.props.state.data2pm
            },
            {
                name: "1pm",
                data: this.props.state.data1pm
            },
            {
                name: "12pm",
                data: this.props.state.data12pm
            },
            {
                name: "11am",
                data: this.props.state.data11am
            },
            {
                name: "10am",
                data: this.props.state.data10am
            },
            {
                name: "9am",
                data: this.props.state.data9am
            },
            {
                name: "8am",
                data: this.props.state.data8am
            },
            {
                name: "Series 1",
                data: [{
                  x: 'Mon',
                  y: 22
                }, {
                  x: 'Tue',
                  y: 29
                }, {
                  x: 'Wed',
                  y: 13
                }, {
                  x: 'Thur',
                  y: 32
                },
                {
                    x: 'Fri',
                    y: 13
                  },
                  {
                    x: 'Sat',
                    y: 13
                  },
                  {
                    x: 'Sun',
                    y: 13
                  },]
              },
          ],
          options : {
            plotOptions: {
              heatmap: {
                colorScale: {
                  ranges: [{
                      from: -100,
                      to: 50,
                      color: '#00A100',
                      name: 'low',
                    },
                    {
                      from: 51,
                      to: 100,
                      color: '#128FD9',
                      name: 'medium',
                    },
                    {
                      from: 101,
                      to: 151,
                      color: '#FFB200',
                      name: 'high',
                    }
                  ]
                }
              }
            }
          }
        };
      }
      
      

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="heatmap"
              width="1000"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

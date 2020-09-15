import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MultiChart extends Component {	
    constructor(props) {
		super(props)
		
	}
	lineData = this.lineData.bind(this)
	

	lineData() {
		this.data1 = []
		for (let i = 0; i < this.props.stateNew.length; i++) {
			this.dataSet = []
			for (let j = 0; j < this.props.state.length; j++) {
				if (this.props.state[j].day === "Sunday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Sun", x: 0})
				}
				else if (this.props.state[j].day === "Monday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Mon", x:1})
				}
				else if (this.props.state[j].day === "Tuesday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Tues", x:2})
				}
				else if (this.props.state[j].day === "Wednesday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Wed", x:3})
				}
				else if (this.props.state[j].day === "Thursday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Thur", x:4})
				}
				else if (this.props.state[j].day === "Friday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Fri", x:5})
				}
				else if (this.props.state[j].day === "Saturday" && this.props.stateNew[i].shop_name === this.props.state[j].shop_name && this.props.state[j].totalVisit !== "") {
					this.dataSet.push({y: parseInt(this.props.state[j].totalVisit), label: "Sat", x:6})
				}
			}
			this.data1.push({
					type: "spline",
					lineThickness: 1.5,
					name: this.props.stateNew[i].shop_name,
					showInLegend: true,
					dataPoints: this.dataSet,
					
			})
			
		}
		
		return this.data1
	}


	render() {
		const options = {
				animationEnabled: true,	
				// title:{
				// 	text: "Number of customers throughout the week",
				// 	fontSize: 25,
				// 	fontColor: "#73818f",
				// 	fontWeight: "normal",
				// 	fontFamily: "verdana"
					
				// },
				axisX : {
					lineThickness: 0.2,
					labelFontColor: "#73818f",
					labelFontSize: 12,
					titleFontSize: 17,
					titleFontColor:"#73818f",
					titleFontWeight: "lighter"
				},
				axisY : {
					title: "Number of customers",
					includeZero: false,
					gridColor: "#c8ced3",
					gridThickness: 1,
					lineThickness: 0.2,
					labelFontColor: "#73818f",
					labelFontSize: 12,
					titleFontSize: 17,
					titleFontColor:"#73818f",
					titleFontWeight: "lighter"
				},
				toolTip: {
					shared: true,
					
				},
				legend: {
					fontColor: "#73818f",
					fontWeight: "lighter"
				},
				data: this.lineData()
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			
            
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default MultiChart                            
import React, { Component } from "react";
import {Progress} from 'reactstrap'
import classNames from "classnames";

class TableChart extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    const tdClass = classNames(
      "text-center",
      "removeBorder"
    );
    return (
    <tr>
        {/* <td className= {tdClass}>
          <div className="avatar">
            <img
              src={"assets/img/avatars/1.jpg"}
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
            <span className="avatar-status badge-success"></span>
          </div>
        </td> */}
        <td className= "removeBorder">
          {/* <div>{this.props.state.data[this.props.index].shop_name}</div> */}
          {/* <div>{this.props.state[this.props.index].shop_name}</div> */}
          <div>{this.props.state.shop_name}</div>
          <div className="small text-muted">
            <span>New</span> | Registered: Jan 1, 2015
          </div>
        </td>
        <td className={tdClass}>
          <div className="clearfix">
            <div className="float-left">
              {/* <strong>{this.props.state[this.props.index].totalVisit}</strong> */}
              <strong>{this.props.state.totalVisit}</strong>
              
            </div>
            <br/>
            <div className="float-right">
              <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
            </div>
          </div>
          <Progress className="progress-xs" color= {this.props.newColorVisit} value= {this.props.state.totalVisit} max = {this.props.maxVisit()} />
          
        </td>
        <td className= "removeBorder">
          <div className="clearfix">
            <div className="float-left">
              <strong>50%</strong>
            </div>
            <br/>
            <div className="float-right">
              <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
            </div>
          </div>
          <Progress className="progress-xs" color="info" value="50" />
        </td>
        <td className= {tdClass}>
        <div className="clearfix">
            <div className="float-left">
              <strong>{this.props.state.averageDwelltime}</strong>
            </div>
            <br/>
            <div className="float-right">
              <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
            </div>
          </div>
          <Progress className="progress-xs" color = {this.props.newColorDwelltime}  value={this.props.state.averageDwelltime} max = {this.props.maxDwelltime()} />
        </td>
        
    </tr>
    )
      
  }
}
export default TableChart

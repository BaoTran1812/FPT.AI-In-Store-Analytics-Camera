import React, { Component, PropTypes } from "react";
import { withRouter } from 'react-router-dom'
import { Button } from "reactstrap";
import client from "../../api";
class ShoplistTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      editedShop : ""
    };
    this.onEditClick = this.onEditClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
 
  onDeleteClick() {
    this.setState({hide: true})
    client.get("/api/createShop").then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]._id === this.props._id) {
          client.delete("/api/createShop/" + res.data[i]._id).then(response => {
            console.log(res.data[i]._id)
          })
        }
      }
    })
    .then (() => {
      window.location.reload(false)
    })
  }

  onEditClick = e => {
    e.preventDefault()
    client.get("/api/createShop").then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]._id === this.props._id) {
          client.post("/api/editShop", {
            store: res.data[i]
          })
          .then(res => {
            this.props.history.push("/editing")
          })
        }
      }
    })
  }

  render() {
    return (
      <tbody>
        {this.state.hide !== true && (
          <tr>
            <td className="column1">{this.props.shopName}</td>
            <td className="column6">
              <div className="flex2">
                <Button color="primary">Show Graph</Button>{" "}
                <Button color="warning" onClick={this.onEditClick}>
                  Edit
                </Button>{" "}
                <Button color="danger" onClick={this.onDeleteClick}>
                  Delete
                </Button>{" "}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}
export default withRouter(ShoplistTable)

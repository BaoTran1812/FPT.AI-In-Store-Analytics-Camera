import React, { Component } from "react";
import { Button } from "reactstrap";
import "./vendor/select2/select2.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./vendor/animate/animate.css";
import "./css/main2.css";
import client from "../../api";
import ShoplistTable from "./ShoplistTable";
import ReactPaginate from "react-paginate";

export default class ShopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopArray: [],
      item: "",
      offset: 0,
      data: [],
      perPage: 3,
      currentPage: 0,
    };
    // this.onEditClick = this.onEditClick.bind(this)
    this.receivedData = this.receivedData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    // client.get('/api/currentPage').then(res => {
    //   let currentPage = Math.round(((parseInt(res.data[res.data.length-1].currentPage))/this.state.perPage))
    //   this.setState({currentPage: parseInt(currentPage)})
    // })
    this.receivedData()
    
  }

  receivedData() {
    client.get("/api/createShop").then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((shop, index) => (
        <React.Fragment>
          <ShoplistTable
            shopName={shop.shopName}
            index={index}
            _id={shop._id}
          />
        </React.Fragment>
      ));
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
      });
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    )
  };

  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*===============================================================================================*/}
        <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
        {/*===============================================================================================*/}
        <link
          href="/vendor/mdi-font/css/material-design-iconic-font.min.css"
          rel="stylesheet"
          media="all"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/bootstrap/css/bootstrap.min.css"
        />
        {/*===============================================================================================*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
        />
        {/*===============================================================================================*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/animate/animate.css"
        />
        {/*===============================================================================================*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/select2/select2.min.css"
        />
        {/*===============================================================================================*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendor/perfect-scrollbar/perfect-scrollbar.css"
        />
        {/*===============================================================================================*/}
        <link rel="stylesheet" type="text/css" href="/css/util.css" />
        <link rel="stylesheet" type="text/css" href="/css/main2.css" />
        {/*===============================================================================================*/}
        {/* <div className="limiter"> */}
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    <th className="column1">Shop Name</th>
                    <th className="heading">Edit</th>
                  </tr>
                </thead>
                {this.state.postData}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={4}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

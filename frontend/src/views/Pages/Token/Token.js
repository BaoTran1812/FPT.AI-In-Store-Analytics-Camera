import React from 'react';
import queryString from 'query-string';

class Token extends React.Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <span>asdasd</span>
      </div>
    );
  }
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
  if (window.location.href.indexOf("#") != -1) {
    const url = window.location.href;
    const hash = url.split('#')[1];
    let token_array = hash.split('&');
    for (var i = 0; i< token_array.length ; i++) {
      let token_string = token_array[i];
      if(token_string.includes("id_token")) {
      const id_token = token_string.split('=')[1];
      window.localStorage.setItem("id_token", id_token);
      window.localStorage.setItem("access_token", id_token)
      window.location.href ="/project/view";
      }
    }

  }
 // this.props.history.push("/dashboard");
    /*
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("access_token", query.token);
      this.props.history.push("/#/dashboard");
    }
    */
  }
}
export default Token;

import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../views/Report/Report.css';

class Example extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className= "tiep-theo">
        <Button variant="light" size="lg" onClick= {this.props.continue} >Lưu</Button>
        
      </div>
    );
  }
  
} 
  

export default Example;
import React, {Component} from 'react'
import styles from '../../views/Report/Report.css';
import {Row, Col} from "reactstrap";
import client from "../../api";

class OnlineForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stocks : "",
            total_stocks : "",
            opinion:"",
            opinion1:"",
            opinion2:"",
            opinion3:"",
            opinion4:"",
            opinion5:"",
            image_root:"",
            imageSrc:"",
            id: "",
            name: "",
            dob: "",
            home: "",
            address: "",
          }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    continue = e => {
        e.preventDefault()
        const {values} = this.props 
        console.log(values)
        client.post('/api/confirmOnline', 
            {
               stocks : this.state.stocks,
               total_stocks: this.state.total_stocks,
               opinion: this.state.opinion,
               opinion1: this.state.opinion1,
               opinion2: this.state.opinion2,
               opinion3: this.state.opinion3,
               opinion4: this.state.opinion4,
               opinion5: this.state.opinion5,
               id_prob: values.id_prob,
               image_root: values.image_root,
               imageSrc: values.imageSrc,
               id: values.id,
               name:values.name,
               dob: values.dob,
               town: values.town,
               address: values.address
            }
        )
            .then((response) => {
                console.log(response.data)
                console.log(values.name)
                this.props.nextStep();
              }
            )
    }

    back = e => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        const {values} = this.props
        return(
            <div>
                <div className ={styles.opening}>CÔNG TY CỔ PHẦN FPT</div>
                <div className ={styles.opening2}>ĐẠI HỘI CỔ ĐÔNG THƯỜNG NIÊN NĂM 2020</div>
                <div className = {styles.opening3}>---------------------------------</div>
                {/* <img src= "fpt_logo.png" alt= "FPT logo"></img> */}
                <br/>
                <br/>
                <h1 className= {styles.heading1}>PHIẾU BIỂU QUYẾT</h1>
                <h1 className= {styles.heading1}>MÃ ĐẠI BIỂU: {values.id}</h1>
                <br/>
                <p className= {styles.para1}>Họ và tên Đại biểu: {values.name}</p>
                <p className= {styles.para1}>Số lượng cổ phần nhận ủy quyền: <input type= "text" placeholder= "......" name = "stocks" onChange= {this.handleChange}></input>
                cổ phần</p>
                <p className= {styles.para1}>Tổng số lượng cổ phần đại diện: <input type= "text" placeholder= "......" name = "total_stocks" onChange= {this.handleChange}></input> cổ phần</p>
                <br/>
                <p className= {styles.italic, styles.para1}>(Quý Đại biểu đánh dấu vào ô Ý kiến lựa chọn theo từng Nội dung biểu quyết)</p>
                <br/>
                <table>
                <tr>
                    <th>Nội dung</th>
                    <th>Tán thành</th> 
                    <th>Không tán thành</th>
                    <th>Không ý kiến</th>
                </tr>
                <tr>
                    <td><strong>Nội dung 1:</strong> Phê duyệt Báo cáo Tài chính Kiểm toán năm 2019; Báo cáo
                     của Hội đồng Quản trị năm 2019; Định hướng chiến lược giai đoạn 2020 - 2022; Kế hoạch kinh doanh 2020; Báo cáo Ban Kiểm soát năm 2019.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion" onChange= {this.handleChange}></input></td>
                </tr>
                <tr>
                    <td><strong>Nội dung 2:</strong> Phê duyệt Phương án sử dụng lợi nhuận năm 2019 và Chính sách chi trả cổ tức bằng tiền mặt năm 2020.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion1" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion1" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion1" onChange= {this.handleChange}></input></td>
                </tr>
                <tr>
                    <td><strong>Nội dung 3:</strong> Phê duyệt Chương trình phát hành cổ phần cho người lao động giai đoạn 2020-2022.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion2" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion2" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion2" onChange= {this.handleChange}></input></td>
                </tr>
                <tr>
                    <td><strong>Nội dung 4:</strong> Phê duyệt Chương trình phát hành cổ phần cho cán bộ lãnh đạo cấp cao giai đoạn 2020-2025.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion3" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion3" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion3" onChange= {this.handleChange}></input></td>
                </tr>
                <tr>
                    <td><strong>Nội dung 5:</strong> Phê duyệt Ngân sách thu nhập và thù lao của Hội đồng Quản trị năm 2020; Ngân sách chi phí hoạt động của Ban Kiểm soát năm 2020.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion4" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion4" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion4" onChange= {this.handleChange}></input></td>
                </tr>
                <tr>
                    <td><strong>Nội dung 6:</strong> Phê duyệt đề xuất lựa chọn Công ty Kiểm toán độc lập thực hiện kiểm toán Báo cáo Tài chính năm 2020.</td>
                    <td><input className= {styles.input} type="radio" value = "agree" name= "opinion5" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "disagree" name= "opinion5" onChange= {this.handleChange}></input></td>
                    <td><input className= {styles.input} type="radio" value = "neutral" name= "opinion5" onChange= {this.handleChange}></input></td>
                </tr>
                </table>
                <br/>
                <br/>
                <Row>
                    <Col className="text-center">
                        <button onClick={this.back} className={styles.buttonPrev}>Quay Lại</button>
                    </Col>
                    <Col className="text-center">
                        <button onClick={this.continue} className={styles.button}>Tiếp theo</button>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default OnlineForm
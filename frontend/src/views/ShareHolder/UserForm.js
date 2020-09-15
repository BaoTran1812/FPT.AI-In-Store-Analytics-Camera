import React, { Component } from "react";
import EmailAdd from "./EmailAdd";
import LandingPage from "./LandingPage";
import FaceTakeShot from "./FaceTakeShot";
import ConfirmInfo from "./ConfirmInfo";
import IDTakeShot from "./IDTakeShot";
import Finish from "./Finish";
import TypeSelect from "./TypeSelect";
import TypeSHSelect from "./TypeSHSelect";
import ConfirmInfoLive from "./ConfirmInfoLive";
import FinishLive from "./FinishLive";
import ConfirmInfoOrganization from "./ConfirmInfoOrganization";
import Resizer from "react-image-file-resizer";
import OnlineForm from "./OnlineForm";
import InputInfo from "./InputInfo";

export class UserForm extends Component {
  state = {
    _id: "",
    step: 1,
    id: "",
    id_prob: "",
    name: "",
    name_prob: "",
    dob: "",
    dob_prob: "",
    town: "",
    town_prob: "",
    address: "",
    address_prob: "",
    email: "",
    image: "",
    image_root: "",
    type_sh: 1,
    imageState: 1,
    valid: 0,
    is_back: 0,
    type_reg: 0,
    phone: "",
    id_sh: "",
    stocks : "",
    total_stocks : "",
    opinion:"",
    opinion1:"",
    opinion2:"",
    opinion3:"",
    opinion4:"",
    opinion5:""
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  nextStepInv = () => {
    const { step } = this.state;
    this.setState({
      step: step + 2,
    });
  };

  prevStepInv = () => {
    const { step } = this.state;
    this.setState({
      step: step - 2,
    });
  };

  nextStepTS = () => {
    const { step } = this.state;
    this.setState({
      step: step + 4,
    });
  };

  prevStepTS = () => {
    const { step } = this.state;
    this.setState({
      step: step - 4,
    });
  };

  nextStepLive = () => {
    const { step } = this.state;
    this.setState({
      step: step + 9,
    });
  };

  prevStepLive = () => {
    const { step } = this.state;
    this.setState({
      step: step - 9,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleOptionChange = (changeEvent) => {
    let someProperty = this.state;
    someProperty.type_sh = parseInt(changeEvent.target.value);
    this.setState({
      someProperty,
    });
  };

  giveChange = (input, change) => {
    this.setState({ [input]: change });
  };

  giveChangeData = (data) => {
    this.setState(
      {
        id: data.id,
        name: data.name,
        dob: data.dob,
        town: data.home,
        address: data.address,
        id_prob: data.id_prob,
        name_prob: data.name_prob,
        dob_prob: data.dob_prob,
        town_prob: data.home_prob,
        address_prob: data.address_prob,

      },
      function () {
        console.log(this.state.id_prob);
      }
    );
  };


  validateSingleInput(oInput) {
    var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    if (oInput.type === "file") {
      var sFileName = oInput.value;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (
            sFileName
              .substr(
                sFileName.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() === sCurExtension.toLowerCase()
          ) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          alert(
            "Sorry, " +
              sFileName +
              " is invalid, allowed extensions are: " +
              _validFileExtensions.join(", ")
          );
          oInput.value = "";
          return false;
        }
      }
    }
    return true;
  }

  handleChangeImage = (evt) => {
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];

    if (this.validateSingleInput(evt.target)) {
      try {
        reader.onload = function (upload) {
          Resizer.imageFileResizer(
            file,
            400,
            400,
            "JPEG",
            90,
            0,
            (uri) => {
              self.setState(
                {
                  image_root: upload.target.result,
                  image: uri,
                  imageState: 0,
                  valid: 1,
                },
                function () {}
              );
            },
            "base64"
          );
        };
        reader.readAsDataURL(file);
      } catch (e) {
        alert("Wrong type Upload!!!");
      }
    }
  };

  render() {
    const { step } = this.state;
    const {
      _id,
      id,
      name,
      dob,
      town,
      address,
      id_prob,
      name_prob,
      dob_prob,
      town_prob,
      address_prob,
      email,
      image,
      image_root,
      imageState,
      valid,
      type_sh,
      is_back,
      type_reg,
      phone,
      id_sh,
      stocks,
      total_stocks,
      opinion,
      opinion1,
      opinion2,
      opinion3,
      opinion4,
      opinion5,
      
    } = this.state;
    const values = {
      _id,
      id,
      name,
      dob,
      town,
      address,
      id_prob,
      name_prob,
      dob_prob,
      town_prob,
      address_prob,
      email,
      image,
      image_root,
      imageState,
      valid,
      type_sh,
      is_back,
      type_reg,
      phone,
      id_sh,
      stocks,
      total_stocks,
      opinion,
      opinion1,
      opinion2,
      opinion3,
      opinion4,
      opinion5,
      
      
    };

    switch (step) {
      // case 1:
      //   return (
      //     <InputInfo
      //       nextStep = {this.nextStep}
      //       values = {values}
      //     />
      //   )
      case 1:
        return (
          <LandingPage
            nextStep={this.nextStep}
            nextStepLive={this.nextStepLive}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            values={values}
          />
        );
      case 2:
        return (
          <TypeSHSelect
            nextStepInv={this.nextStepInv}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleOptionChange}
            values={values}
          />
        );
      case 3:
        return (
          <ConfirmInfoOrganization
            nextStepTS={this.nextStepTS}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            giveChangeData={this.giveChangeData}
            values={values}
          />
        );
      case 4:
        return (
          <IDTakeShot
            nextStep={this.nextStep}
            prevStepInv={this.prevStepInv}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            giveChangeData={this.giveChangeData}
            handleChangeImage={this.handleChangeImage}
            values={values}
          />
        );
      case 5:
        return (
          <ConfirmInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            giveChangeData={this.giveChangeData}
            values={values}
          />
        );
      case 6:
        return (
          <FaceTakeShot
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            values={values}
          />
        );
      case 7:
        return (
          <TypeSelect
            nextStep={this.nextStep}
            nextStepInv = {this.nextStepInv}
            prevStep={this.prevStep}
            prevStepTS={this.prevStepTS}
            giveChange={this.giveChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 8:
        return (
          <OnlineForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onlineData = {this.onlineData}
            values = {values}
          />
        );
      case 9:
        return (
          <EmailAdd
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 10:
        return <Finish />;
      case 11:
        return (
          <ConfirmInfoLive
            nextStep={this.nextStep}
            prevStepLive={this.prevStepLive}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            giveChangeData={this.giveChangeData}
            values={values}
          />
        );
      case 12:
        return <FinishLive />;
      default:
        return (
          <LandingPage
            nextStep={this.nextStep}
            nextStepLive={this.nextStepLive}
            handleChange={this.handleChange}
            giveChange={this.giveChange}
            values={values}
          />
        );
    }
  }
}

export default UserForm;

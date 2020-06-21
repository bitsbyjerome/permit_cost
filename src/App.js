import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Provinces from './Provinces';
import Cost from './api/permit_cost/Cost';
import {CircleLoader} from 'react-spinners';
import NoResultForm from './NoResultForm';
import {Link} from 'react-router-dom';


let permitCost = {};
    const permitTypeOptions = [{value:'oversize', label:'Oversize'}, {value:'regular', label:'Regular'}];

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {loading:false, showMainForm:true,
                      showResultForm:false, showInputKms:false,
                      showNoResultForm:false, showInputVehicleConfig:false,
                      regWeight:null, regIfta:null,
                      regIrp:null, amountKms:'',
                      truckType:null, permitType:null,
                      province:null, tripInfo:null,
                      provinces:Provinces,
                      validationErrors: {
                      regWeight:'',
                      regIfta:'',
                      regIrp:'', amountKms:'',
                      truckType:'', permitType:'',
                      province:'', tripInfo:'',
                      permitTypeSelectedOption:'',
                      formValidationMessage:''
                      }
        }

        this.handleStartOverBtnClick  = this.handleStartOverBtnClick.bind(this);
    };

    resetState = () =>{
        this.setState({
            ...this.validationErrors,
            showMainForm:true,
            showResultForm:false

        })
    };

    performFormValidation = () => {
        let valid = true;
        if(!this.state.province){
            valid = false;

            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, province:'Please choose a province'}});
            },1)
        } if(!this.state.permitType){
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, permitType:'Please choose a permit type'}});
            }, 1)

        } if(!this.state.regWeight){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regWeight:'Please choose your truck registered weight'}});
                }, 1);

        }if(this.state.regWeight === 'no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regWeight:'If your truck registered weight is less than the above indicated weight, and has less than 3 axles, no temporary permits are required.'}});
            })

        }if (!this.state.regIfta){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regIfta:'Please indicate if the truck has ifta'}});
                }, 1);

        }if (!this.state.amountKms && this.state.regIfta ==='no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, amountKms:'Please indicate the amount of kms'}});
                }, 1);
        }if (!this.state.regIrp){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regIrp:'Please indicate if the truck has IRP'}});
                }, 1);
        }if (!this.state.truckType && this.state.regIrp ==='no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, truckType:'Please indicate the vehicle configuration'}});
                }, 1);
        }if (!this.state.tripInfo && this.state.regIfta ==='no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, tripInfo:'Please indicate the type of trip'}});
                }, 1);
        }
        console.log(this.state)
        return valid;
    };

    handleStartOverBtnClick = () => {
        this.resetState();
    };


    handleProvinceChange = (e) => {
      this.setState({province: e.target.value === 'null'?null:e.target.value}, (e)=>this.performFormValidation(e));
    };

    handleFormSubmit = (e) => {
      e.preventDefault();
      if(this.performFormValidation()){
          this.setState({showMainForm:false});
          let cost = new Cost();
          permitCost = cost.getPermitCostByProvince(this.state.province, this.state);
          //console.log('Permit Cost is :' + JSON.stringify(permitCost));

          if(permitCost.action === 'results'){
              this.setState({showResultForm:true})
          }if(permitCost.action === 'noResults'){
              this.setState({showNoResultForm:true});
          }

      }else{
          //console.warn('form is not valid');
          this.setState({
              validationErrors:{
                  ...this.state.validationErrors, formValidationMessage:'Error! The form cannot be submitted. Please review your inputs and try again'
              }
          })
      }

    };

    handleFormChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            validationErrors:{...this.state.validationErrors, formValidationMessage:''}
        }, ()=>{
            console.log(this.state);
            switch (name) {
                case 'province':
                    if(value === 'null'){
                        this.setState({province:null, validationErrors:{...this.state.validationErrors, province:'Please select a province'}})
                    }
                    if(value !== null ){

                        this.setState({...this.state, province:value, validationErrors:{...this.state.validationErrors, province:''} });
                    }
                    break;

                //validation: Registered Weight
                case 'regWeight':
                    if(value !== null){
                        this.setState({validationErrors:{...this.state.validationErrors, regWeight:''}})
                    }
                    if(value === 'no'){
                        return this.setState({regWeight:'no',
                            validationErrors:{...this.state.validationErrors, regWeight:'If your truck registered weight is less than the above indicated weight, and has less than 3 axles, no temporary permits are required.'} })
                    }

                    if(this.state.regIfta === 'yes' && this.state.regIrp === 'yes' && this.state.permitType === 'regular'){
                        return this.setState({showResultForm:true, showMainForm:false, permitType:'regular'})
                    }
                    this.setState({regWeight:'yes'});
                    break;

                //validation: IFTA
                case 'regIfta':
                    if(value === 'no'){
                        this.setState({...this.state, regIfta:'no', showInputKms:true,
                            validationErrors:{...this.state.validationErrors, regIfta:''}
                        });
                    }else if(value === 'yes'){
                        this.setState({...this.state, regIfta:'yes', showInputKms:false,
                            validationErrors:{...this.state.validationErrors, regIfta:''}
                        });
                    }
                    break;
                //validation: IRP
                case 'regIrp':
                    if(value === 'no'){
                        return this.setState({...this.state, regIrp:'no', showInputVehicleConfig:true,
                            validationErrors:{...this.state.validationErrors, regIrp:''}
                        });
                    }
                    return this.setState({...this.state,regIrp:'yes', showInputVehicleConfig:false,
                        validationErrors:{...this.state.validationErrors, regIrp:''}
                    });

                //validation: Permit Type
                case 'permitType':
                    if(value !== null){
                        this.setState({validationErrors:{...this.state.validationErrors, permitType:''}})
                    }
                    if(value === 'regular'){
                        if(this.state.regWeight === 'yes' && this.state.regIfta === 'yes'
                            && this.state.regIrp === 'yes'){
                            this.setState({showResultForm:true, showMainForm:false, permitType:'regular'});
                        }

                        return this.setState({permitType:'regular'})
                    }
                    this.setState({permitType:'oversize'});
                    break;
                case 'amountKms':
                    // console.log(value);
                    if(value === ''){
                        this.setState({amountKms:'',
                            validationErrors:{...this.state.validationErrors, amountKms:'Please indicate the amount of kilometers to be driven'}});
                    }else{
                        this.setState({...this.state, amountKms:value===''?'':value,
                            validationErrors:{...this.state.validationErrors, amountKms:''}
                        });
                    }
                    break;
                case 'truckType':
                    this.setState({...this.state,truckType:value,
                        validationErrors:{...this.state.validationErrors, truckType:''}
                    });
                    break;
                case 'tripInfo':
                    if(value === 'roundTrip' || value === 'roundTripEmpty'){
                        let amountKms = this.state.amountKms * 2;
                        return this.setState({...this.state,tripInfo:value, amountKms:amountKms,
                            validationErrors:{...this.state.validationErrors, tripInfo:''}
                        });
                    }
                    return this.setState({...this.state,tripInfo:value,
                        validationErrors:{...this.state.validationErrors, tripInfo:''}
                    });
                default:
                    return this.state;
            }
        })

    };


    render() {
      let {showMainForm, showResultForm, showNoResultForm, loading, showInputKms, showInputVehicleConfig} = this.state;
      let optionItems = this.state.provinces.map((item)=><option selected={this.state.province === item.abbreviation } key={item.abbreviation} value={item.abbreviation}>{item.name}</option>);
      let permitTypeItems = permitTypeOptions.map((item) =>item.value);

      const {validationErrors} = this.state;

      if(showMainForm){
          return (
              <div className="App container">
                  <div className='form-wrapper container'>
                      <h4 className='text-primary text-center'>Temporary trip permit cost estimator</h4>
                      <hr/>
                      <br/>
                      <form className='form-horizontal alert alert-primary'>

                          <div className={`form-row form-group ${validationErrors.province.length > 0 && 'border-alert'}`}>

                              <div className="col-md-8 col-lg-6">
                                  <label htmlFor="province" className={`label-float ${validationErrors.province.length >0 &&'text-danger'}`}>Choose the province you need permit for?</label>
                                  <select id="province" name="province" className="form-control" onChange={(e)=>this.handleFormChange(e)}>
                                      <option>Click to choose a province</option>
                                      {optionItems}
                                  </select>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.province.length > 0 && <span className="text-danger">{validationErrors.province}</span>}
                              </div>

                          </div>

                          <div className={`form-row form-group ${validationErrors.permitType.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                <label className={`label-float ${validationErrors.permitType.length >0 &&'text-danger'}`}>What type of permit do you need?</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="permitType" id="permitOversize" disabled
                                         value="oversize" onClick={this.handleFormChange} defaultChecked={this.state.permitType === 'oversize'}/>
                                  <label className="form-check-label" htmlFor="permitOversize" >Oversize</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="permitType" id="permitRegular"
                                         value="regular" onClick={this.handleFormChange} defaultChecked={this.state.permitType === 'regular'}/>
                                  <label className="form-check-label" htmlFor="permitRegular">Regular</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.permitType.length > 0 && <span className="text-danger">{validationErrors.permitType}</span>}
                              </div>
                          </div>

                          <div className={`form-row form-group ${validationErrors.regWeight.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                <label className={`label-float ${validationErrors.regWeight.length >0 &&'text-danger'}`}>Is your truck registered weight equal or over 11 794 kgs / 26 000 lbs?</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regWeight" id="regWeightYes"
                                         value="yes" onClick={this.handleFormChange} defaultChecked={this.state.regWeight==="yes"}/>
                                  <label className="form-check-label" htmlFor="regWeightYes">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regWeight" id="regWeightNo"
                                         value="no" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regWeightNo">No</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.regWeight.length > 0 && <span className="text-danger">{validationErrors.regWeight}</span>}
                              </div>
                          </div>


                          <div
                              className={`form-row form-group ${validationErrors.regIfta.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                  <label
                                      className={`label-float ${validationErrors.regIfta.length > 0 && 'text-danger'}`}>Does
                                      the truck have IFTA (International Fuel Tax Agreement) sticker?</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIfta" id="iftaYes"
                                         value="yes" onClick={this.handleFormChange} defaultChecked={this.state.regIfta === "yes"}/>
                                  <label className="form-check-label" htmlFor="iftaYes">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIfta" id="iftaNo"
                                         value="no" onClick={this.handleFormChange} defaultChecked={this.state.regIfta === "no"}/>
                                  <label className="form-check-label" htmlFor="iftaNo">No</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.regIfta.length > 0 && <span className="text-danger">{validationErrors.regIfta}</span>}
                              </div>
                          </div>
                          {showInputKms?
                              <div>
                                  <div className={`form-row form-group ${validationErrors.amountKms.length > 0 && 'border-alert'}`}>

                                      <div className="col-md-12">
                                          <label htmlFor="kms" className={`label-float ${validationErrors.amountKms.length > 0 && 'text-danger'}`}>Amount of kilometers from entry point to destination</label>
                                      </div>
                                      <div className='col-md-4'>
                                          <input type="number" value={this.state.amountKms !== '' && this.state.amountKms } name="amountKms" id="kms" className="form-control" onChange={this.handleFormChange}/>
                                      </div>
                                      <div className="col-md-12">
                                          {validationErrors.amountKms.length > 0 && <span className="text-danger">{validationErrors.amountKms}</span>}
                                      </div>
                                  </div>
                                  <div className={`form-row form-group ${validationErrors.tripInfo.length > 0 && 'border-alert'}`}>
                                      <div className='col-md-12'>
                                          <label className={`label-float ${validationErrors.tripInfo.length > 0 && 'text-danger'}`}>Trip Information</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                          <input className="form-check-input" type="radio" name="tripInfo" id="oneWay"
                                                 value="oneWay" onClick={this.handleFormChange} defaultChecked={this.state.tripInfo === "oneWay"}/>
                                          <label className="form-check-label" htmlFor="oneWay">One Way Trip</label>
                                      </div>

                                      <div className="form-check form-check-inline">
                                          <input className="form-check-input" type="radio" name="tripInfo" id="roundTrip"
                                                 value="roundTrip" onClick={this.handleFormChange} defaultChecked={this.state.tripInfo === "roundTrip"}/>
                                          <label className="form-check-label" htmlFor="roundTrip">Round Trip</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                          <input className="form-check-input" type="radio" name="tripInfo" id="roundTripEmpty"
                                                 value="roundTripEmpty" onClick={this.handleFormChange} defaultChecked={this.state.tripInfo === "roundTripEmpty"}/>
                                          <label className="form-check-label" htmlFor="roundTripEmpty">Round Trip (Empty Return)</label>
                                      </div>
                                      <div className="col-md-12">
                                          {validationErrors.tripInfo.length > 0 && <span className="text-danger">{validationErrors.tripInfo}</span>}
                                      </div>
                                  </div>
                              </div>
                              : ''
                          }

                          <div className={`form-row form-group ${validationErrors.regIrp.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                  <label className={`label-float ${validationErrors.regIrp.length > 0 && 'text-danger'}`}>Does the truck have IRP (International Registered Plan)?</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIrp" id="irpYes"
                                         value="yes" onClick={this.handleFormChange} defaultChecked={this.state.regIrp === "yes"}/>
                                  <label className="form-check-label" htmlFor="irpYes">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIrp" id="irpNo"
                                         value="no" onClick={this.handleFormChange} defaultChecked={this.state.regIrp === "no"}/>
                                  <label className="form-check-label" htmlFor="irpNo">No</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.regIrp.length > 0 && <span className="text-danger">{validationErrors.regIrp}</span>}
                              </div>
                          </div>

                          {showInputVehicleConfig?

                              <div className={`form-row form-group ${validationErrors.truckType.length > 0 && 'border-alert'}`}>
                                  <div className='col-md-12'>
                                      <label className={`label-float ${validationErrors.truckType.length > 0 && 'text-danger'}`}> Vehicle configuration </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="truckType"
                                             id="unladenTruck"
                                             value="unladen_truck" onClick={this.handleFormChange} defaultChecked={this.state.truckType === "unladen_truck"}/>
                                      <label className="form-check-label" htmlFor="unladenTruck">Unladen Straight Truck or Truck/tractor with Trailer</label>
                                  </div>

                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="truckType" id="ladenTruck"
                                             value="laden_truck" onClick={this.handleFormChange} defaultChecked={this.state.truckType === "laden_truck"}/>
                                      <label className="form-check-label" htmlFor="ladenTruck">Laden Straight Truck</label>
                                  </div>

                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="truckType"
                                             id="ladenTruckTrailer"
                                             value="laden_truck_trailer" onClick={this.handleFormChange} defaultChecked={this.state.truckType === "laden_truck_trailer"}/>
                                      <label className="form-check-label" htmlFor="ladenTruckTrailer">Laden Truck/Tractor & Trailer
                                          Vehicle</label>
                                  </div>
                                  <div className="col-md-12">
                                      {validationErrors.truckType.length > 0 && <span className="text-danger">{validationErrors.truckType}</span>}
                                  </div>
                              </div>
                              :""
                          }

                          <br/>
                            <hr/>
                          <div className='footer-button text-center'>
                              <div className="col-md-12">
                                  {validationErrors.formValidationMessage.length > 0 && <span className="text-danger">{validationErrors.formValidationMessage}</span>}
                              </div>
                              <button type="submit" className={`btn btn-lg btn-primary ${validationErrors.formValidationMessage.length >0 &&"btn-danger"}`} onClick={this.handleFormSubmit}>Calculate Estimate</button>
                          </div>
                           </form>
                      <div className='footer-credit text-center row'>
                          <div className='text-lg-left text-sm-center col-sm-6'>
                              <span className='text-lg-left text-sm-center'><Link to={"/contact"}>Improve this tool</Link></span>
                          </div>

                          <div className='text-lg-right text-sm-center col-sm-6'>
                              <span className='text-lg-right text-sm-center col'>Created by <a target='_blank' href='https://www.truckingartist.com' rel='noopener noreferrer'>TruckingArtist</a></span>
                              <sup className='text-lg-right text-sm-center col'><em> version 1.0</em></sup>
                          </div>
                      </div>
                  </div>

              </div>
          );
      }else if(showResultForm){

        return(
            <div className='App'>

              <div className='container'>

                <div className='form-wrapper'>
                    <h3 className='text-center text-success'>Cost Breakdown</h3>
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                        <tr>
                            <td>IFTA (International Fuel Tax Agreement)</td>
                            <td>
                                CAD$ {permitCost.body.iftaPrice} <sup><i>({permitCost.body.amountKms?permitCost.tripDetails.amountKms+' kms':0} * {permitCost.body.iftaRate})</i></sup>
                            </td>
                        </tr>
                        <tr>
                            <td>IRP (International Registration Plan)</td>
                            <td>CAD$ {permitCost.body.irpPrice}</td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Estimated Total Price</td>
                            <td>CAD$ {permitCost.body.totalPrice} <sup>*</sup></td>
                        </tr>
                        <tr>
                            <td>Permit Validity</td>
                            <td><strong>{permitCost.body.permitDuration}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='alert alert-warning'>
                        <b>Note</b><br/>
                        <sup>*</sup>This total might slightly differ from your invoice. It doesn't include taxes, service and administration fee.
                    </div>
                    <div className="row mx-auto justify-content-center">
                        <button type="button" className="btn btn-go-back btn-lg btn-outline-info" onClick={this.handleStartOverBtnClick}>Go Back</button>
                    </div>

                  <div className='row row-cols-1'>
                    <div className='col'>
                        <br/>
                      <span className='footer-disclaimer'>Disclaimer:The information contained in these pages about single trip, oversize and overweight permit, is research information primarily for use by trucking company drivers, dispatchers and pilot car companies. While every effort is put into maintaining the accuracy of this information you must absolutely verify this information with the Province Permit office or a permit agency before commencing movement.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
        )

      }else if(showNoResultForm){
          return(<NoResultForm startOver={this.handleStartOverBtnClick} message={permitCost.body.message}/>);
      }else if(loading){
          return(
              <div className='App'>
                  <div className='container'>
                      <div className='form-wrapper'>
                  <CircleLoader color={'#cce5ff'} loading={this.state.loading}/>
                      </div>
                  </div>
              </div>
          );
      }else{
          return null;
      }
    }


}

//TODO: front-end validation
//TODO: Handle metrics such as miles and kms
//TODO: Display IRP price next to item choice, to help buyers make informed decision
// (i.e: Truck with load ($114)
//TODO: Display currency (CAD, USD)
//TODO: Front-end validation
//TODO: Have form updated in real-time. Results display on the right and input on the left side
//TODO: Help improve our tool
//TODO: Report issue tool
//TODO: Add information panel (i.e: MB required return trip permit)
//TODO: Add registered province
//TODO: Add multiple destinations
// TODO: Hook contact form to mail service
//TODO: Translation
//TODO: Implement localstorage
//TODO: Implemented unit testing




export default App;

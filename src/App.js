import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Provinces from './Provinces';
import Cost from './api/permit_cost/Cost';
import {CircleLoader} from 'react-spinners';
import NoResultForm from './NoResultForm';
import {Link} from 'react-router-dom';

{/* The following line can be included in your src/index.js or App.js file*/}


let permitCost = {};
    const permitTypeOptions = [{value:'oversize', label:'Oversize'}, {value:'regular', label:'Regular'}];

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {loading:false, showMainForm:true,
                      showResultForm:false, showInputKms:false,
                      showNoResultForm:false, showInputVehicleConfig:false,
                      regWeight:null, regIfta:null,
                      regIrp:null, amountKms:null,
                      truckType:null, permitType:null,
                      province:null, tripInfo:null,
                      provinces:Provinces,
                      validationErrors: {
                      regWeight:'',
                      regIfta:'',
                      regIrp:'', amountKms:'',
                      truckType:'', permitType:'',
                      province:'', tripInfo:'',
                      permitTypeSelectedOption:''
                      }
        }
    };

    resetState = () =>{
        this.setState({
            loading:false, showMainForm:true,
            showResultForm:false, showInputKms:false,
            regWeight:null, regIfta:null,
            regIrp:null, amountKms:null,
            truckType:null, permitType:null,
            province:null, tripInfo:null,
            permitTypeSelectedOption:null,
            provinces:Provinces
        })
    };

    // performFormValidation = () => {
    //     Object.entries(this.state.formComponents).forEach(([key, value]) => {
    //         value === null ? this.setState({
    //             validationErrors: {
    //                 ...this.state.validationErrors,
    //                 key: 'Please choose an option'
    //             }
    //         }) : '';
    //     });
    performFormValidation = () => {
        let valid = true;
        if(this.state.province === null){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, province:'Please choose a province'}});
            },1000)
        } if(this.state.permitType === null){
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, permitType:'Please choose a permit type'}});
            }, 1000)

        } if(this.state.regWeight === null){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regWeight:'Please choose your truck registered weight'}});
                }, 1000);

        }if(this.state.regWeight === 'no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regWeight:'If your truck registered weight is less than the indicated weight above, no temporary permits are required.'}});
            })

        }if (this.state.regIfta ===  null){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regIfta:'Please indicate if the truck has ifta'}});
                }, 1000);

        }if (this.state.amountKms ===  null && this.state.regIfta ==='no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, amountKms:'Please indicate the amount of kms'}});
                }, 1000);
        }if (this.state.regIrp ===  null){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, regIrp:'Please indicate if the truck has IRP'}});
                }, 1000);
        }if (this.state.truckType ===  null && this.state.regIrp ==='no'){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, truckType:'Please indicate the vehicle configuration'}});
                }, 1000);
        }if (this.state.tripInfo ===  null){
            valid = false;
            setTimeout(()=>{
                this.setState({validationErrors:{...this.state.validationErrors, tripInfo:'Please indicate the type of trip'}});
                }, 1000);
        }
        console.log(this.state.validationErrors);
        console.log(valid);
        return valid;
    };


    validateForm = (errors) => {
        let valid = false;

        Object.values(errors).forEach(
            (val) => val.length <= 0 && (valid = false)
        );
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
          console.log('form is valid');
          console.log(this.state);
          this.setState({showMainForm:false});
          let cost = new Cost();
          permitCost = cost.getPermitCostByProvince(this.state.province, this.state);
          console.log('Permit Cost is :' + JSON.stringify(permitCost));

          if(permitCost.action === 'results'){
              this.setState({showResultForm:true})
          }if(permitCost.action === 'noResults'){
              this.setState({showNoResultForm:true});
          }

      }else{
          console.log('form is not valid');
      }

    };

    handleFormChange = (event) => {
        const {name, value} = event.target;
        //let errors = this.state.errors;
        console.log(name);
        console.log(value);

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
                        validationErrors:{...this.state.validationErrors, regWeight:'If your truck registered weight is less than the indicated weight above, no temporary permits are required.'} })
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
                console.log(value);
                if(value === ''){
                    this.setState({amountKms:null,
                        validationErrors:{...this.state.validationErrors, amountKms:'Please indicate the amount of kilometers to be driven'}});
                }else{
                    this.setState({...this.state, amountKms:value===''?null:value,
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
                return this.setState({...this.state,tripInfo:value,
                    validationErrors:{...this.state.validationErrors, tripInfo:''}
                });
            default:
                return this.state;
        }

    };



    render() {
      let {showMainForm, showResultForm, showNoResultForm, loading, showInputKms, showInputVehicleConfig} = this.state;
      let optionItems = this.state.provinces.map((item) =><option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>);
      let permitTypeItems = permitTypeOptions.map((item) =>item.value);
      //console.log(permitTypeItems);
      const {validationErrors} = this.state;

      if(showMainForm) {

          return (
              <div className="App container">
                  <div className='form-wrapper container'>
                      <h4 className='text-primary text-center'>Temporary Trip Permit Cost Simulator</h4>
                      <hr/>
                      <br/>
                      <form className='form-horizontal alert alert-primary'>

                          {/*<div className="form-row form-group">*/}

                              {/*<div className="col-md-4">*/}
                                  {/*<label htmlFor="regProvince">Where is the truck registered?</label>*/}
                                  {/*<select id="inputState" className="form-control" onChange={this.handleProvinceChang}>*/}
                                      {/*<option value='null'>Click to choose a destination province</option>*/}
                                      {/*{optionItems}*/}
                                  {/*</select>*/}
                              {/*</div>*/}

                          {/*</div>*/}

                          <div className={`form-row form-group ${validationErrors.province.length > 0 && 'border-alert'}`}>

                              <div className="col-md-4">
                                  <label htmlFor="province" className={`label-float ${validationErrors.province.length >0 &&'text-danger'}`}>Where are you heading?</label>
                                  <select id="province" name="province" className="form-control" onChange={(e)=>this.handleFormChange(e)}>
                                      <option value={`${null}`}>Click to choose a destination province</option>
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
                                  <input className="form-check-input" type="radio" name="permitType" id="permitOversize"
                                         value="oversize" onClick={this.handleFormChange} defaultChecked={this.state.permitType === 'oversize'}/>
                                  <label className="form-check-label" htmlFor="permitType" >Oversize</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="permitType" id="permitRegular"
                                         value="regular" onClick={this.handleFormChange} defaultChecked={this.state.permitType === 'regular'}/>
                                  <label className="form-check-label" htmlFor="permitType">Regular</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.permitType.length > 0 && <span className="text-danger">{validationErrors.permitType}</span>}
                              </div>
                          </div>

                          <div className={`form-row form-group ${validationErrors.regWeight.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                <label className={`label-float ${validationErrors.regWeight.length >0 &&'text-danger'}`}>Is your truck registered weight equal or over 11797kgs / 80 000 lbs?</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regWeight" id="regWeightYes"
                                         value="yes" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regWeigh">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regWeight" id="regWeightNo"
                                         value="no" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regWeigh">No</label>
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
                                         value="yes" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regIfta">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIfta" id="iftaNo"
                                         value="no" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regIfta">No</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.regIfta.length > 0 && <span className="text-danger">{validationErrors.regIfta}</span>}
                              </div>
                          </div>
                          {showInputKms?
                              <div className={`form-row form-group ${validationErrors.amountKms.length > 0 && 'border-alert'}`}>

                                  <div className="col-md-12">
                                      <label htmlFor="amountKms" className={`label-float ${validationErrors.amountKms.length > 0 && 'text-danger'}`}>Amount of kilometers from entry point to destination</label>
                                  </div>
                                  <div className='col-md-4'>
                                      <input type="number" name="amountKms" id="kms" className="form-control" onChange={this.handleFormChange}/>
                                  </div>
                                  <div className="col-md-12">
                                      {validationErrors.amountKms.length > 0 && <span className="text-danger">{validationErrors.amountKms}</span>}
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
                                         value="yes" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regIrp">Yes</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="regIrp" id="irpNo"
                                         value="no" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="regIrp">No</label>
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
                                             value="unladen_truck" onClick={this.handleFormChange}/>
                                      <label className="form-check-label" htmlFor="">Unladen Straight Truck</label>
                                  </div>

                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="truckType" id="ladenTruck"
                                             value="laden_truck" onClick={this.handleFormChange}/>
                                      <label className="form-check-label" htmlFor="">Laden Straight Truck</label>
                                  </div>

                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="truckType"
                                             id="ladenTruckTrailer"
                                             value="laden_truck_trailer" onClick={this.handleFormChange}/>
                                      <label className="form-check-label" htmlFor="">Laden Truck/Tractor & Trailer
                                          Vehicle</label>
                                  </div>
                                  <div className="col-md-12">
                                      {validationErrors.truckType.length > 0 && <span className="text-danger">{validationErrors.truckType}</span>}
                                  </div>
                              </div>
                              :""
                          }
                          <div className={`form-row form-group ${validationErrors.tripInfo.length > 0 && 'border-alert'}`}>
                              <div className='col-md-12'>
                                  <label className={`label-float ${validationErrors.tripInfo.length > 0 && 'text-danger'}`}>Trip Information</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="tripInfo" id="oneWay"
                                         value="oneWay" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="tripInfo">One Way Trip</label>
                              </div>

                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="tripInfo" id="roundTrip"
                                         value="roundTrip" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="tripInfo">Round Trip</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="tripInfo" id="roundTripEmpty"
                                         value="roundTripEmpty" onClick={this.handleFormChange}/>
                                  <label className="form-check-label" htmlFor="tripInfo">Round Trip (Empty Return)</label>
                              </div>
                              <div className="col-md-12">
                                  {validationErrors.tripInfo.length > 0 && <span className="text-danger">{validationErrors.tripInfo}</span>}
                              </div>
                          </div>

                          <br/>
                            <hr/>
                          <div className='footer-button text-center'>
                              <button type="submit" className="btn btn-lg btn-primary" onClick={this.handleFormSubmit}>Get Estimate</button>
                          </div>
                           </form>
                      <div className='footer-credit row'>
                          <div className='text-left col-sm-6'>
                              <span className='text-left'><Link to={"/contact"}>Improve this tool</Link></span>
                          </div>

                          <div className='text-right col-sm-6'>
                              <span className='text-right'>Created by <a target='_blank' href='https://www.truckingartist.com' rel='noopener noreferrer'>TruckingArtist</a></span>
                              <sup className='text-right'><em> version 1.0</em></sup>
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
                  <div className='form-success-wrapper'>

                    <div className='container'>
                        <h3 className='text-center text-success'>Cost Breakdown</h3>

                      <br/>
                      <br/>
                        <div className='row row-cols-3'>
                            <div className='col'>
                                <div className='estimate-row'>
                                    IFTA -------------------------
                                </div>
                                <div className='estimate-row'>
                                    IRP -------------------------
                                </div>
                                <div className='estimate-row'>
                                    TOTAL
                                </div>
                                <div className='estimate-row'>Permit validity : <strong>{permitCost.body.permitDuration}</strong></div>
                                <div className='alert alert-warning'>
                                  <b>Note</b><br/>
                                  <sup>*</sup>This total might slightly differ from your invoice. It doesn't include taxes, service and administration fee.
                                </div>
                                <div className=''>
                                    <button type="button" className="btn btn-lg btn-outline-info" onClick={this.handleStartOverBtnClick}>Go Back</button>
                                </div>
                            </div>

                            <div className='col'>
                                <div className='estimate-row'>
                                    CAD$ {permitCost.body.iftaPrice} <sup><i>({permitCost.tripDetails.amountKms} * {permitCost.body.iftaRate})</i></sup>
                                </div>
                                <div className='estimate-row'>
                                    CAD$ {permitCost.body.irpPrice}
                                </div>
                                <div className='estimate-row estimate-total'>
                                    CAD$ {permitCost.body.totalPrice} <sup>*</sup>
                                </div>
                            </div>

                           <div className='col'>
                               <div className='col-sm-12'>
                                   <div className='alert alert-info'>
                                       <b>Trip Details</b>
                                       <p>
                                         Destination: {this.state.province}
                                         <br/>
                                         Permit Type: {this.state.permitType}
                                           <br/>
                                         IFTA: {this.state.regIfta}
                                           <br/>
                                         IRP: {this.state.regIrp}
                                           <br/>
                                         Vehicle Configuration: {this.state.truckType}
                                         <br/>
                                         <br/>
                                       </p>
                                       {/*<div className=''>*/}
                                           {/*<button type="button" className="btn btn-lg btn-outline-info" onClick={this.handleStartOverBtnClick}>Email this estimate</button>*/}
                                       {/*</div>*/}
                                   </div>
                                   <span className='update-information-date'>Cost formula last updated: December 28th 2019</span>
                               </div>
                           </div>
                        </div>
                    </div>

                  </div>
                  <div className='row row-cols-1'>
                    <div className='col'>
                        <div className='form-wrapper text-center'>
                            <button type="button" className="btn btn-lg btn-success" onClick={this.handleStartOverBtnClick}>ORDER NOW</button>
                        </div>
                        <br/>
                      <span className='footer-disclaimer'>Disclaimer:The information contained in these pages about single trip, oversize and overweight permit, is research information primarily for use by trucking company drivers, dispatchers and pilot car companies. While every effort is put into maintaining the accuracy of this information you must absolutely verify this information with the Province DOT Permits office or a permit agency before commencing movement.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
        )

      }else if(showNoResultForm){
          return(<NoResultForm message={permitCost.body.message}/>);
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

//result Type
//IFTA_IRP_TRUCK : Good news, you don't need temporary permit to r
//getPermitCost(province)
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
//TODO: Add multipe destinations
//TODO: Log queries to DB
//TODO: Hook contact form to mail service
//TODO: Translation



export default App;

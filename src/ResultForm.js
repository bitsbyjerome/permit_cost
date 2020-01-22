import React from "react";

const resultForm = (permitCost)=> <div className='App'>

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
                            <div className='alert alert-warning'>
                                <b>Note</b><br/>
                                <sup>*</sup>This total price might slightly differs from your invoice. It doesn't include taxes, service and administration fee.
                            </div>
                            <div className=''>
                                <button type="button" className="btn btn-lg btn-outline-info" onClick={this.handleStartOverBtnClick}>Go Back</button>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='estimate-row'>
                                CAD$ {permitCost.body.iftaPrice} <sup><i>(Kms * 0.089)</i></sup>
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
                                        Destination: {permitCost.body.truckType}
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
                                    <div className=''>
                                        <button type="button" className="btn btn-lg btn-outline-info" onClick={this.handleStartOverBtnClick}>Email this estimate</button>
                                    </div>
                                </div>
                                <span className='update-information-date'>Last Updated: December 28th 2019</span>
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
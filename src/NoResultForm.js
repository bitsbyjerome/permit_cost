import React from "react";
const noResultForm = (props) =>

    <div className='App'>

        <div className='container'>
            <div className='form-wrapper'>
                <div className='form-success-wrapper'>

                    <div className='container'>
                        <h3 className='text-center text-success'>Information</h3>

                        <br/>
                        <br/>
                        <div className='row row-cols-12'>
                            <div className='alert alert-info'>
                                <span>{props.message}</span>
                                <div className="text-center">
                                    <button type="button" className="btn btn-lg btn-outline-info" onClick={props.startOver} >Go back</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/*<div className='row row-cols-1'>*/}
                    {/*<div className='col'>*/}
                        {/*<div className='form-wrapper text-center'>*/}
                            {/*<button type="button" className="btn btn-lg btn-success">CONTACT US</button>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<span className='footer-disclaimer'>Disclaimer:The information contained in these pages about single trip, oversize and overweight permit, is research information primarily for use by trucking company drivers, dispatchers and pilot car companies. While every effort is put into maintaining the accuracy of this information you must absolutely verify this information with the Province DOT Permits office or a permit agency before commencing movement.*/}
                      {/*</span>*/}
                    {/*</div>*/}
                {/*</div>*/}



            </div>
        </div>

    </div>;

export default noResultForm;
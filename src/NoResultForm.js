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
                        <div className='col'>
                            <div className='alert alert-info text-center'>
                                <span>{props.message}</span>
                                <div className="text-center">
                                    <button type="button" className="btn btn-lg btn-outline-info" onClick={props.startOver} >Go back</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>;

export default noResultForm;
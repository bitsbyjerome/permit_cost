import React, {Component} from 'react';

class Contact extends Component {


    render(){
        return (
            <div className="App container">
                <div className='form-wrapper container'>
                    <hr/>
                    <br/>
                    <h4 className='text-primary text-center'>Use the form below to contact us or submit suggestions</h4>
                    <form className='form-horizontal alert alert-primary'>

                        {/*<div className="form-row form-group">*/}

                        {/*<div className="col-md-4">*/}
                        {/*<label htmlFor="regProvince">Where is the truck registered?</label>*/}
                        {/*<select id="inputState" className="form-control" onChange={this.handleProvinceClick}>*/}
                        {/*<option value='null'>Click to choose a destination province</option>*/}
                        {/*</select>*/}
                        {/*</div>*/}

                        {/*</div>*/}

                        {/*<div className="form-row form-group">*/}

                            {/*<div className="col-md-4">*/}
                                {/*<label htmlFor="inputState" className='label-float'>Where are you heading?</label>*/}
                                {/*<select id="inputState" className="form-control" onChange={this.handleProvinceClick}>*/}
                                    {/*<option value='null'>Click to choose a destination province</option>*/}

                                {/*</select>*/}
                            {/*</div>*/}

                        {/*</div>*/}


                        <div className="form-row form-group">

                            <div className="col-md-12">
                                <label htmlFor="inputState" className='label-float'>Name</label>
                                <input type="text" placeholder="Enter your name here" name="name" id="name" className="form-control form-control-lg" onChange={this.formValidation}/>
                            </div>

                        </div>
                        <div className="form-row form-group">

                            <div className="col-md-12">
                                <label htmlFor="inputState" className='label-float'>Email</label>
                                <input type="email" placeholder="Enter your email here" name="email" id="email" className="form-control form-control-lg" onChange={this.formValidation}/>
                            </div>

                        </div>

                        <div className="form-row form-group">

                            <div className="col-md-12">
                                <label htmlFor="" className='label-float'>Message</label>
                                <textarea className="form-control form-control-lg" rows={5}></textarea>
                            </div>

                        </div>


                        <br/>
                        <hr/>
                        <div className='footer-button text-center'>
                            <button type="submit" className="btn btn-lg btn-primary" onClick={this.handleFormSubmit}>Send Message</button>
                        </div>
                    </form>
                    <div>
                        <a href='/'>Go back</a>
                    </div>
                </div>

            </div>

        );
    }

}

export default Contact;
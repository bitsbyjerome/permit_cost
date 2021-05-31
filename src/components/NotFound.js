import React, {Component} from "react";
import {Link} from "react-router-dom";

class NotFound extends Component{

    render() {
        return(
            <div>
                <h1>Page not found</h1>
                <Link to={'/'}>Go back to permit calculator</Link>
            </div>
        )
    }
}

export default NotFound;
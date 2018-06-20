import React, {Component} from 'react';


import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formInstance: 'ff'
        };
        this.fieldGroup = this.fieldGroup.bind(this);
    }

    fieldGroup({id, label, help, ...props}) {
        return

        const formInstance = (
            <form>
                <input type="email" label="Email address" placeholder="Email"/>
                <input label="Password" type="password"/>
                <Button type="submit">Submit</Button>
            </form>
        );
    }

    render() {
        return (<div>
            <div className="overlay">
                <form className="loginform">
                    <FormControl type="email" label="Email address" placeholder="Email"/>
                    <FormControl label="Password" type="password" placeholder="Password"/>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>)
    }


}
export default LoginForm;


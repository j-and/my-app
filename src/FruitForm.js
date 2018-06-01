import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class FruitForm extends Component {

        createRegister (e) {
            e.preventDefault();
            alert('added');
             var register = "ddd";//this.refs.registerName.value;
           // if(typeof register === 'string' && fruit.length > 0) {
            this.props.addRegister(register);
            this.refs.fruitForm.reset();
           // }
        }
        render () {
            return(
                <form ref="fruitForm" onSubmit={this.createRegister}>
                    <div >
                        <label for="fruitItem">
                            Fruit Name
                            <input type="text" id="fruitItem" placeholder="e.x.lemmon" name="registerName"  />
                        </label>
                    </div>
                    <button type="submit" >Add Fruit</button>
                </form>
            )
        }
    }//)
//}

export default FruitForm;

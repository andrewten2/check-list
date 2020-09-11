import React,{Component} from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {

    state = {
        label: '',
        datas : false
    }

    onLabelChange =(e) => {               
        this.setState({
        label : e.target.value
        });
    }

    onSubmit =(e) => {
        e.preventDefault();      
        if (this.state.label) {
            this.props.onAdd(this.state.label); 
        } else {
            this.setState({datas: !this.state.datas});
        }
        this.setState({
            label: ''
        });
    }


    render () {

        const clazz = this.state.datas ? 'alert alert-warning mt-3' : 'no-opacity';

        return (
            <div>
                <form className="bottom-panel d-flex" onSubmit = {this.onSubmit}>
                    <input
                    type="text"
                    placeholder="о чем вы думаете?"
                    className="form-control new-post-label"
                    value={this.state.label}
                    onChange={this.onLabelChange} 
                    />
                    <button 
                        type = "submit"
                        className = "btn btn-outline-secondary"                    
                    >Добавить</button>                
                </form>
                <div className={clazz} role="alert">
                Вы не ввели данные в поле!
                </div>
            </div>
        )
    }
    
}


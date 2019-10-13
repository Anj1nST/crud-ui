import React, { Component } from 'react'
import '../styles/addMovie.css'

class AddMovie extends Component {

    render() {
        return (
            <div>
                <form>
                    <p>{this.props.name}</p><input type='text' value={this.props.data} onChange={this.props.onChange.bind(this)} />
                </form>
            </div>
        )
    }
}

export default AddMovie;
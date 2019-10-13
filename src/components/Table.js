import React, { Component } from 'react';
import '../styles/table.css';

class Table extends Component {

    // handleChangeData = () => {
    //     let newBook = { '_id': Math.round(Math.random() * 1000), circulation: this.props.newBookCirculation, cost: this.props.newBookCost };
    //     console.log(newBook['_id']);
    //     this.setState({ books: [...this.state.books, newBook] })
    // }

    render() {
        return (
            <div>
                <div className='addingDataButtons'>
                    <button type='button' onClick={this.props.getDataFromBackend}>Get data from the backend</button>
                    <button type='button' onClick={this.props.getBookFromInput}>Get the book from input</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cost</th>
                            <th>Circulation</th>
                            <th>Author</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map(book => (
                                <tr className='tableRow' key={book['_id']} id={book['_id']}>
                                    <td><input disabled='true' value={book['_id']} /></td>
                                    <td><input disabled='true' onChange={this.props.editDataCost.bind(this)} value={book['cost']} /></td>
                                    <td><input disabled='true' onChange={this.props.editDataCirculation.bind(this)} value={book['circulation']} /></td>
                                    <td><input disabled='true' onChange={this.props.editDataAuthor.bind(this)} value={book['author']} /></td>
                                    <td><input disabled='true' onChange={this.props.editDataName.bind(this)} value={book['name']} /></td>
                                    <button className="rowMenu" onClick={this.props.editData}>Edit</button>
                                    <button className="rowMenu" onClick={this.props.deleteBook}>Delete row</button>
                                    <button className="rowMenu" onClick={this.props.deleteDataFromBackend}>Delete from backend</button>
                                    <button className="rowMenu" onClick={this.props.putDataToBackend}>Put to backend</button>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Table;
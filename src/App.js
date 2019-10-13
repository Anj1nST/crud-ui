import React, { Component } from 'react';
import axios from 'axios';

import Table from './components/Table';
import AddMovie from './components/AddMovie';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {
        books: [],
      },
      bookAdding: {
        circulation: '',
        cost: '',
      },
      backEndData: []
    }
  }

  deleteBook = (e) => {
    let newBooks = this.state.table.books;
    let deletingBook = '';
    for (let i = 0; i < this.state.table.books.length; i++) {
      if (e.target.parentNode.id === this.state.table.books[i]['_id'].toString()) {
        deletingBook = this.state.table.books[i]
      }
    }
    newBooks.splice(newBooks.indexOf(deletingBook), 1);
    this.setState({ table: { books: newBooks } });
  }

  addBookCirculation = (e) => {
    const circulation = e.target.value;
    this.setState({ bookAdding: { ...this.state.bookAdding, circulation: circulation } });
  }
  addBookCost = (e) => {
    const cost = e.target.value;
    this.setState({ bookAdding: { ...this.state.bookAdding, cost: cost } });
  }
  addBookAuthor = (e) => {
    const author = e.target.value;
    this.setState({ bookAdding: { ...this.state.bookAdding, author: author } });
  }
  addBookName = (e) => {
    const name = e.target.value;
    this.setState({ bookAdding: { ...this.state.bookAdding, name: name } });
  }

  getBookFromInput = () => {
    let newBook = { '_id': Math.round(Math.random() * 1000), author: this.state.bookAdding.author, name: this.state.bookAdding.name, circulation: this.state.bookAdding.circulation, cost: this.state.bookAdding.cost };
    this.setState({ table: { books: [newBook, ...this.state.table.books] } })

  }

  /*
  Data is presentated in this format:
  backEndData: { id: data['_id'], author: data.data.author, circulation: data.data.circulation, cost: data.data.cost, name: data.name.cost }
  */
  getDataFromBackend = () => {
    this.setState({ table: { books: [] } })
    axios.get('http://178.128.196.163:3000/api/records/')
      .then(res => res.data)
      .then(data => {
        this.setState({
          backEndData: data,
        })
      })
      .then(() => {
        for (let elem of this.state.backEndData) {
          const newBook = { '_id': elem['_id'], 'circulation': elem.data['circulation'], 'cost': elem.data['cost'], 'author': elem.data['author'], 'name': elem.data['name'] }
          this.setState({ table: { books: [newBook, ...this.state.table.books] } })
        }
      });
  };

  putDataToBackend = (e) => {
    const id = e.target.parentNode.id;
    const bookId = this.state.table.books.findIndex(book => book['_id'].toString() === id);
    axios.put('http://178.128.196.163:3000/api/records', {
      data: {
        name: this.state.table.books[bookId].name, author: this.state.table.books[bookId].author,
        circulation: this.state.table.books[bookId].circulation, cost: this.state.table.books[bookId].cost
      }
    })
      .then(response => console.log(response));


    e.target.parentNode.style.background = 'white';
  }

  deleteDataFromBackend = (e) => {
    const id = e.target.parentNode.id;
    const url = 'http://178.128.196.163:3000/api/records/' + id
    axios.delete(url)
      .then(result => console.log(result))
    console.log('Record with id ' + id + ' is deleted.');
    e.target.parentNode.style.background = '#222';
  }

  editData = (e) => {
    for (let elem of e.target.parentNode.querySelectorAll('td')) {
      elem.querySelector('input').disabled = false;
    }
    if (e.target.innerText === 'Edit')
      e.target.innerText = 'Save'
    else {
      e.target.innerText = 'Edit';
      for (let elem of e.target.parentNode.querySelectorAll('td')) {
        elem.querySelector('input').disabled = true;
      }
      const id = e.target.parentNode.id;
      const url = 'http://178.128.196.163:3000/api/records/' + id;
      const bookId = this.state.table.books.findIndex(book => book['_id'] === id.toString())
      // const newName = this.state.table.books[bookId].name;
      axios.post(url, {
        data: {
          name: this.state.table.books[bookId].name,
          author: this.state.table.books[bookId].author,
          circulation: this.state.table.books[bookId].circulation, cost: this.state.table.books[bookId].cost
        }
      })
        .then(response => {
          console.log(this.state)
          console.log(response)
        })
    }
  };

  editDataCirculation = (e) => {
    const id = e.target.parentNode.parentNode.id;
    const bookId = this.state.table.books.findIndex(book => book['_id'] === id);
    let newBooks = this.state.table.books;
    newBooks[bookId].circulation = e.target.value;
    this.setState({ table: { books: newBooks } });
  }
  editDataCost = (e) => {
    const id = e.target.parentNode.parentNode.id;
    const bookId = this.state.table.books.findIndex(book => book['_id'] === id);
    let newBooks = this.state.table.books;
    newBooks[bookId].cost = e.target.value;
    this.setState({ table: { books: newBooks } });
  }
  editDataAuthor = (e) => {
    const id = e.target.parentNode.parentNode.id;
    const bookId = this.state.table.books.findIndex(book => book['_id'] === id);
    let newBooks = this.state.table.books;
    newBooks[bookId].author = e.target.value;
    this.setState({ table: { books: newBooks } });
  }
  editDataName = (e) => {
    const id = e.target.parentNode.parentNode.id;
    const bookId = this.state.table.books.findIndex(book => book['_id'] === id);
    let newBooks = this.state.table.books;
    newBooks[bookId].name = e.target.value;
    this.setState({ table: { books: newBooks } });
  }

  render() {
    return (
      <div className="App" >
        <div className="App-header">
          <h2>CRUD UI</h2>
        </div>
        < AddMovie name='Author' data={this.state.bookAdding.author} onChange={this.addBookAuthor} />
        < AddMovie name='Name' data={this.state.bookAdding.name} onChange={this.addBookName} />
        < AddMovie name='Circulation' data={this.state.bookAdding.circulation} onChange={this.addBookCirculation} />
        < AddMovie name='Cost' data={this.state.bookAdding.cost} onChange={this.addBookCost} />
        < Table data={this.state.table.books} getBookFromInput={this.getBookFromInput} getDataFromBackend={this.getDataFromBackend}
          deleteBook={this.deleteBook} deleteDataFromBackend={this.deleteDataFromBackend} putDataToBackend={this.putDataToBackend} editData={this.editData}
          editDataCirculation={this.editDataCirculation} editDataCost={this.editDataCost} editDataAuthor={this.editDataAuthor} editDataName={this.editDataName} />
      </div>
    );
  }
}

export default App;

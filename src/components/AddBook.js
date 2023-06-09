import { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { compose } from "lodash/fp";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorid: "",
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  render() {
    return (
      <form action="" id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label htmlFor="">Book name</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="">Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="">Author:</label>
          <select onChange={(e) => this.setState({ authorid: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

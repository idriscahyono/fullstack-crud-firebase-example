import React from "react";
import Axios from "axios";

export default class Edit extends React.Component {
  data = this.props.location.state.data;
  state = {
    id: this.data.Id,
    title: this.data.Title,
    description: this.data.Description,
    author: this.data.Author,
  };
  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
    });
  };
  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value,
    });
  };
  handleAuthorChange = event => {
    this.setState({
      author: event.target.value,
    });
  };

  handleSubmitClick = (id) => {
    const { title, description, author } = this.state;
    Axios.put(`http://localhost:3000/${id}`, {
      title,
      description,
      author,
    })
      .then(() => {
        alert("Berhasil Edit Data");
        this.props.history.push("/list");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description, author } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">ADD BOARD</h3>
          </div>
          <div class="panel-body">
            <form>
              <div class="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  value={title}
                  onChange={this.handleTitleChange}
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea
                  class="form-control"
                  name="description"
                  onChange={this.handleDescriptionChange}
                  placeholder="Description"
                  cols="80"
                  rows="3"
                >
                  {description}
                </textArea>
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input
                  type="text"
                  class="form-control"
                  name="author"
                  value={author}
                  onChange={this.handleAuthorChange}
                  placeholder="Author"
                />
              </div>
              <button
                onClick={() => this.handleSubmitClick(this.state.id)}
                class="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


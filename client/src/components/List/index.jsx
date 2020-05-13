import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Axios from "axios";

export default class List extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("http://localhost:3000").then((res) => {
      let words = res.data;
      let newState = [];
      for (let word in words) {
        newState.push({
          Id: word,
          Author: words[word].Author,
          Description: words[word].Description,
          Title: words[word].Title,
        });
      }
      this.setState({
        data: newState,
      });
    });
  };

  deleteData = (id) => {
    Axios.delete(`http://localhost:3000/${id}`).then((res) => {
      alert("Berhasil Delete Data");
      this.getData();
    });
  };

  handleButtonDeleteClick = (id) => {
    this.deleteData(id);
  };

  handleUpdateClick = (data) => {
    this.props.history.push("/edit", { data });
  };

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">LIST TABEL</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/" class="btn btn-primary">
                Tambah Tabel
              </Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th>Pembuat</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data) => (
                  <tr>
                    <td>
                      <Link to={`/show/${data.Id}`}>{data.Title}</Link>
                    </td>
                    <td>{data.Description}</td>
                    <td>{data.Author}</td>
                    <td>
                      <Link to={`/edit/${data.Id}`} class="btn btn-success">Edit</Link>&nbsp;
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleButtonDeleteClick(data.Id)}
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

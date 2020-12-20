import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_name: "",
      description: "",
      blogList: [],
      commentsList: [],
      id: "",
    };
  }
  componentDidMount = async () => {
    this.getLeadList();
  };

  // get lead list
  getLeadList = async () => {
    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    const blogListData = await instance.get(`blogList`);
    console.log("data", blogListData.data);
    if (blogListData.data.success) {
      this.setState({
        blogList: blogListData.data.data,
      });
    }
  };

  addLead = async (e) => {
    e.preventDefault();
    const body = {
      blog_name: this.state.blog_name,
      description: this.state.description,
    };

    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    console.log("body", body);

    const res = await instance.post(`/addBlog`, body);

    // const res = await apiService.post("bug", data);
    if (res.data.success) {
      this.setState({
        blog_name: "",
        description: "",
        comments: "",
      });
      await this.getLeadList();
    } else {
    }
  };

  getComments = async (id) => {
    console.log("here", id);
    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    // let id = this.state.id;
    const blogListData = await instance.get(`comments/${id}`);
    console.log("data", blogListData.data);
    if (blogListData.data.success) {
      this.setState({
        commentsList: blogListData.data.data,
      });
    }
    this.getLeadList();
  };

  updateMarkLead = async () => {
    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    let id = this.state.id;

    const res = await instance.post(`comments`, {
      comments: this.state.comments,
      blog_id: id,
    });
    console.log("res", res);
    this.getLeadList();
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                My Blog
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#">
                    <span className="glyphicon glyphicon-log-in"></span> Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h5>Blog List</h5>
              <span
                style={{ float: "right", position: "relative", top: "-25px" }}
              >
                <a
                  href="#"
                  className="add_lead_btn"
                  data-toggle="modal"
                  data-target="#addLead"
                >
                  Add Blog
                </a>
              </span>
            </div>
            <div className="panel-body">
              <div className="row">
                {this.state.blogList.map((item, i) => (
                  <div className="col-md-3">
                    <div class="panel-group">
                      <div class="panel panel-primary">
                        <div class="panel-heading">{item.blog_name}</div>
                        <div class="panel-body">{item.description}</div>
                        <div class="panel-footer">
                          <i className="fa fa-like">Like</i>
                          <i
                            className="fa fa-like"
                            onClick={() => this.setState({ id: item.id })}
                            data-toggle="modal"
                            data-target="#myModal"
                            style={{ marginLeft: "10px" }}
                          >
                            Comment
                          </i>
                          <i
                            className="fa fa-like"
                            onClick={() => this.getComments(item.id)}
                            data-toggle="modal"
                            data-target="#myModal2"
                            style={{ marginLeft: "10px" }}
                          >
                            Show Comment
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-3">
          <footer className="container-fluid text-center">
            <p>Footer Text</p>
          </footer>
          {/* update */}
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog update_lead_form">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Comments</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group">
                        <textarea
                          rows="5"
                          cols="50"
                          name="communication"
                          placeholder="communication"
                          value={this.state.comments}
                          onChange={(e) =>
                            this.setState({ comments: e.target.value })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default delete_lead_form"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={this.updateMarkLead}
                    type="button"
                    className="btn btn-success update_lead_btn"
                    data-dismiss="modal"
                  >
                    add Comments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* delete */}
          <div className="modal fade" id="myModal2" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content delete_lead_form">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title text-center">Comments List</h4>
                </div>
                <div className="card-body">
                  {this.state.commentsList.map((item, i) => (
                    <li
                      style={{
                        listStyle: "circle",
                        padding: "10px",
                        margin: "5px",
                      }}
                    >
                      {item.comments}
                    </li>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default delete_lead_form"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* add lead */}

          <div className="modal fade" id="addLead" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Add Blog</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <form className="add_lead_form">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="email">Blog Name:</label>
                          <input
                            type="text"
                            class="form-control"
                            name="blog_name"
                            id="blog_name"
                            value={this.state.blog_name}
                            onChange={(e) =>
                              this.setState({ blog_name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="email">Description:</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            value={this.state.description}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={this.addLead}
                    type="button"
                    className="btn btn-success add_lead_btn"
                    data-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

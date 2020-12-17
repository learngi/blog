import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      location_type: "",
      location_string: "",
      communication: "",
      leadList: [],
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

    const leadListData = await instance.get(`api/leads/?location_string=India`);
    console.log("data", leadListData.data);
    this.setState({
      leadList: leadListData.data,
    });
  };

  addLead = async (e) => {
    e.preventDefault();
    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      mobile: this.state.mobile,
      location_type: this.state.location_type,
      location_string: this.state.location_string,
    };

    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    console.log("body", body);

    const res = await instance.post(`api/leads/`, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      mobile: this.state.mobile,
      location_type: this.state.location_type,
      location_string: this.state.location_string,
    });

    // const res = await apiService.post("bug", data);
    if (res.data.success) {
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        location_type: "",
        location_string: "",
      });
      await this.getLeadList();
    } else {
    }
  };

  deleteLead = async () => {
    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    let id = this.state.id;
    const res = await instance.delete(`api/leads/${id}`);
    console.log("res delete", res);
    this.getLeadList();
  };
  updateMarkLead = async () => {
    const instance = await axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    let id = this.state.id;
    const res = await instance.put(`api/mark_lead/${id}`, {
      communication: this.state.communication,
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
                Lead Task
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
              <h5>Lead List</h5>
              <span
                style={{ float: "right", position: "relative", top: "-25px" }}
              >
                <a
                  href="#"
                  className="add_lead_btn"
                  data-toggle="modal"
                  data-target="#addLead"
                >
                  Add Lead
                </a>
              </span>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-hover leads_table table-responsive">
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Location Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.leadList.map((item, i) => (
                        <tr key={i}>
                          <td>1</td>
                          <td>{item.first_name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.location_type}</td>
                          <td>{item.status}</td>
                          <td>
                            <button
                              onClick={() => this.setState({ id: item.id })}
                              data-toggle="modal"
                              data-target="#myModal"
                              className="btn btn-primary btn-sm"
                            >
                              Mark Update
                            </button>
                            <button
                              onClick={() => this.setState({ id: item.id })}
                              style={{ marginLeft: "10px" }}
                              data-toggle="modal"
                              data-target="#myModal2"
                              className="btn btn-primary btn-sm"
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
                  <h4 className="modal-title">Mark Communication</h4>
                </div>
                <div className="modal-body">
                  <div class="form-group">
                    <textarea
                      rows="5"
                      cols="50"
                      name="communication"
                      placeholder="communication"
                    ></textarea>
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
                    save
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
                  <h4 className="modal-title text-center">
                    Do you wish to delete this lead
                  </h4>
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
                    onClick={this.deleteLead}
                    type="button"
                    className="btn btn-danger delete_lead_btn"
                    data-dismiss="modal"
                  >
                    Delete
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
                  <h4 className="modal-title">Add Lead</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <form className="add_lead_form">
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="email">First Name:</label>
                          <input
                            type="text"
                            class="form-control"
                            name="first_name"
                            id="first_name"
                            value={this.state.first_name}
                            onChange={(e) =>
                              this.setState({ first_name: e.target.value })
                            }
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Email Address:</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Location Type:</label>
                          <select
                            className="form-control"
                            name="location_type"
                            value={this.state.location_type}
                            onChange={(e) =>
                              this.setState({ location_type: e.target.value })
                            }
                          >
                            <option value="">Select Location Type</option>
                            <option value="city">City</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="form-group">
                          <label for="email">Last Name:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="last_name"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={(e) =>
                              this.setState({ last_name: e.target.value })
                            }
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Mobile:</label>
                          <input
                            type="tel"
                            class="form-control"
                            id="mobile"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={(e) =>
                              this.setState({ mobile: e.target.value })
                            }
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Location String:</label>
                          <input
                            type="text"
                            name="location_string"
                            class="form-control"
                            value={this.state.location_string}
                            onChange={(e) =>
                              this.setState({ location_string: e.target.value })
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

import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  ButtonToolbar
} from "react-bootstrap";
import SimpleModal from "components/Modal/SimpleModal.jsx";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ProductReleaseServiceForm from "components/Forms/ProductReleaseServiceForm.jsx";
import queryString from "query-string";
import {
  saveProductVersionService,
  retrieveProductVersionServices
} from "client-api/product-apicall";

class ProductReleaseService extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(props.location.search);
    this.state = {
      productVersionId: values.productVersionId,
      item: {},
      showInsertUpdateForm: false,
      list: [],
      header: "",
      showConfirmDeleteModal: false,
      itemToDelete: {},
      inputFilter: "",
      editMode: false,
      editItem: {},
      ProductName: "",
      Version: ""
    };
  }

  componentDidMount() {
    retrieveProductVersionServices(this.state.productVersionId, this);
  }

  handleConfirmDeleteModalClose() {
    this.setState({ showConfirmDeleteModal: false, itemToDelete: {} });
  }

  handleNewClick(e) {
    this.setState({ showInsertUpdateForm: true });
  }

  onChangeFilterHandler(e) {
    this.setState({
      inputFilter: e.target.value
    });
  }

  handleConfirmDelete() {
    //deleteSolutionChart(this.state.itemToDelete.ID, this);
  }

  onSaveClick(data) {
    data.productVersionId = parseInt(this.state.productVersionId);
    saveProductVersionService(data, this, self => {
      retrieveProductVersionServices(this.state.productVersionId, this);
      self.setState(() => ({
        showInsertUpdateForm: false,
        editItem: {},
        editMode: false
      }));
    });
  }

  handleCancelClick(e) {
    this.setState(() => ({
      showInsertUpdateForm: false,
      editItem: {},
      editMode: false
    }));
  }

  handleConfirmDeleteModalShow() {
    this.setState({ showConfirmDeleteModal: true });
  }

  onDelete(item) {
    this.setState({ itemToDelete: item }, () => {
      this.handleConfirmDeleteModalShow();
    });
  }

  onEdit(item) {
    this.setState(() => ({
      showInsertUpdateForm: true,
      editItem: item,
      editMode: true
    }));
  }

  goToDeploy(item) {}
  goToServiceDeploy(item) {}

  render() {
    const items = this.state.list
      .filter(
        d =>
          this.state.inputFilter === "" ||
          d.serviceName.includes(this.state.inputFilter)
      )
      .map((item, key) => (
        <tr key={key}>
          <td>{item.serviceName}</td>
          <td>{item.dockerImageTag}</td>
          <td>{item.latestVersion}</td>
          <td>
            <Button
              className="link-button"
              onClick={this.onEdit.bind(this, item)}
            >
              <i className="pe-7s-edit" />
            </Button>
          </td>

          <td>
            <Button
              className="link-button"
              onClick={this.onDelete.bind(this, item)}
            >
              <i className="pe-7s-trash" />
            </Button>
          </td>
          <td>
            <Button
              className="link-button"
              onClick={this.goToServiceDeploy.bind(this, item)}
            >
              <i className="pe-7s-news-paper" />
            </Button>
          </td>
        </tr>
      ));

    return (
      <div className="content">
        <SimpleModal
          showConfirmDeleteModal={this.state.showConfirmDeleteModal}
          handleConfirmDeleteModalClose={this.handleConfirmDeleteModalClose.bind(
            this
          )}
          title="Confirm"
          subTitle="Delete chart association"
          message="Are you sure you want to delete this chart association?"
          handleConfirmDelete={this.handleConfirmDelete.bind(this)}
        ></SimpleModal>

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <form>
                    <h2>{this.state.solutionName}</h2>

                    <ButtonToolbar>
                      <Button
                        className="btn-primary pull-right"
                        variant="primary"
                        onClick={this.goToDeploy.bind(this)}
                      >
                        Go to deploy
                      </Button>

                      <Button
                        className="pull-right"
                        variant="primary"
                        onClick={this.handleNewClick.bind(this)}
                      >
                        Associate Chart
                      </Button>
                    </ButtonToolbar>

                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {this.state.showInsertUpdateForm ? (
                <ProductReleaseServiceForm
                  editMode={this.state.editMode}
                  handleLoading={this.props.handleLoading}
                  handleNotification={this.props.handleNotification}
                  editItem={this.state.editItem}
                  saveClick={this.onSaveClick.bind(this)}
                  cancelClick={this.handleCancelClick.bind(this)}
                />
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Charts"
                content={
                  <form>
                    <div>
                      <div className="col-md-8">
                        <FormGroup>
                          <ControlLabel>Charts Search</ControlLabel>
                          <FormControl
                            value={this.state.inputFilter}
                            onChange={this.onChangeFilterHandler.bind(this)}
                            style={{ width: "100%" }}
                            type="text"
                            placeholder="Search using any field"
                            aria-label="Search using any field"
                          ></FormControl>
                        </FormGroup>
                      </div>

                      <div>
                        <Table bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Helm Chart</th>
                              <th>Desired Image Tag</th>
                              <th>Latest Image Tag Available</th>
                              <th>Edit</th>
                              <th>Delete</th>
                              <th>Go Deploy</th>
                            </tr>
                          </thead>
                          <tbody>{items}</tbody>
                        </Table>
                      </div>
                    </div>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ProductReleaseService;

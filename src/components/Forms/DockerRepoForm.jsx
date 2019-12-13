import React, { Component } from "react";
import { CardTenkai } from "components/Card/CardTenkai.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {
    Button
} from "react-bootstrap";

export class DockerRepoForm extends Component {

    state = {
        formData: {
            name: '',
            host: '',
            password: '',
            username: '',
        }
    }

    componentDidMount() {
        if(this.props.editItem) {
            this.setState(() => ({
                formData: this.props.editItem
            }));
        } else {
            this.setState(() => ({
                formData: {}
            }));
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState(state => ({
            formData: {
                ...state.formData,
                [name]: value
            }
        }));
    }

    saveClick = event => {
        event.preventDefault();
        const data = this.state.formData;
        this.props.saveClick(data);
    }    


    render() {
        const { editMode } = this.props;

        return (
            <div>
                <CardTenkai title={editMode ? "Edit Repository" : "New Repository"}
                    content={
                        <form>
                            <FormInputs
                                ncols={["col-md-8"]}
                                properties={[
                                    {
                                        name: "host",
                                        label: "Host",
                                        type: "text",
                                        bsPrefix: "form-control",
                                        placeholder: "https://dockerxpto",
                                        value: this.state.formData.host,
                                        onChange: this.handleChange
                                    }
                                ]}
                            />

                            <FormInputs
                                ncols={["col-md-3", "col-md-3"]}
                                properties={[
                                    {
                                        name: "username",
                                        label: "Username",
                                        type: "text",
                                        bsPrefix: "form-control",
                                        value: this.state.formData.username,
                                        onChange: this.handleChange

                                        
                                    },
                                    {
                                        name: "password",
                                        label: "Password",
                                        type: "password",
                                        bsPrefix: "form-control",
                                        value: this.state.formData.password,
                                        onChange: this.handleChange

                                    }
                                ]}
                            />                                         
                         
                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <Button variant="info" type="button" onClick={this.saveClick}>
                                        Save
                                    </Button>
                                </div>
                                <div className="btn-group">
                                    <Button variant="info" type="button" onClick={this.props.cancelClick}>
                                        Cancel
                                    </Button>

                                </div>
                            </div>
                        </form>
                    }
                />
            </div>
        );
    }

}

export default DockerRepoForm;

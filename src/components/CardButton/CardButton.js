import React, { Component } from 'react';
import { Card } from 'components/Card/Card.jsx';
import CButton from 'components/CustomButton/CustomButton.jsx';

export default class CardButton extends Component {
  render() {
    return (
      <Card
        title=""
        content={
          <form>
            <h4>
              {this.props.header}
              <CButton
                className="pull-right"
                variant="primary"
                onClick={this.props.handleClick.bind(this)}
              >
                {this.props.buttonName}
              </CButton>
              <div className="clearfix" />
            </h4>
          </form>
        }
      />
    );
  }
}

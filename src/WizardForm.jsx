import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import WizardFormFirstPage from './wizard/WizardFormFirstPage';
import WizardFormSecondPage from './wizard/WizardFormSecondPage';
import WizardFormThirdPage from './wizard/WizardFormThirdPage';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    return (<div>
      {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} initialValues={{ objectives: [{ scaletype: 'natural' }],alternatives: [{}]}} />}
      {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}
      {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit} values={this.props.values} />}
    </div>
    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default (WizardForm);

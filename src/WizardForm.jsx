import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import WizardFormFirstPage from './wizard/WizardFormFirstPage';
import WizardFormSecondPage from './wizard/WizardFormSecondPage';
import WizardFormThirdPage from './wizard/WizardFormThirdPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    return (
    <MuiThemeProvider>
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}
                                            initialValues={{ objectives: [{ scale_type: 'natural', objective_id: 1 }], alternatives: [{ nominal_value: 3, alternative_id: 1 }]}} />}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage} />}
        {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit} values={this.props.values} />}
      </div>
    </MuiThemeProvider>
    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default (WizardForm);

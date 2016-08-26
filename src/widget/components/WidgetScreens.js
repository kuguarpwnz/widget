import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


export default class HorizontalLinearStepper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      finished: false,
      stepIndex: 0
    };
  }

  handleNext() {
    const { stepIndex } = this.state;
    const { screens } = this.props;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex > screens.length - 2,
    });
  };

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  render() {
    const { finished, stepIndex } = this.state;
    const { screens } = this.props;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          {screens.map(({ text }, index) =>
            <Step key={index}>
              <StepLabel>{text}</StepLabel>
            </Step>
          )}
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({ stepIndex: 0, finished: false });
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              {screens[stepIndex].screen}
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={() => this.handlePrev()}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === screens.length - 1 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={() => this.handleNext()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

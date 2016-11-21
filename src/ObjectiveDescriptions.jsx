import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (

      <div className="objective-description-area">

            <div className="header">
              <label className="header-objectives">Objectives</label>
              <label className="header-units">Units</label>
            </div>

            <div className="r1">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Purchase Price</label>
              </div>

              <label className="units"> $ </label>
            </div>

             <div className="r2">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Upkeep</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r3">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Purchase Price</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r4">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Upkeep</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r5">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Purchase Price</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r6">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Upkeep</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r7">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Purchase Price</label>
              </div>

              <label className="units"> $ </label>
            </div>

            <div className="r8">
              <div className="objective-name-container">
                <label className="objective-name">Cost</label>
                <label className="sub-objective-name">Upkeep</label>
              </div>

              <label className="units"> $ </label>
            </div>

      </div>

    );
  }
}

export default ObjectiveDescriptions;

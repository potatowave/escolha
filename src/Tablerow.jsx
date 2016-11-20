import React, {Component} from 'react';
import { connect } from 'react-redux';

class Tablerow extends Component {

  render() {
    console.log("Rendering <Tablerow />");

    return (
      <div>
        <div className="r1">
          <div className="c1">$12,000</div>
          <div className="c2 highlight">$20,000</div>
          <div className="c3">$15,000</div>
          <div className="c4">$13,000</div>
          <div className="c5">$28,000</div>
          <div className="c6">$40,000</div>
        </div>

      </div>
    );
  }
}

export default Tablerow;

/*

        <div className="r2">
          <div className="c1">$3,000</div>
          <div className="c2 highlight">$1,000</div>
          <div className="c3">$800</div>
          <div className="c4">$2000</div>
          <div className="c5">$500</div>
          <div className="c6">$400</div>
        </div>

        <div className="r3">
          <div className="c1">$12,000</div>
          <div className="c2 highlight">$20,000</div>
          <div className="c3">$15,000</div>
          <div className="c4">$13,000</div>
          <div className="c5">$28,000</div>
          <div className="c6">$40,000</div>
        </div>

        <div className="r4">
          <div className="c1">$3,000</div>
          <div className="c2 highlight">$1,000</div>
          <div className="c3">$800</div>
          <div className="c4">$2000</div>
          <div className="c5">$500</div>
          <div className="c6">$400</div>
        </div>

        <div className="r5">
          <div className="c1">$12,000</div>
          <div className="c2 highlight">$20,000</div>
          <div className="c3">$15,000</div>
          <div className="c4">$13,000</div>
          <div className="c5">$28,000</div>
          <div className="c6">$40,000</div>
        </div>

        <div className="r6">
          <div className="c1">$3,000</div>
          <div className="c2 highlight">$1,000</div>
          <div className="c3">$800</div>
          <div className="c4">$2000</div>
          <div className="c5">$500</div>
          <div className="c6">$400</div>
        </div>

        <div className="r7">
          <div className="c1">$12,000</div>
          <div className="c2 highlight">$20,000</div>
          <div className="c3">$15,000</div>
          <div className="c4">$13,000</div>
          <div className="c5">$28,000</div>
          <div className="c6">$40,000</div>
        </div>

        <div className="r8">
          <div className="c1">$3,000</div>
          <div className="c2 highlight">$1,000</div>
          <div className="c3">$800</div>
          <div className="c4">$2000</div>
          <div className="c5">$500</div>
          <div className="c6">$400</div>
        </div>
*/

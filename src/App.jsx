import React, {Component} from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log('Rendering <App/>');
    return (
      // <div><h1>Hello React :)</h1></div>

      <div className="container">

        <nav className="navbar">
          <div className="brand">Escol.ia</div>

          <div className="nav-links">
            <div className="home-button">Home</div>
            <div className="editor-button">Edit</div>
            <div className="create-button">Create</div>
          </div>

          <div className="search-area">Search</div>
          <div className="login">Signed in as Christian</div>
        </nav>

        <main>
          <div className="case-title">
            <h1>Case Title</h1>
          </div>

          <div className="case-description">
            <p>Activated charcoal wolf locavore yuccie. Paleo pork belly readymade, chia direct trade ethical narwhal man braid post-ironic pickled iceland. Cardigan twee swag VHS.</p>
          </div>

          <div className="main-container">

            <div className="alt-image-container">
              <div className="alt-image-1"></div>
              <div className="alt-image-2"></div>
              <div className="alt-image-3"></div>
              <div className="alt-image-4"></div>
              <div className="alt-image-5"></div>
              <div className="alt-image-6"></div>
            </div>
            
            <div className="table-container">
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

              <div className="table-area">
                <div className="header">
                  <label className="header1">Alternative 1</label>
                  <label className="header2 highlight">Alternative 2</label>
                  <label className="header3">Alternative 3</label>
                  <label className="header4">Alternative 4</label>
                  <label className="header5">Alternative 5</label>
                  <label className="header6">Alternative 6</label> 
                </div>

                <div className="r1">
                  <div className="c1">$12,000</div>
                  <div className="c2 highlight">$20,000</div>
                  <div className="c3">$15,000</div>
                  <div className="c4">$13,000</div>
                  <div className="c5">$28,000</div>
                  <div className="c6">$40,000</div>
                </div>
                
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
              </div>
            </div>

            <div className="hide-buttons-rows">
              <div className="hide-button"></div>
              <div className="hide-button selected"></div>
              <div className="hide-button"></div>
              <div className="hide-button"></div>
              <div className="hide-button"></div>
              <div className="hide-button"></div>
              <div className="hide-button"></div>
              <div className="hide-button"></div>
            </div>
          </div>

        </main>

      </div>

    );
  }
}



function mapStateToProps(state) {
  return {
    someProp: state.someProp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
      const action = { type: 'ADD_CONTACT', contact: { id: 1, name: "Bob" } };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

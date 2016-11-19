import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div><h1>Hello React :)</h1></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

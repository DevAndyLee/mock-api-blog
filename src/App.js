import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import * as actions from './reducers';
import './App.css';

export class App extends Component {
  static get propTypes() {
    return {
      fetching: PropTypes.bool,
      operators: PropTypes.arrayOf(PropTypes.string),
      value: PropTypes.number,
      calculating: PropTypes.bool,
      calculated: PropTypes.bool,
      errorMessage: PropTypes.string,
      onLoad: PropTypes.func.isRequired,
      onGo: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      operator: '+',
      input: 0
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { fetching, errorMessage } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mock API Example</h1>
        </header>
        <div className="App-content">
          {fetching
            ? <div className="App-loading">Loading...</div>
            : this.renderMaths()
          }
        </div>
        {errorMessage && <div className="App-error">{errorMessage}</div>}
      </div>
    );
  }

  renderMaths() {
    const { operators, value, calculating, calculated } = this.props;
    const { operator, input } = this.state;

    return <form className={`App-maths ${calculated ? 'calculated' : ''}`} onSubmit={event => this.onSubmit(event)}>
      <span className="App-value">{value}</span>
      { operators &&
        <select className="App-operator" value={operator} onChange={event => this.setState({ operator: event.target.value })}>
          {operators.map(o =>
            <option key={o} value={o}>{o}</option>)
          }
        </select>}

      <input type="text" className="App-input" value={input} onChange={event => this.setState({ input: event.target.value })} />

      <input type="submit" className="App-submit" value="Go" disabled={calculating} />
    </form>;
  }

  onSubmit(event) {
    const { onGo } = this.props;
    const { operator, input } = this.state;

    event.preventDefault();
    onGo(operator, input);
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(actions.getIfNecessary()),
    onGo: (operator, input) => dispatch(actions.doMaths(operator, input))
  }
}
const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
 
export default ConnectedApp

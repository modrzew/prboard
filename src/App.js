import React from 'react';

import './App.css';
import { getPrs } from './fetch';
import token from './token';
import PullRequests from './PullRequests';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
    };
  }

  componentDidMount() {
    getPrs(token).then(prs => {
      this.setState({ prs });
    });
  }

  render() {
    return (
      <div>
        <PullRequests prs={this.state.prs}/>
      </div>
    );
  }
}

import React from 'react';

import './App.css';
import { getPrs } from './github';
import PullRequests from './PullRequests';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
    };
  }

  componentDidMount() {
    getPrs().then(prs => {
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

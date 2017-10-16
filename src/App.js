import React from 'react';

import { getPrs } from './github';
import PullRequests from './PullRequests';
import styles from './App.css';

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
      <div className={styles.container}>
        <PullRequests prs={this.state.prs}/>
      </div>
    );
  }
}

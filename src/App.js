import React, { Component } from 'react';
import './App.css';
import { getPrs } from './fetch';
import token from './token';

export default class App extends Component {
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
        <ul>
          {this.state.prs.map(pr => (
            <li key={pr.number}>
              <img src={pr.author.avatar_url} width="32" alt={pr.author.login}/>
              {pr.title}: {pr.ptal && 'ptal'}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

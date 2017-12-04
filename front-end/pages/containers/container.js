import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import s from './container.css';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
class Container extends Component {
  render() {
    const { auth, showForum } = this.props;
    if (auth) {
      return (
        <Layout auth={auth} showForum={showForum}>
          <div className={s.wrap}>{this.props.children}</div>
        </Layout>
      );
    }
    return (
      <Layout showForum={showForum}>
        <div className={s.wrap}>{this.props.children}</div>
      </Layout>
    );
  }
}
export default connect(state => state)(Container);

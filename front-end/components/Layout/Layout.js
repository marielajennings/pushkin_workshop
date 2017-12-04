/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from './Footer';
import * as b from 'react-bootstrap';
import s from './Layout.css';

class Layout extends React.Component {
  render() {
    const { auth, showForum } = this.props;
    if (auth) {
      return (
        <div>
          <Header auth={auth} showForum={showForum} />
          {this.props.children}
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Header showForum={showForum} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

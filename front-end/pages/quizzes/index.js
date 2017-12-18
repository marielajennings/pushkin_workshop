/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable max-len */

import * as f from 'react-foundation';
import { Row, Col, Image } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';
import { Link } from 'react-router';

class QuizPage extends React.Component {
  render() {
    if (!this.props.children) {
      return (
        <div>
          <Image
            style={{ display: 'none' }}
            src={require('../../img/favicon.ico')}
          />
          <div>
            <Row>
              <Col xs={12}>
                <div className={s.blurb}>
                <p className={s.sub}>
                    Introduce your quizzes and include links to them here.
                  </p> 
                  <hr />

                  {/*Insert your quiz here!! */}
                  

                
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default QuizPage;
/* eslint-disable max-len */

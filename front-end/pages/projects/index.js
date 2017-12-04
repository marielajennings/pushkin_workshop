/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { Row, Col, Image } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import s from './styles.css';
import { Link } from 'react-router';

class ProjectPage extends React.Component {
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
                    Introduce your projects and include links to them here.
                  </p>
                  <hr />
                  {/*<p className={s.sub} style={{marginLeft:'20px', marginRight:'20px'}} ><Link className={s.title} to="/projects/verbcorner">VerbCorner</Link><br />Help us crowdsource the structure of language, meaning, and thought</p>*/}
                  {/*<p
                    className={s.sub}
                    style={{ marginLeft: '20px', marginRight: '20px' }}
                  >
                    Lorem ipsum dolor sit amet, dicta commune adolescens ne sed, nec possit nostrum eu.
                    Vix quas aperiam inimicus no. Ut nec quidam verear erroribus, nam ad laudem semper placerat.
                    Ut ornatus conclusionemque his, eum ei magna saepe nullam, quo tota pericula in.
                  </p>
                  <hr />
                  <p className={s.sub}>
                    Lorem ipsum dolor sit amet, dicta commune adolescens ne sed, nec possit nostrum eu.
                    Vix quas aperiam inimicus no. Ut nec quidam verear erroribus, nam ad laudem semper placerat.
                    Ut ornatus conclusionemque his, eum ei magna saepe nullam, quo tota pericula in.
                  </p> */}
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

export default ProjectPage;

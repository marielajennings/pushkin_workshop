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

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className={s.white}>
          <Row className={s.display}>
            <Col sm={12} lg={6} className={s.textCenter}>
              <Image
                src={require('../../img/placeholder1.png')}
                responsive
                className={s.gif}
              />
            </Col>
            <Col sm={12} lg={5} className={s.textCenter}>
              <p className={s.title}>
                <b>Placeholder Title</b>
              </p>
              <p className={s.blurb}>
                Ius consul eruditi voluptaria ea, ex simul inermis qualisque quo.
                Facilisi patrioque pro ei, pro dicant omittam eu, timeam feugait argumentum eum in.
                Eos id alii case electram, pro possit suavitate corrumpit an. Mel et soluta vituperata,
                liber virtute ut quo, eam scripta apeirian philosophia ne.
              </p>
            </Col>
          </Row>
        </div>
        <div className={s.tan}>
          <Row className={s.display}>
            <Col lg={1} />
            <Col lg={5} className={s.textCenter}>
              <p className={s.title} style={{ marginTop: '90px' }}>
                <b>Placeholder Title</b>
              </p>
              <p className={s.blurb}>
                Ius consul eruditi voluptaria ea, ex simul inermis qualisque quo.
                Facilisi patrioque pro ei, pro dicant omittam eu, timeam feugait argumentum eum in.
                Eos id alii case electram, pro possit suavitate corrumpit an. Mel et soluta vituperata,
                liber virtute ut quo, eam scripta apeirian philosophia ne.
              </p>
            </Col>
            <Col lg={6} className={s.textCenter}>
              <Image
                style={{ marginTop: '90px' }}
                src={require('../../img/placeholder1.png')}
                responsive
                className={s.gif}
              />
            </Col>
          </Row>
        </div>
        <div className={s.white}>
          <Row className={s.display}>
            <Col sm={12} lg={6} className={s.textCenter}>
              <Image
                src={require('../../img/placeholder1.png')}
                responsive
                className={s.gif}
              />
            </Col>
            <Col sm={12} lg={5} className={s.textCenter}>
              <p className={s.title}>
                <b>Placeholder Title</b>
              </p>
              <p className={s.blurb}>
                Ius consul eruditi voluptaria ea, ex simul inermis qualisque quo.
                Facilisi patrioque pro ei, pro dicant omittam eu, timeam feugait argumentum eum in.
                Eos id alii case electram, pro possit suavitate corrumpit an. Mel et soluta vituperata,
                liber virtute ut quo, eam scripta apeirian philosophia ne.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomePage;

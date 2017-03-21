import React, { PropTypes } from 'react'
import { connect } from 'dva'

import {AL} from '../../utils'

const HomePage = ({
  // location,
  dispatch,
  home,
}) => {

  return (

      <div className='content-inner'>
        首页
      </div>
  );
}

HomePage.propTypes = {

}

function mapStateToProps ({ home }) {
  return { home }
}

export default connect(mapStateToProps)(HomePage)

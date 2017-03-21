import React, { PropTypes } from 'react'
import { connect } from 'dva'

import {AL} from '../../utils'

const ThememPage = ({
  // location,
  dispatch,
  theme,
}) => {

  return (
    <div className='content-inner'>
      分类页
    </div>
  );
}

ThememPage.propTypes = {

}

function mapStateToProps ({ theme }) {
  return { theme }
}

export default connect(mapStateToProps)(ThememPage)

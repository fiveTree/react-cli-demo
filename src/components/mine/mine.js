import React from 'react'
import ReactDom from 'react-dom'
import './mine.less'
class Mine extends React.Component{
  render () {
    return (
      <p className='mine'>
        This is
        <span className='bold'> mine</span>
      </p>
    )
  }
}
export default Mine;

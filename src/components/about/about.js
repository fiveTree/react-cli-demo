import React from 'react'
import ReactDom from 'react-dom'
import './about.css'
class About extends React.Component{
  render () {
    return (
      <p className='about'>
        This is
        <span className='bold'> about</span>
      </p>
    )
  }
}
export default About

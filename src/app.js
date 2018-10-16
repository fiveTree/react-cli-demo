import React from 'react'
import ReactDom from 'react-dom'
import asyncComponent from './components/asyncComponent/asyncComponent'
// import Home from './components/home/home'
// import Mine from './components/mine/mine'
// import About from './components/about/about'
const Home=asyncComponent(()=>import('./components/home/home'))
const Mine=asyncComponent(()=>import('./components/mine/mine'))
const About=asyncComponent(()=>import('./components/about/about'))
// import {  BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {  HashRouter as Router, Route, Link} from 'react-router-dom'

// const MyRouters = () =>(
//   <Router>
//       <div>
//         <ul>
//           <li><Link to="/">首页</Link></li>
//           <li><Link to="/about">关于</Link></li>
//           <li><Link to="/mine">我的</Link></li>
//         </ul>
//         <Route exact path="/" component={Home}/>
//         <Route path="/about" component={About}/>
//         <Route path="/mine" component={Mine}/>
//       </div>
//     </Router>
//   );
const MyLazyRouters = ()=>(
  <Router>
      <div>
        <ul className="nav">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/about">关于</Link></li>
          <li><Link to="/mine">我的</Link></li>
        </ul>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/mine" component={Mine}/>
      </div>
    </Router>
  );

import './style/css/common.css';
  class HelloReact extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        date: new Date()
      };
    }
    componentDidMount() {
      this.Timing = setInterval(() => {
        this.setState({
          date: new Date()
        })
      },1000)
    }
    componentWillMount() {
      clearInterval(this.Timing)
    }
  render() {
    let {date} = this.state
      return (
        <div className="">
          <div style={{"textAlign":"center"}}>
            <h1>Hello word!</h1>
            <h2>This is my react-cli;</h2>
            {/* <h3>当前时间： {date.toLocaleTimeString()}</h3> */}
          </div>
          {/* <MyRouters/> */}
          <MyLazyRouters/>
        </div>
      )
    }
  }
ReactDom.render(<HelloReact />, document.getElementById('app'))

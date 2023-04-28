import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {

  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";

export class App extends Component {
  state = {
    progress: 10
  }
setProgress =(progress)=>{
  this.setState({progress: progress})
}

  render() {
    return (
      <div>
        
       <NavBar/>
       <LoadingBar
       height={2}
        color='#f11946'
        progress={this.state.progress}       
      />

       
       <Routes>
       {/* <Route path="/" element={<Home />} /> */}
            <Route path='/' element={<News setProgress={this.setProgress} key='general' pageSize={12} country='in' category='general' />}></Route>
            <Route path='/general' element={<News setProgress={this.setProgress} key='general' pageSize={12} country='in' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={12} country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={12} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={12} country='in' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={12} country='in' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={12} country='in' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={12} country='in' category='technology' />}></Route>

        </Routes>
       
       
      </div>
    )
  }
}

export default App


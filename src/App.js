
import './App.css';
 import React, { Component } from 'react';
 import Navbar from "./component/Navbar";
import News from './component/News';
import {
  BrowserRouter as Router,
Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
 
 export default class App extends Component {
  pageSize=7;
  apiKey= process.env.REACT_APP_NEWS_API;

  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  
   render() {
     return (
      <Router>
       <div>
         <Navbar title="CHATPATI KHABRE" />
         
        
         <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
        />
             <Routes>
       <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='general' key='general'/>}>
         
          </Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='sports' key='sports'/>}>
          
          </Route> 
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='business' key='business'/>}>
          
          </Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='entertainment' key='entertainment'/>}>
          
</Route>
  <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='health' key='health'/>}>
          

          </Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='science' key='science'/>}>
          

          </Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country='in' category='technology' key='technology'/>}>
          

          </Route>
        </Routes>
        </div>
    </Router>
     )
   }
 }
 

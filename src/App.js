import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {View} from 'react-native'
import NavTab from "./Components/nav_tab";
import NavTabAndroid from './Components/nav_tab_android';
import 'bootstrap/dist/css/bootstrap.css';
import {Card} from 'react-bootstrap'
import { Dimensions,Image} from "react-native";
import { Platform } from "react-native-web";
import LearnExplore from "./Components/learn_explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome,faEnvelope,faChartBar,faTasks,faBook} from '@fortawesome/free-solid-svg-icons'
import chapsList from './Components/chapsList'
export default class App extends Component {
  componentWillMount() {
    Dimensions.addEventListener('change', (e) => {
      this.setState({width:100*(e.window.width)/(e.screen.width)});
    })
  }
  render() {
    // if(Platform.OS==='web')
      // return (<NavTab/>)
    // else 
    //   return (<NavTabAndroid/>)
    // return <NavTab/>;
    return (

      <BrowserRouter>
        <View>
        {(Dimensions.get("window").width>760)?(<View style={{backgroundColor:"#5f3694"}}>
          <Card.Header as="h3"  >
          <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
            <Image 
                  style={{height:25*1.4,width:130*1.4,marginLeft:20}}
                  source={{
                  uri:"https://d1l59jsi25mzk9.cloudfront.net/apps3/build/images/logo.png"}}
                  />  
            
              <View style={{margin:10,flex:1,flexDirection:"row",alignItems:"center",flexWrap:"wrap"}}>
              
                  <FontAwesomeIcon title="Home" icon={faHome} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="tasks" icon={faTasks} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="Home" icon={faEnvelope} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="faChartBar" icon={faChartBar} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="book" icon={faBook} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="Home" icon={faHome} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="tasks" icon={faTasks} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="Home" icon={faEnvelope} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="faChartBar" icon={faChartBar} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="book" icon={faBook} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="Home" icon={faHome} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="tasks" icon={faTasks} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="Home" icon={faEnvelope} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="faChartBar" icon={faChartBar} style={{color:"#ffffff",marginLeft:20}}/>  
                  <FontAwesomeIcon title="book" icon={faBook} style={{color:"#ffffff",marginLeft:20}}/>  
            </View> 
            </View> 
          

          </Card.Header>
        </View>
        ):(null)}
        </View>
        <Switch>
          <Route path="/home/learn-book/:subjectId/:subjectName/:iconURL/:classCode/:classId/:className/CBSE/prime/:colorCode//false"  component={chapsList} />
          <Route path="/home/learn-explore" component={LearnExplore} />  
          <Route path="/" exact component={NavTab} />
        </Switch>
      </BrowserRouter>
    );
  }
}


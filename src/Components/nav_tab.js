import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Tabs,Tab,Card} from 'react-bootstrap'
import { View ,Dimensions,Image} from "react-native";
import Wall from './wall'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome,faEnvelope,faChartBar,faTasks,faBook} from '@fortawesome/free-solid-svg-icons'
import NoticeBoardLayout from './noticeboard_layout'
import LearnLayout from './learn_card_layout'
export default class NavBar extends React.Component {
  componentWillMount() {
    Dimensions.addEventListener('change', (e) => {
      this.setState({width:100*(e.window.width)/(e.screen.width)});
    })
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'Learn',
      width:100
    };
  }
  render() {
    var margin=(Dimensions.get("window").width<375)?this.state.width:1
    return (
      <View style={{opacity:1}}>
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
        <View style={{margin,opacity:1}}>
          <Tabs
            id="nav-tabs"
            activeKey={this.state.key}
            onSelect={key => this.setState({ key })}
          >
            <Tab eventKey="Learn" title="Learn" key="Learn" >
              {(this.state.key==="Learn")?<LearnLayout />:null}
            </Tab>
            <Tab eventKey="Wall" title="Wall"key="Wall">
              {(this.state.key==="Wall")?<Wall />:null}
            </Tab>
            <Tab eventKey="NoticeBoard" title="NoticeBoard" key="NoticeBoard">
              {(this.state.key==="NoticeBoard")?<NoticeBoardLayout />:null}
            </Tab
            >
          </Tabs>
        </View>
      </View>
    );
  }
}



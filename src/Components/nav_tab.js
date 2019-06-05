import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Tabs,Tab} from 'react-bootstrap'
import { View } from "react-native";
import Wall from './wall'
import NoticeBoard from './NoticeBoard'

export default class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'NoticeBoard',
    };
  }
  render() {
    return (
      <View style={{margin:10}}>
        <Tabs
          id="nav-tabs"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="NoticeBoard" title="NoticeBoard">
            {(this.state.key=="NoticeBoard")?<NoticeBoard />:null}
          </Tab>
          <Tab eventKey="Wall" title="Wall">
            {(this.state.key=="Wall")?<Wall />:null}
          </Tab>
        </Tabs>
      </View>
    );
  }
}



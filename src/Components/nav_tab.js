import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Tabs, Tab } from "react-bootstrap";
import { View, Dimensions } from "react-native";
import Wall from "./wall";
import NoticeBoardLayout from "./noticeboard_layout";
import LearnLayout from "./learn_card_layout";
export default class NavBar extends React.Component {
  componentWillMount() {
    Dimensions.addEventListener("change", e => {
      this.setState({ width: (100 * e.window.width) / e.screen.width });
    });
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "Learn",
      width: 100
    };
  }
  render() {
    var margin = Dimensions.get("window").width < 360 ? this.state.width : 1;
    return (
      <View style={{margin}}>
        <Tabs
          id="nav-tabs"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="Learn" title="Learn" disable="true">
            {this.state.key === "Learn" ? <LearnLayout /> : null}
          </Tab>
          <Tab eventKey="Wall" title="Wall" key="Wall">
            {this.state.key === "Wall" ? <Wall /> : null}
          </Tab>
          <Tab eventKey="NoticeBoard" title="NoticeBoard">
            {this.state.key === "NoticeBoard" ? <NoticeBoardLayout /> : null}
          </Tab>
        </Tabs>
      </View>
    );
  }
}

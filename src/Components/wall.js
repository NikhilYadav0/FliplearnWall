import React, { Component } from "react";
import { Card, Text } from "react-native-elements";
import {  } from "react-native-web";
import { View,ScrollView, StyleSheet, Platform } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "react-native-vector-icons/AntDesign";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import ApiCall from "./api_calls";
import VisualFeature from "./feature_type";
import Comment from "./comment";
import Divider from "./divider";
import DateModiier from "./FormattingHelpers/month";

export default class Wall extends Component {
  state = { userMessages: [], page: 1 };
  constructor(props) {
    super(props);
    if (Platform.OS === "web") {
      window.onbeforeunload = function(e) {
        localStorage.clear();
      };
      window.addEventListener("scroll", this.handleOnScroll);
    }
  }
  update = false;
  loadMoreComponent(loadMore) {
    if (Platform.OS !== "web" || (!localStorage.hasOwnProperty("WallMessage") || loadMore)) {
      var page = this.state.page;
      if (loadMore) page++;
      ApiCall.loadDataOnWall(page, 10).then(response => {
        if (page === 1 && Platform.OS === "web" ) {
          localStorage.setItem(
            "WallMessage",
            JSON.stringify(response.data.message)
          );
        }
        var messages = this.state.userMessages;
        messages = messages.concat(response.data.message);
        this.setState({ userMessages: messages, page });
        this.update = false;
      });
    } else if(Platform.OS === "web") {
      var storedUserMessages = JSON.parse(localStorage.getItem("WallMessage"));
      console.log(storedUserMessages);
      this.setState({ userMessages: storedUserMessages });
      this.update = false;
    }
  }
  componentWillMount() {
    this.loadMoreComponent(false);
  }
  likeButton = i => {
    console.log("clicked");
    var message = this.state.userMessages;
    message[i].selfLiked = !message[i].selfLiked;
    if (message[i].selfLiked)
      ApiCall.likeMessage(`${101004608030}`, message[i].messageCode);
    else ApiCall.unlikeMessage(`${101004608030}`, message[i].messageCode);
    this.setState({ userMessages: message });
  };
  MessageList = () => {
    var messages = this.state.userMessages.map((item, index) => {
      var DateMonth = DateModiier(item.created);
      var date = DateMonth.date,
        month = DateMonth.month;
        // return (<Text> Hello!! </Text>)
      return (
        <View key={index} >
            <Text
              style={[
                { display: "flex", justifyContent: "center", marginTop: 1 },
                s.title
              ]}
            >
              {date} {month}
            </Text>
          <Card containerStyle={{ margin: 0 }}>
              <Text style={s.title}> {item.title}</Text>
              <Text>{"\n"}</Text>
          
            <VisualFeature item={item} />
            
            <Text>{"\n"}</Text>
            <Text>
              {item.messageText}
              <Text>{"\n"}</Text>
              {item.likedCount} Likes | {item.comments[0].commentCount} Comments
            </Text>
            <Divider />
        
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {Platform.OS === "web" ? (
                  <FontAwesomeIcon
                    title="likeButtton"
                    icon={item.selfLiked ? filledHeart : emptyHeart}
                    style={item.selfLiked ? { color: "#FF0000" } : null}
                  />
                ) : (
                  <Icon name="hearto" />
                )}
                <Text
                  onPress={() => this.likeButton(index)}
                  style={[
                    s.title,
                    { fontSize: 12 },
                    item.selfLiked ? { color: "#FF0000" } : null
                  ]}
                >
                  {item.selfLiked ? "  Liked" : "  Like"}
                </Text>
              </View>
              <Text
                style={{ position: "absolute", right: 10, color: "#148bfe" }}
                //TODO: check on android
                // onPress={() => {
                //   window.open(item.link);
                // }}
              >
                Watch more Videos -->
              </Text>
            
        </View>
              <Comment
                uuid={101004608030}
                comCount={item.comments[0].commentCount}
                messageCode={item.messageCode}
                item={item.comments[0].comment}
              />
          </Card>
        </View>
      );
    });
    return (<View>{messages}</View>);
  };

  handleOnScrollforWindow = event => {
    console.log(event);
    if (
      (window.pageYOffset * 1.0) / parseFloat(document.body.scrollHeight) >
        0.5 &&
      !this.update
    ) {
      console.log("loadTime");
      this.update = true;
      this.loadMoreComponent(true);
    }
  };
  render() {
    return (
      // <ScrollView onScroll={this.handleOnScroll}>
      <ScrollView onScrollEndDrag={()=>{if(!update){this.update=true;this.loadMoreComponent(true)}}}>
        <Card containerStyle={{ marginTop: -10 }}>
          <this.MessageList />
        </Card>
      </ScrollView>
    );
  }
}

const s = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 16
  }
});

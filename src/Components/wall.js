import React, { Component } from "react";
import { Card, Text } from "react-native-elements";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "react-native-vector-icons/AntDesign";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import wall from "../Api/getWall";
import VisualFeature from './feature_type'
import Comment from './comment'
import Divider from './divider'
export default class Wall extends Component {
  state = { userMessages: Array(0) };
  loadData(pageNum, pageSize) {
    wall
      .get("/getUserMessage", {
        params: {
          type: "#fliplearn",
          blocked: 0,
          startDate: null,
          endDate: null,
          pageNum: pageNum,
          pageSize
        }
      })
      .then(response => {
        this.setState({ userMessages: response.data.message });
        console.log(response.data.message);
      })
      .catch(err => {
        console.log("****"+err);
      });
  }
  constructor(props) {
    super(props);
    this.loadData(1, 10);
  }
  MessageList = () => {
    var messages = this.state.userMessages.map((item, i) => {
      var date=item.created.substring(8, 10);
      var month=item.created.substring(5,7);
      switch(month){
        case "01":
          month="JANUARY";break;
        case "02":
            month="FEBRUARY";break;
        case "03":
            month="MARCH";break;
        case "04":
            month="APRIL";break;
        case "05":
            month="MAY";break;
        case "06":
            month="JUNE";break;
        case "07":
            month="JULY";break;
        case "08":
            month="AUGUST";break;
        case "09":
            month="SEPTEMBER";break;
        case "10":
          month="OCTOBER";break; 
        case "11":
          month="NOVEMBER";break;
        case "12":
          month="DECEMBER";break;
      }
      return (
        <View key={i} >
          <Text style={[{display:"flex",justifyContent:"center",marginTop:1},s.title]}>{date} {month}</Text>
          <Card>
            <Text style={s.title}> {item.title}</Text>
            {Platform.OS === "web" ? <br /> : <Text>{"\n"}</Text>}
            <VisualFeature item={item}/>
            {Platform.OS === "web" ? <br /> : <Text>{"\n"}</Text>}
            <Text>
              {item.messageText}
              {Platform.OS === "web" ? <br /> : <Text>{"\n"}</Text>}
              {item.likedCount} Likes | {item.comments[0].commentCount} Comments
            </Text>
            <Divider/>
            <View style={{flex:1,flexDirection:"row"}}>
              {Platform.OS === "web" ? (
                <FontAwesomeIcon icon={faHeart} />
              ) : (
                <Icon name="hearto" />
              )}
              <Text style={[s.title,{fontSize: 12}]}> Like </Text>
            </View>
            <Comment comCount={item.comments[0].commentCount} 
                      messageCode={item.messageCode} 
                      item={item.comments[0].comment}
                    />
          </Card>
        </View>
      );
    });
    return <View >{messages}</View>;
  };

  render() {
    return (
      <ScrollView>
        <Card containerStyle={{margin:100}}>
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

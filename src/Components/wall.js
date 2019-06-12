import React, { Component } from "react";
import { Card, Text } from "react-native-elements";
import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "react-native-vector-icons/AntDesign";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ApiCall from "./api_calls";
import VisualFeature from './feature_type'
import Comment from './comment'
import Divider from './divider'
import DateModiier from './FormattingHelpers/month'


export default class Wall extends Component {
  state = { userMessages:[]};
  
  componentDidMount(){
    if(!localStorage.hasOwnProperty('WallMessage')){
      ApiCall.loadDataOnWall(1,10).then(response=>{
        localStorage.setItem('WallMessage',JSON.stringify(response.data.message))
        this.setState(
        {userMessages:response.data.message} 
        )}
      )
    }
    else{
      var storedUserMessages=JSON.parse(localStorage.getItem('WallMessage'))
      console.log(storedUserMessages)
      this.setState(
          {userMessages:storedUserMessages} 
      )
    }
  }
  
  MessageList = () => {
      var messages = this.state.userMessages.map((item, i) => {
      var DateMonth=DateModiier(item.created);
      var date=DateMonth.date,month=DateMonth.month;
      return (
        <View key={i}  style={{opacity:1}} >
          <Text style={[{display:"flex",justifyContent:"center",marginTop:1},s.title]}>{date} {month}</Text>
          <Card containerStyle={{margin:0}}>
            <Text style={s.title}> {item.title}</Text>
            {Platform.OS === "web" ? <br /> : <Text>{"\n"}</Text>}


            {/* {<----------  videos here ------------->} */}
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

  handleOnScroll = event => {
    console.log("HELLO")
  }

  render() {
    return (
      <ScrollView scrollEventThrottle={16}  onScroll={this.handleOnScroll}> 
            
            <Card containerStyle={{marginTop:-10}}>
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

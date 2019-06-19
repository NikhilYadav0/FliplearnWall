import React, { Component } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { FlatList,View, Text } from "react-native";
// import { View, Text } from "react-native-web";
import { Input } from "react-native-elements";
// import "bootstrap/dist/css/bootstrap.css";
import nameFirstLetter from "./FormattingHelpers/namFirstLetter";
import ApiCall from "./api_calls";

// ..............................line 81 edit.....................................

export default class Comment extends Component {
    loggedInProfileImage =
    "https://d1l59jsi25mzk9.cloudfront.net/abc_path/imgFromCam1558951963.PNG";
    constructor(props) {
    super(props);
    this.state = {
        search:"",
        comments: props.item,
        countClicked: 0,
        currentComment: 0,
        total: props.comCount
    };
}

    renderRow({ item }) {
    var firstLetter = nameFirstLetter(item);
    return (
        <ListItem
            containerStyle={{ backgroundColor: "#ecf2f8", borderRadius: 2 }}
            roundAvatar
            title={item.firstName}
            titleStyle={{ margin: 10, fontWeight: "600" }}
            leftAvatar={
            item.profileImg === null
                ? { title: firstLetter }
                : {
                    source: {
                    uri: item.profileImg
                    }
                }
            }
            bottomDivider={true}
            subtitle={
                <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.comment}</Text>
            }
        />
    );
}
    loadCurrentElement = () => {
    var list = this.state.comments;
    ApiCall.loadCommentsonWall(0, 1, this.props.messageCode).then(response => {
        list = list.concat(response.data.comments[0].comment);
        this.setState({
            comments: list,
            currentComment: this.state.currentComment + 1,
            total: this.state.total + 1
        });
    });
    };

loadComment = () => {
    var count = this.state.countClicked + 1;
    var list = this.state.comments;
    ApiCall.loadCommentsonWall(count, 5, this.props.messageCode).then(
    response => {
        if (count === 1) {
        list.length = 0;
        }
        list = response.data.comments[0].comment.concat(list);
        list = list.reverse();
        console.log(list);
        this.setState({
            comments: list,
            countClicked: count,
            currentComment: 0
        });
        }
    );
};

render() {
    var messageCode = this.props.messageCode;
    var uuid = this.props.uuid;
    return (
    <View style={{ backgroundColor: "#ecf2f8", marginTop: 10 }}>
        <Text
            style={{ position: "relative", left: 10, top: 10, color: "#148bfe" }}
            onPress={this.loadComment}
        >
            View previous comments
        </Text>
        <Text
            style={{ position: "absolute", right: 10, top: 10, color: "#148bfe" }}
            onPress={this.loadComment}
        >
          {Math.max(5 * this.state.countClicked, 1) + this.state.currentComment}{" "}
            of {this.state.total}
        </Text>
        <FlatList
            extraData={this.state.currentComment}
            style={{ marginTop: 10 }}
            data={this.state.comments}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => `${index}`}
        />
        <View
            style={{
                flexDirection: "row",
                marginTop: 5,
                paddingLeft: 5,
                alignItems: "center"
            }}
        >
        <Avatar rounded source={{ uri: this.loggedInProfileImage }} />
        <Input
            placeholder="   Add a comment..."
            value={this.state.search}
            onChangeText={(text)=>{this.setState({search:text})}}
            onKeyPress={e => {
            if (e.nativeEvent.key === "Enter") {
                var search = e.target.value;
                e.target.value = "";
                ApiCall.postComments(search, messageCode, `${uuid}`)
                    .then(response => {
                    console.log(response);
                    this.loadCurrentElement();
                    })
                .catch(err => {
                    console.log(err);
                });
                }
            }}
            containerStyle={{ width: "90%", marginBottom: 5 }}
            inputStyle={{ padding: 10 }}
            inputContainerStyle={{
                backgroundColor: "#ffffff",
                borderWidth: 0.5,
                borderColor: "#d6d7da"
            }}
        />
        </View>
    </View>
    );
    }
}

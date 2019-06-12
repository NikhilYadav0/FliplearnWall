import React, { Component } from "react";
import { ListItem,Avatar } from "react-native-elements";
import { View, FlatList,Text } from "react-native";
import { Input } from 'react-native-elements';
import 'bootstrap/dist/css/bootstrap.css';
import nameFirstLetter from './FormattingHelpers/namFirstLetter'
import ApiCall from './api_calls'

export default class Comment extends Component {
    constructor(props){
        super(props)
        this.state={comments:props.item,countClicked:0}
    }
    
    renderRow({ item }) {
        var firstLetter=nameFirstLetter(item)
        return (
        <ListItem
            containerStyle={{backgroundColor:'#ecf2f8',borderRadius:2}}
            roundAvatar
            title={item.firstName}
            titleStyle={{margin:10,fontWeight:"600"}}

            leftAvatar={(item.profileImg===null)?{title:firstLetter}: {source:{
                uri:item.profileImg
            }}}

            bottomDivider={true}
            subtitle={
                <Text style={{fontSize:12,marginLeft:10}}>{item.comment}</Text>
            }
        />
        );
    }

    loadComment=()=>{
        var count=this.state.countClicked+1
        var list=this.state.comments
        ApiCall.loadCommentsonWall(count,this.props.messageCode).then(response=>{
            if(count===1){
                list.length=0
            }
            list=list.concat(response.data.comments[0].comment)
            this.setState({
                comments:list,countClicked:count
            })
        })
    }


    render() {
        return (
            <View style={{backgroundColor:'#ecf2f8',marginTop:10}}>
                <Text style={{position:'relative',left:10,top:10,color:'#148bfe'}} onPress={this.loadComment}>
                    View previous comments
                </Text>
                <Text style={{position:'absolute',right:10,top:10,color:'#148bfe'}} onPress={this.loadComment}>
                    {Math.max(5*this.state.countClicked,1)} of {this.props.comCount}
                </Text>
                <FlatList
                    style={{marginTop:10}}
                    data={this.state.comments}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.firstName}
                />
                <View style={{flexDirection:"row",marginTop:5,paddingLeft:5,alignItems:"center"}}>
                    <Avatar rounded
                            source={{uri:"https://d1l59jsi25mzk9.cloudfront.net/abc_path/imgFromCam1558951963.PNG"}}
                    />
                    <Input placeholder='   Add a comment...' 
                        containerStyle={{  width:"90%" ,marginBottom:5}}
                        inputStyle={{padding:10}}
                        inputContainerStyle={{ 
                        backgroundColor:'#ffffff',borderWidth: 0.5,borderColor: "#d6d7da"}
                    }/>
                </View>
            </View>
        );
    }
}

import React, { Component } from "react";
import { ListItem,Avatar } from "react-native-elements";
import { View, FlatList,Text } from "react-native";
import wall from "../Api/getWall";
import { Input } from 'react-native-elements';

export default class Comment extends Component {
    renderRow({ item }) {
        var a=item.firstName.split(" ");
        console.log(a)
        var firstLetter=""
        for(var i=0;i<a.length;i++){
            if(a[i]==="")continue;
            firstLetter=firstLetter+a[i][0]
        }
        

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
    constructor(props){
        super(props)
        var item=props.item
        this.state={comments:item,countClicked:0}
    }
    loadComment=()=>{

        var count=(this.state.countClicked)+1;
        var list=this.state.comments
        wall.get('/getCommentsByMessageCode',{
            params:{
                messageCode:this.props.messageCode,
                pageNum:count,
                pageSize:5
            }
        }).then((response)=>{
            console.log(list)
            console.log(response.data.comments[0].comment)
            if(count===1){
                list.length=0
            }
            list=list.concat(response.data.comments[0].comment)
            console.log(list)
            this.setState({
                comments:list,countClicked:count
            })
        }).catch((err)=>{
            console.log("*****************"+err)
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
                <View style={{flexDirection:"row",marginTop:5,paddingLeft:5}}>
                    <Avatar rounded 
                        // source={(item.profileImg===null)?{title:firstLetter}: {source:{
                        //     uri:item.profileImg
                        // }}}
                    />
                    <Input placeholder='   Add a comment...' 
                        containerStyle={{width:875,height:50}}
                        inputContainerStyle={{width:875,
                        backgroundColor:'#ffffff',borderWidth: 0.5,borderColor: "#d6d7da"}
                    }/>
                </View>
            </View>
        );
  }
}

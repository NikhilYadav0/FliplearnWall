import React, { Component } from 'react'
import ApiCall from './api_calls'
import {TouchableOpacity} from 'react-native'
import {ListItem} from 'react-native-elements'
import { View, FlatList,Text,StyleSheet } from "react-native";

export default class chapsList extends Component {
    constructor(props){
        super(props)
        this.state={data:[],book:-1,chap:-1}
        ApiCall.loadSubChaps(309).then((response)=>{
            this.setState({data:response.data.response})
        })
    }
    createManyChapterss(chapterId){
        ApiCall.loadChapTopics(chapterId,1).then((response)=>{
            
        })
        // var listItems=subjects.map((item,ind)=>{
        //     return <View><Text>Hii</Text></View>
        // })
        return <Text>HI  .............................................</Text>
    }
    listView=({item,index})=>{
        console.log(item)
        return (
        <View>
            {(item.index!=this.state.book && index!=this.state.chap)?(
            <TouchableOpacity  
                onPress={()=>{
                    var subj=this.state.data
                    if(this.state.book==item.index && this.state.chap==index+1){
                        subj.splice(index+1,1);
                        this.setState({data:subj,book:-1,chap:-1})
                        return;
                    }
                    else{ 
                        if(this.state.ind!=-1){
                            subj.splice(this.state.ind,1);
                        }
                        subj.splice(index+1,0,this.createManyChapterss(item.item.chapterId))
                        this.setState({data:subj,ind:index+1})
                    }} }>
                <ListItem  containerStyle={{shadowOffset:{width:"100%",height:"100%"}}} 
                title={item.chapterName} bottomDivider={true}/>
            </TouchableOpacity>):
            (<View>{item}</View>)}
        </View>)
    }
    bookWiseList=({item,index})=>{
        return (
            <View>
                <Text style={[s.title,{borderRadius:5,backgroundColor:"orange",paddingLeft:10,marginBottom:-10}]}>
                    {item.bookName}
                </Text>
                <FlatList
                        style={{width:"80%",borderWidth:1,borderColor:'#c6d8e4',margin:10}}
                        renderItem={this.listView}
                        data={item.chapters}
                        keyExtractor={(item,index)=>`${index}`}
                    />
            </View>
        )
    }
    render() {
        console.log(this.state.data)
        return (
            <View style={{marginTop:10}}>
                <Text style={[s.title,{paddingLeft:"10%",marginBottom:10}]}>Select Class</Text>
                <View style={{alignItems:"center"}}>
                    <FlatList
                        style={{width:"80%",borderWidth:1,borderColor:'#c6d8e4'}}
                        renderItem={this.bookWiseList}
                        data={this.state.data}
                        keyExtractor={(item,index)=>item.bookName}
                    />
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    title: {
      fontWeight: "600",
      fontSize: 20
    }
  });


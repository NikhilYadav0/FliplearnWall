import React, { Component } from "react";
import { ListItem,Button,Image } from "react-native-elements";
import { View, FlatList,Text,StyleSheet ,TouchableOpacity} from "react-native";
import { Input } from 'react-native-elements';
import nameFirstLetter from './FormattingHelpers/namFirstLetter'
import ApiCall from './api_calls'
import Icon from 'react-native-vector-icons'
import { Link } from "react-router-dom";

export default class LearnExplore extends Component {
    constructor(props){
        super(props)
        this.state={data:[],ind:-1};
        ApiCall.loadSubChaps(309).then((response)=>{
            console.log(response)
        })
        ApiCall.loadSubjects().then((response)=>{
            console.log(response)
            this.setState({data:response.data.response})
        })
        // ApiCall.loadSubChaps(309).then((response)=>{
        //     console.log(response.data)
        // })
    }
    SubjectItem=(buttonTitle)=>{
        var iconUrl= "https://d1l59jsi25mzk9.cloudfront.net/"+buttonTitle.iconUrl
        return (
                <View style={{width:"30%"}}>
                    <Link to={{pathname:"learn-book/339/Mathematics/Fliplearn~2FSubjects~2FMaths.svg/14/55/KG/CBSE/prime/fa9721//false"}} >
                    <Button
                        icon={<Image style={{width:30,height:30,marginRight:10}} 
                            source={{uri:iconUrl}}/>}
                            buttonStyle={{borderColor:`#${buttonTitle.colorCode}`,
                                    borderWidth:2,
                                    borderLeftWidth:10,
                                    borderRadius:10}}
                            style={{margin:10}}
                            title={buttonTitle.subjectName}
                            type="outline"
                        />
                    </Link>
                </View>
            )
    }
    createManySunjects(subjects){
        var listItems=subjects.map((item,ind)=>{
            return this.SubjectItem(item)
        })
        return <View style={{flexDirection:"row",flexWrap:'wrap'}}>{listItems}</View>
    }
    listView=({item,index})=>{
        return (
        <View>
            {(index!==this.state.ind)?(
            <TouchableOpacity  
                onPress={()=>{
                    var subj=this.state.data
                    if(this.state.ind===index+1){
                        subj.splice(index+1,1);
                        this.setState({data:subj,ind:-1})
                        return;
                    }
                    else{ 
                        if(this.state.ind!==-1){
                            subj.splice(this.state.ind,1);
                        }
                        subj.splice(index+1,0,this.createManySunjects(this.state.data[index].subjects))
                        this.setState({data:subj,ind:index+1})
                    }} }>
                <ListItem  containerStyle={{shadowOffset:{width:"100%",height:"100%"}}} 
                title={item.className} bottomDivider={true}/>
            </TouchableOpacity>):
            (<View>{item}</View>)}
        </View>)
    }
    
    render() {
        console.log(this.state.data)
        return (
            <View style={{marginTop:10}}>
                <Text style={[s.title,{paddingLeft:"10%",marginBottom:10}]}>Select Class</Text>
                <View style={{alignItems:"center"}}>
                    <FlatList
                        style={{width:"80%",borderWidth:1,borderColor:'#c6d8e4'}}
                        renderItem={this.listView}
                        data={this.state.data}
                    />
                </View>
            </View>
        );
    }
}
const s = StyleSheet.create({
    title: {
      fontWeight: "600",
      fontSize: 20
    }
  });
  
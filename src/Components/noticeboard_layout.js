import React from 'react'
import {View,Text,ScrollView,StyleSheet,Image} from 'react-native'
import {Card} from 'react-native-elements'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons"
import DateModiier from './FormattingHelpers/month'
import ApiCall from './api_calls'
export default class Annoncement extends React.Component{
    state={Notices:[]}
    componentDidMount(){
        if(localStorage.hasOwnProperty('Notices')){
            this.setState({Notices:JSON.parse(localStorage.getItem('Notices'))})
        }
        else{
            ApiCall.loadNoticeBoardData(1,10)
            .then(response=>{
                localStorage.setItem("Notices",JSON.stringify(response.data.message))
                console.log(response.data.message)
                this.setState({Notices:response.data.message})
            })
        }
    }


    AttachedMaterial=(item)=>{
        console.log(item)
        var base_url='https://d1l59jsi25mzk9.cloudfront.net/Events/'
        if(item.messageAssets===null) return null
        var assets=item.messageAssets.assets.map((asset,ind)=>{
            if(asset.fileType==="image"){
                return (<Image key={ind} style={style.image}
                    source={{uri:`${base_url+asset.systemFilename}`}}/>
                )
            }
            return null;
        })
        return <View style={{flexDirection:"row",flexWrap:"wrap"}}>{assets}</View>
    }
    NoticesView=()=>{
        var noticeView=this.state.Notices.map((item,ind)=>{
        var DateMonth=DateModiier(item.created);
        var date=DateMonth.date,month=DateMonth.month;
            return (
                <View>
                    <Text style={[{display:"flex",
                        justifyContent:"center",
                        marginTop:1,marginBottom:10},
                        style.title]}>
                        {date} {month}
                    </Text>
                    <View style={{borderWidth:1,margin:5,borderColor:"#414141"}}>
                        <View key={ind} style={{marginTop:-25, flexDirection:"row",alignItems:"center"}}>
                            <Text  style={{margin:10,padding:5,color:"#ffffff",backgroundColor:"#5e5e5e"}}>
                                <FontAwesomeIcon style={{marginLeft:5,marginRight:5,backgroundColor:"#5e5e5e"}} icon={faBullhorn} color="#ffffff" />
                                {(item.type).toUpperCase()}
                            </Text>
                        </View>
                        <Text style={[style.TextStyle,style.title]}>{item.title}</Text>
                        <Text style={style.TextStyle}>{item.postedByName}, {item.created}</Text>
                        {(item.messageAssets)!=null?(<Image style={{height:20,width:20}} source={{uri:item.messageAssets.assets[2]}} />):null}
                        {this.AttachedMaterial(item)}
                        
                    </View>
                </View>
            )
        })
        return noticeView;
    }
    
    render(){
        return (
            <ScrollView >
                <Card containerStyle={{marginTop:-10}}>
                <this.NoticesView />
                </Card>
            </ScrollView>
        )
    }
}

var style=StyleSheet.create({
    TextStyle:{
        margin:5
    },
    title: {
        fontWeight: "600",
        fontSize: 16
    },
    image: {
        width: "90%",
        marginLeft:5,
        marginBottom:5,
        height: 200,
        maxWidth: 350,
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: "#d6d7da"
    }
})   
import React from 'react'
import {ScrollView,View,StyleSheet,Platform} from 'react-native'
import {Card,Image,Text} from 'react-native-elements'
import ApiCall from './api_calls'
import {Link} from 'react-router-dom'

export default class LearnCardLayout extends React.Component{
    state={item:null,result:null}
    loadCategoryList=()=>{
        ApiCall.loadSchoolSpecific(21409234).then(response=>{
            this.setState({item:response.data})
        })
        ApiCall.getCategoryList().then(response=>{
            this.setState({result:response.data.result})
        })
    }
    componentDidMount(){
        //TODO: check on android
        if(Platform.OS==='web' && window.localStorage.hasOwnProperty('LearnCards')){
            console.log("from local storage")
            var ob=JSON.parse(window.localStorage.getItem("LearnCards"))
            this.setState(ob);
        }
        else{
            console.log("helllllo")
            ApiCall.loadSchoolSpecific(21409234).then(response=>{
                if(Platform.OS==='web'){
                    window.localStorage.setItem('LearnCards',JSON.stringify({
                        item:response.data,
                        result:this.state.result
                    }))
                }
                this.setState({item:response.data})
            })
            ApiCall.getCategoryList().then(response=>{
                if(Platform.OS==='web'){
                    window.localStorage.setItem('LearnCards',JSON.stringify({
                        item:this.state.item,
                        result:response.data.result
                    }))
                }
                this.setState({result:response.data.result})
            })
        }
    }
    render(){
        var item=this.state.item
        var result=this.state.result
        return (<ScrollView >
            {(result!==null && item!==null)?(
                <View style={{flexDirection:"row",justifyContent:"center",flexWrap:'wrap'}}>
                    <Link to={{pathname:"home/learn-explore"}} >
                        <Card containerStyle={{width:"90%",maxWidth: 350}}>
                            <Image style={style.image}
                                source={{uri:`https://d1l59jsi25mzk9.cloudfront.net/${result[0].image}`}}
                            />
                        <Text style={style.title}>{result[0].name}</Text>
                        <Text style={style.title}>{result[0].description}</Text>
                        </Card>
                    </Link>
                    <Card containerStyle={{width:"90%",maxWidth: 350}}>
                        <Image style={style.image}
                            source={{uri:`https://d1l59jsi25mzk9.cloudfront.net/${result[1].image}`}}
                        />
                        <View style={{justifyContent:"center"}}>
                            <Text style={style.title}>{result[1].name}</Text>
                            <Text style={style.title}>{result[1].description}</Text>
                        </View>
                    </Card>
                    <Card containerStyle={{width:"90%",maxWidth: 350}}>
                        <Image style={style.image}
                            source={{uri:item.services[0].image}}
                        />
                        <View style={{justifyContent:"center"}}>
                                <Text style={style.title}>{item.services[0].name}</Text>
                                <Text style={style.title}>{item.services[0].description}</Text>
                        </View>
                    </Card>
                </View>
            ):(<Text>Not Able To Load .... Try Again :/</Text>)}
        </ScrollView>)
    }
}


var style=StyleSheet.create({
    title: {
        margin:5,
        textAlign:"center",
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
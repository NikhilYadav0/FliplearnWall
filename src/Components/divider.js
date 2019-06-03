import React from 'react'
import {View,StyleSheet} from 'react-native'
export default class Divider extends React.Component{
    render(){
        return <View style={styles.lineStyle} />
    }
}

const styles = StyleSheet.create({
    lineStyle: {
      borderWidth: 0.5,
      borderColor: "#d6d7da",
      margin: 10
    }
  });
  
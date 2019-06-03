import React, { Component } from "react";
import { ScrollView, Platform, WebView } from "react-native";
import { Image } from "react-native-elements";
import { StyleSheet } from "react-native";

export default class featureType extends Component {
  render() {
    var item = this.props.item;
    if (item.featureAttachmentType === "image") {
      const ImageBaseURL = "https://d1l59jsi25mzk9.cloudfront.net/";
      var image_url = ImageBaseURL + item.messageFeatureAssets.assets[0].url;
      return <Image source={{ uri: image_url }} style={s.image} />;
    } else {
      var src = `https://www.youtube.com/embed/${item.featureAttachmentLink}`;
      var uri = encodeURI(src);
      return (
        <ScrollView>
          {Platform.OS === "web" ? (
            <iframe
              title="Video Player"
              src={src}
              style={{ height: 230, width: 450 }}
            />
          ) : (
            <WebView
              source={{ uri: uri }}
              style={{ height: 230, width: 450 }}
            />
          )}
        </ScrollView>
      );
    }
  }
}

// const screenWidth = Math.round(Dimensions.get("window").width);
// const maxWidth = screenWidth * 0.5;
// const minHeight = maxWidth / 1.77;

const s = StyleSheet.create({
  image: {
    width:350,
    height:175,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
    // flex: 1,
    // width: undefined,
    // height: undefined,
    // resizeMode: "contain",
    // minHeight,
  }
});

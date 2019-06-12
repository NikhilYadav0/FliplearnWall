import React from "react";
import { ScrollView, Platform, WebView, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

export default class featureType extends React.Component {
  render() {
    var item = this.props.item;
    var web = Platform.OS === "web" ? true : false;
    if (item.featureAttachmentType === "image") {
      var image_url = `https://d1l59jsi25mzk9.cloudfront.net/${
        item.messageFeatureAssets.assets[0].url
      }`;
      return <Image source={{ uri: image_url }} style={style.image} />;
    } else {
      var src = `https://www.youtube.com/embed/${item.featureAttachmentLink}`;
      var uri = encodeURI(src);
      return (
        <ScrollView>
          {web ? (
            <iframe
              title="Video Player"
              src={src}
              style={{ height: 306, width: "100%", maxWidth: 450 }}
            />
          ) : (
            <WebView
              source={{ uri: uri }}
              style={{ height: 306, width: 450 }}
            />
          )}
        </ScrollView>
      );
    }
  }
}

var style = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    maxWidth: 350,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});

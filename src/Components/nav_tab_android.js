import React from 'react';
import { Text, View } from 'react-native';
import Wall from "./wall";
// import NoticeBoardLayout from "./noticeboard_layout";
import LearnLayout from "./learn_card_layout";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    LearnLayout,
    Wall
});

export default createAppContainer(TabNavigator);
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Wall from './wall'
import NoticeBoard from './NoticeBoard'

const TabNavigator = createBottomTabNavigator({
    Wall: Wall,
    NoticeBoard: NoticeBoard
  });
  
export default createAppContainer(TabNavigator);
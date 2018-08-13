import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import {
    StackNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    withNavigation,
    TabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './screens/Home';
import ProjectList from './screens/ProjectList';

import Project from './screens/Project';


let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
    'Home': {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <Icon name="home" type="Entypo" size={28} color={tintColor} />
        },
    },
    'ProjectList': {
        screen: ProjectList,
        navigationOptions: {
            tabBarLabel: 'Project List',
            tabBarIcon: ({tintColor}) => <Icon name="list" type="Entypo" size={28} color={tintColor}/>
        },
    }
});

export const ProjectStack = createStackNavigator({
    ProjectList: {
        screen: ProjectList,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    Project: {
        screen: Project,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const createRootNavigator = () => {
    return createStackNavigator(
        {
            Tabs: {
                screen: Tabs,
                navigationOptions: {
                    title: "Locomotive Project",
                    gesturesEnabled: false
                }
            },
            ProjectStack: {
                screen: ProjectStack,
                navigationOptions: {
                    title: "Project",
                    gesturesEnabled: false
                }
            }
        },

    );
};

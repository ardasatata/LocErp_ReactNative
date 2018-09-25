import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import {
    StackNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    withNavigation,
    TabNavigator
} from 'react-navigation';
import {Button, Icon} from 'react-native-elements';

import Home from './screens/Home';
import ProjectList from './screens/ProjectList';
import ProjectArchive from './screens/ProjectArchive';

import Project from './screens/Project';
import ProjectAdd from "./screens/ProjectAdd";

import BudgetAdd from "./screens/BudgetAdd";
import ScheduleAdd from "./screens/ScheduleAdd";

import AttachmentAdd from "./screens/AttachmentAdd";
import AttachmentView from "./screens/AttachmentView";


let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
    'Home': {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <Icon name="home" type="Entypo" size={28} color={tintColor} />,
        },
    },
    'ProjectList': {
        screen: ProjectList,
        navigationOptions: {
            tabBarLabel: 'Project List',
            tabBarIcon: ({tintColor}) => <Icon name="list" type="Entypo" size={28} color={tintColor}/>,

        },
    }
});

export const ProjectStack = createStackNavigator({
    Project: {
        screen: Project,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const ProjectAddStack = createStackNavigator({
    Project: {
        screen: ProjectAdd,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const BudgetAddStack = createStackNavigator({
    Project: {
        screen: BudgetAdd,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const ScheduleAddStack = createStackNavigator({
    Project: {
        screen: ScheduleAdd,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const AttachmentAddStack = createStackNavigator({
    Project: {
        screen: AttachmentAdd,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }),
    },
});

export const AttachmentViewStack = createStackNavigator({
    Project: {
        screen: AttachmentView,
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
                    gesturesEnabled: false,
                }
            },
            ProjectStack: {
                screen: ProjectStack,
                navigationOptions: {
                    title: "Project",
                    gesturesEnabled: true
                }
            },
            ProjectAddStack: {
                screen: ProjectAddStack,
                navigationOptions: {
                    title: "Project Add",
                    gesturesEnabled: true
                }
            },
            BudgetAddStack: {
                screen: BudgetAddStack,
                navigationOptions: {
                    title: "Budget Add",
                    gesturesEnabled: true
                }
            },
            ScheduleAddStack: {
                screen: ScheduleAddStack,
                navigationOptions: {
                    title: "Schedule Add",
                    gesturesEnabled: true
                }
            },
            AttachmentAddStack:{
                screen: AttachmentAddStack,
                navigationOptions: {
                    title: "Attachment Add",
                    gesturesEnabled: true
                }
            },
            AttachmentViewStack:{
                screen: AttachmentViewStack,
                navigationOptions: {
                    title: "Attachment View",
                    gesturesEnabled: true
                }
            }
        },

    );
};

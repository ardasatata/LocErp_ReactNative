/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createRootNavigator} from "./router";
import * as firebase from 'firebase';
import {firebaseConfig} from "./config/firebase";

class App extends Component{
    constructor(props){
        super(props);
    }
}

firebase.initializeApp(firebaseConfig);

export default createRootNavigator();

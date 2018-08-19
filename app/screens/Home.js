import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button, ScrollView, RefreshControl
} from 'react-native';
import * as firebase from 'firebase';
import {List, ListItem} from "react-native-elements";

export default class Home extends Component {


    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { firebase: '' };
    }

    static navigationOptions = {
        title: 'Home',
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Main Menu
                    </Text>
                    <Button
                        //onPress={}
                        title="Project List"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        //onPress={}
                        title="Archive Project"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
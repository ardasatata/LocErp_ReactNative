import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as firebase from 'firebase';

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
                <Text style={styles.title}>
                    Home
                </Text>
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
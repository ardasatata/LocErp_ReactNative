import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';
import * as firebase from 'firebase';
import Chance from 'chance';

import Spinner from 'react-native-loading-spinner-overlay';

export default class AttachmentView extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            imageURL : ''
        };
    }

    componentWillMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyB-Pa3WVucPY73d84EfTWJIV3y9uwh-Fi8",
            authDomain: "loco-projecttracker.firebaseapp.com",
            databaseURL: "https://loco-projecttracker.firebaseio.com",
            projectId: "loco-projecttracker",
            storageBucket: "loco-projecttracker.appspot.com",
            messagingSenderId: "463924943381"
        };
        //firebase.initializeApp(firebaseConfig);
        console.log(firebase);
        const {navigation} = this.props;
        this.state.imageURL = navigation.getParam('imageURL',null);
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <WebView
                    source={{uri: this.state.imageURL}}
                    //style={{marginTop: 20}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
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

    openProjectList(){
        this.props.navigation.navigate('ProjectArchiveStack',{
        });
    }

    openArchiveProject(){
        this.props.navigation.navigate('ProjectArchiveStack',{
        });
    }

    static navigationOptions = {
        title: 'Home',
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Main Menu
                </Text>
                <ScrollView>
                    <Button
                        style={styles.button}
                        title="Project List"
                    />
                    <Button
                        onPress={()=>this.openArchiveProject()}
                        style={styles.button}
                        title="Archive Project"
                        color="#841584"
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
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
    },
    button:{
        padding: 8,
        margin: 2,
        fontSize: 18
    }
});
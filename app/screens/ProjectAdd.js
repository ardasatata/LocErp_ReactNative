import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Alert
} from 'react-native';
import * as firebase from 'firebase';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import Chance from 'chance';

var chance = new Chance();

export default class Project extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            project: {
                pName : '',
                pDesc : '',
                pBudget : 0,
            }, //data project
            projectId: '',
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
        this.state.projectId = navigation.getParam('projectId',null);
    }

    componentDidMount(){

    }

    addProject(){

        var database = firebase.database();

        this.state.projectId = chance.guid();
        console.log(this.state.projectId);
        console.log(this.state.project.pName);
        console.log(this.state.project.pDesc);
        console.log(this.state.project.pBudget);

        var _pName = this.state.project.pName;
        var _pDesc = this.state.project.pDesc;
        var _pBudget = this.state.project.pBudget;
        var _pId = this.state.projectId;

        var projectDateAdded = new Date();

        var project = {
            id: _pId,
            dateAdded:projectDateAdded.toDateString(),
            name: _pName,
            description: _pDesc,
            status: 'Belum Take',
            budget: _pBudget
        }

        if (_pName == '' || _pDesc == '' || _pBudget == 0){
            this.inputAlert();
        }else{
            database.ref('projects/' + _pId).set(project).then(()=>this.projectAddedAlert());
        }

    }

    showAlert(){
        return Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    inputAlert(){
        return Alert.alert(
            'Warning!',
            'Please fill all form!',
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        )
    }

    projectAddedAlert(){
        return Alert.alert(
            'Success!',
            'Project has been added!',
            [
                {text: 'OK',onPress: ()=>this.projectAdded()},
            ],
            { cancelable: false }
        )
    }

    projectAdded(){
        this.props.navigation.navigate('Tabs',{
        });
    }

    render() {
        return (
            <View>
                <View style={styles.form}>
                    <FormLabel>Project Name</FormLabel>
                    <FormInput onChangeText={(pName) => this.state.project.pName = pName}/>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={(pDesc) => this.state.project.pDesc = pDesc}/>
                    <FormLabel>Budget</FormLabel>
                    <FormInput onChangeText={(pBudget) => this.state.project.pBudget = pBudget} keyboardType="numeric"/>

                    <Button
                        onPress={() => this.addProject()}
                        title="Add Project"g
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 120,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
                            margin : 10
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    form:{
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
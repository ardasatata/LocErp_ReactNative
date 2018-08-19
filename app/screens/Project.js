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
import { Button,List, ListItem } from 'react-native-elements';

export default class Project extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            project: [], //data project
            isLoading: true,
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
        this.fetchProjectData();
    }

    fetchProjectData(){

        var query = firebase.database().ref('projects/'+this.state.projectId);

        var _project = [];

        //console.log(navigation.getParam('projectId',null));

        query.once("value").then(function(snapshot) {
                var key = snapshot.key;
                var childData = snapshot.val();

                var project = {
                    id: childData['id'],
                    name: childData['name'],
                    desc: childData['description'],
                    dateAdded : childData['dateAdded'], //masih timestamp
                    status: childData['status'],
                    budget: childData['budget'],

                }

                console.log(project);
                //projects.push(project);

                _project.push(project);
                //console.log(projects);
            return project;
        }).then((project)=>{
            this.setState({
                project : project,
                isLoading : false
            });
            console.log(this.state.project);
        });
    }

    testMethod(id){
        console.log('test hehe '+id);
    }

    isLoading(l){
        if (l) {
            return (
                <ActivityIndicator size="large" color="#000000" />
            );
        }
        else{
            return null;
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

    render() {
        return (
            <View style={{flex: 1 ,padding:8,backgroundColor: '#F5FCFF',alignItems: 'center'}}>
                {/*{this.isLoading(this.state.isLoading)}*/}
                {/*<Text style={{ textAlign: 'left'}}>*/}
                    {/*Project ID  : <Text style={{fontWeight: 'bold'}}>{this.state.projectId}</Text>{'\n'}*/}
                    {/*Description : <Text>{this.state.project.name}</Text>{'\n'}*/}
                    {/*Start Date  : <Text>{this.state.project.dateAdded}</Text>{'\n'}*/}
                    {/*Status      : <Text>{this.state.project.status}</Text>{'\n'}*/}
                    {/*End Date    : <Text>TBA</Text>{'\n'}{'\n'}*/}
                    {/*Budget      : <Text>{this.state.project.budget}</Text>{'\n'}*/}
                    {/*Expense     : <Text>TBA</Text>{'\n'}*/}
                    {/*Sisa        : <Text>TBA</Text>{'\n'}*/}
                {/*</Text>*/}
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Project ID</Text>
                    </View>
                    <View style={{flex:2}} >
                        <Text style={{fontWeight: 'bold'}}>{this.state.projectId}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Description</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>{this.state.project.name}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Start Date</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>{this.state.project.dateAdded}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Status</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>{this.state.project.status}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>End Date</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>TBA</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Budget</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>{this.state.project.budget}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Expense</Text>
                    </View>
                    <View style={{flex:2,}} >
                        <Text>TBA</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Sisa</Text>
                    </View>
                    <View style={{flex:2}} >
                        <Text>TBA</Text>
                    </View>
                </View>
                <Button
                    onPress={() => this.showAlert()}
                    title="Add Project"g
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 120,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                />
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
    },
    rowProp:{
        flex:1,
        margin: 2,
        textAlign: 'left'
    }
});
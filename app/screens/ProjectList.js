import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import * as firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';


export default class ProjectList extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            projects: [],
            isLoading: true
        };
        this.fetchProjectList = this.fetchProjectList.bind(this);
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
    }

    componentDidMount(){
        this.fetchProjectList();
    }

    fetchProjectList(){

        var query = firebase.database().ref("projects").orderByKey();

        var projects = [];

        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();

                var project = {
                    id: childData['id'],
                    name: childData['name'],
                    status: childData['status'],
                    budget: childData['budget']
                }

                //console.log(project);
                //projects.push(project);

                projects.push(project);
                //console.log(projects);
            });
            return projects;
        }).then((projects)=>{

            //console.log(this.state.projects);

        }).finally(()=>{
            this.setState({
                projects : projects,
                isLoading : false
            });
            console.log("load");
        });
    }

    openProject(id){
        this.props.navigation.navigate('ProjectStack');
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

    render() {
        return (
            <View style={{flex: 1}}>
                {this.isLoading(this.state.isLoading)}
                <ScrollView
                    refreshControl={
                    <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={this.fetchProjectList}
                />}
                >
                    <List containerStyle={{marginBottom: 20}}>
                        {
                            this.state.projects.map((data) => (
                                <ListItem button onPress={() => this.openProject(data.id)}
                                    key={data.id}
                                    title={data.name}
                                />
                            ))
                        }
                    </List>
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
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
import DatePicker from 'react-native-datepicker'

var chance = new Chance();

export default class Project extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            schedule: {
                date : '',
                time: '',
                desc: '',
                status: false
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

    addSchedule(){

        var database = firebase.database();

        var query = firebase.database().ref("schedules/"+this.state.projectId);

        var sDate = this.state.schedule.date;
        var sTime = this.state.schedule.time;
        var sDesc = this.state.schedule.desc;
        var sStatus = this.state.schedule.status;

        var schedule = {
            date : sDate,
            time: sTime,
            desc: sDesc,
            status: sStatus
        }

        if (sDate == '' || sTime == '0' || sDesc==''){
            this.inputAlert();
        }else{
            query.push(schedule).then(()=>this.scheduleAddedAlert());
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

    scheduleAddedAlert(){
        return Alert.alert(
            'Success!',
            'schedule has been added!',
            [
                {text: 'OK',onPress: ()=>this.scheduleAdded()},
            ],
            { cancelable: false }
        )
    }

    scheduleAdded(){
        this.props.navigation.navigate('ProjectStack',{
            projectId : this.state.projectId
        });
    }

    render() {
        return (
            <View>
                <View style={styles.form}>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.schedule.date}
                        mode="date"
                        placeholder="Select Date"
                        format="MMM DD YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.state.schedule.date = date}}
                    />
                    <FormLabel>Time</FormLabel>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.schedule.time}
                        mode="time"
                        placeholder="Select Time"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(time) => {this.state.schedule.time = time}}
                    />
                    <FormLabel>Expense Desc</FormLabel>
                    <FormInput onChangeText={(sDesc) => this.state.schedule.desc = sDesc}/>

                    <Button
                        onPress={() => this.addSchedule()}
                        title="Add Schedule"
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
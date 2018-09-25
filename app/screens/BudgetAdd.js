import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Picker
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
            budget: {
                amount : 0,
                desc : '',
                type : '',
            }, //data project
            projectId: '',
            picker: 'Default value'
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

    addExpense(){

        var database = firebase.database();

        var query = firebase.database().ref("budgets/"+this.state.projectId);

        var bAmount = parseInt(this.state.budget.amount);
        var bDesc = this.state.budget.desc;
        var bType = this.state.budget.type;

        var budget = {
            amount: bAmount,
            desc: bDesc,
            type: bType
        }

        console.log(this.state.budget.amount);
        console.log(this.state.budget.desc);
        console.log(this.state.budget.type);
        console.log(budget);


        if (bDesc == '' ||bAmount == 0||bAmount == ''){
            this.inputAlert();
        }else{
            query.push(budget).then(()=>this.budgetAddedAlert());
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

    budgetAddedAlert(){
        return Alert.alert(
            'Success!',
            'Expense has been added!',
            [
                {text: 'OK',onPress: ()=>this.budgetAdded()},
            ],
            { cancelable: false }
        )
    }

    budgetAdded(){
        this.props.navigation.navigate('ProjectStack',{
            projectId : this.state.projectId
        });
    }

    render() {
        console.log(this.state.budget.amount);
        console.log(this.state.budget.desc);
        console.log(this.state.budget.type);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                backgroundColor: '#F5FCFF'}}>

                <View style={{flex: 2}}>
                    <FormLabel>Amount</FormLabel>
                    <FormInput onChangeText={(bAmount) => this.state.budget.amount = bAmount} keyboardType="numeric"/>
                    <FormLabel>Expense Desc</FormLabel>
                    <FormInput onChangeText={(bDesc) => this.state.budget.desc = bDesc}/>
                </View>

                <View style={{flex:2,alignItems: 'center',justifyContent: 'center'}}>
                    <Picker
                        selectedValue={this.state.picker}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue,itemIndex) => {this.state.budget.type = itemValue, this.setState({picker:itemValue})}}>
                        <Picker.Item label="Direct Rent" value="Direct Rent" />
                        <Picker.Item label="Direct Labor" value="Direct Labor" />
                        <Picker.Item label="FOH" value="FOH" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={{flex: 3,alignItems:'center',justifyContent: 'center'}}>
                    <Button
                        onPress={() => this.addExpense()}
                        title="Add Expense"
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 120,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,
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
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
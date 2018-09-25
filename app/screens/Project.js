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
            budgets:[], //data budget
            schedules:[], //data tanggal
            attachments:[], //data attachments
            isLoading: true,
            projectId: '',
            expense: 0,
            sisa:0
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
        this.fetchAllData();
    }

    componentDidMount(){

    }

    fetchAllData(){
        try {

            console.log('fetch data');

            this.state.isLoading = true;

            this.fetchProjectData();
            this.fetchBudgetsData();
            this.fetchSchedulesData();
            this.fetchAttachmentsData();
        }
        finally {
            this.state.isLoading = false;
            console.log('done');
        }
    }

    openBudgetAdd(){
        this.props.navigation.navigate('BudgetAddStack',{
            projectId : this.state.projectId
        });
        console.log('test hehe open add');
    }

    openScheduleAdd(){
        this.props.navigation.navigate('ScheduleAddStack',{
            projectId : this.state.projectId
        });
        console.log('test hehe open add');
    }

    openAttachmentAdd(){
        this.props.navigation.navigate('AttachmentAddStack',{
            projectId : this.state.projectId
        });
        console.log('test hehe open add');
    }

    openAttachmentView(imageURL){
        this.props.navigation.navigate('AttachmentViewStack',{
            imageURL : imageURL
        });
        console.log('test hehe open attachment view');
    }

    openAttachmentExtra(id,imageURL){
        Alert.alert(
            'Atention',
            'What are you gonna do with this ?',
            [
                {text: 'View', onPress: () => this.openAttachmentView(imageURL)},
                {text: 'Delete', onPress: () => this.deleteAttachment(id)},
            ],
        )

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
                //isLoading : false
            });
            console.log(this.state.project);
        });
    }

    deleteSchedule(id){
        var refDelete = firebase.database().ref('schedules/'+this.state.projectId+'/'+id);

        Alert.alert(
            'Atention',
            'Delete this schedule ?',
            [
                {text: 'Cancel', onPress: () => console.log('cancel delete'), style: 'cancel'},
                {text: 'OK', onPress: () => refDelete.remove().then(this.fetchAllData())},
            ],
        )

    }

    deleteExpense(id){
        var refDelete = firebase.database().ref('budgets/'+this.state.projectId+'/'+id);

        Alert.alert(
            'Atention',
            'Delete this expense ?',
            [
                {text: 'Cancel', onPress: () => console.log('cancel delete'), style: 'cancel'},
                {text: 'OK', onPress: () => refDelete.remove().then(this.fetchAllData())},
            ],
        )

    }

    deleteAttachment(id){
        var refDelete = firebase.database().ref('attachments/'+this.state.projectId+'/'+id);

        Alert.alert(
            'Atention',
            'Delete this attachments ?',
            [
                {text: 'Cancel', onPress: () => console.log('cancel delete'), style: 'cancel'},
                {text: 'OK', onPress: () => refDelete.remove().then(this.fetchAllData())},
            ],
        )

    }

    fetchBudgetsData(){

        var query = firebase.database().ref('budgets/'+this.state.projectId);

        this.state.expense = 0;

        var expense = 0;

        var _budgets = [];

        query.once("value").then(function(snapshot) {
            snapshot.forEach(function (childSnapshot){

                var childData = snapshot.val();

                var key = childSnapshot.key;
                //var childData = childSnapshot.val();

                var budget = {
                    id: childSnapshot.key,
                    desc: childSnapshot.val().desc,
                    amount: childSnapshot.val().amount,
                    type: childSnapshot.val().type
                }

                expense += parseInt(budget.amount);

                console.log(budget);
                //projects.push(project);

                _budgets.push(budget);
                //console.log(projects);
            })
            return _budgets;
        }).then((_budgets)=>{

            this.setState({
                budgets : _budgets,
                expense : expense
            });

            console.log(this.state.budgets);
        });

    }

    fetchSchedulesData(){

        var query = firebase.database().ref('schedules/'+this.state.projectId);

        var _schedules = [];

        query.once("value").then(function(snapshot) {
            snapshot.forEach(function (childSnapshot){

                var schedule = {
                    id: childSnapshot.key,
                    date: childSnapshot.val().date,
                    time: childSnapshot.val().time,
                    desc: childSnapshot.val().desc,
                    status: childSnapshot.val().status
                }

                console.log(schedule);
                //projects.push(project);

                _schedules.push(schedule);
                //console.log(projects);
            })
            return _schedules;
        }).then((_schedules)=>{
            this.setState({
                schedules : _schedules,
                //isLoading : false
            });
            console.log(this.state.schedules);
        });

    }

    fetchAttachmentsData(){

        var query = firebase.database().ref('attachments/'+this.state.projectId);

        var _attachments = [];

        let index = 1;

        query.once("value").then(function(snapshot) {
            snapshot.forEach(function (childSnapshot){

                var attachment = {
                    id: childSnapshot.key,
                    url: childSnapshot.val(),
                    index: index
                }

                index++;

                console.log(attachment);
                //projects.push(project);

                _attachments.push(attachment);
                //console.log(projects);
            })
            return _attachments;
        }).then((_attachments)=>{
            this.setState({
                attachments : _attachments,
                //isLoading : false
            });
            console.log(this.state.attachments);
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
            <View style={{flex: 1 ,padding:2,backgroundColor: '#F5FCFF'}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.fetchAllData()}
                        />}
                >
                    <Text style={styles.title}>
                        {this.state.project.name}
                    </Text>

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
                {/*<View style={{flexDirection: 'row'}}>*/}
                    {/*<View style={styles.rowProp} >*/}
                        {/*<Text>End Date</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex:2,}} >*/}
                        {/*<Text>{this.state.project.dateAdded}</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
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
                        <Text>{this.state.expense}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rowProp} >
                        <Text>Sisa</Text>
                    </View>
                    <View style={{flex:2}} >
                        <Text>{this.state.project.budget - this.state.expense}</Text>
                    </View>
                </View>

                    <Text style={styles.title}>
                        Budgets
                    </Text>
                    <Button
                        onPress={() => this.openBudgetAdd()}
                        title="Add Expense"
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 120,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                    />
                    <View style={{flex:1}}>
                            <List containerStyle={{marginBottom: 20}}>
                                {
                                    this.state.budgets.map((data) => (
                                        <ListItem key={data.id}
                                                  button onPress={() => this.deleteExpense(data.id)}
                                                  title={data.amount +" "+data.type}
                                                  subtitle={data.desc}
                                        />
                                    ))
                                }
                            </List>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.rowProp} >
                            <Text style={{textAlign:'center'}}>Total</Text>
                        </View>
                        <View style={{flex:2}} >
                            <Text style={{textAlign:'center'}}>IDR {this.state.expense},00</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>
                        Schedules
                    </Text>
                    <Button
                        onPress={() => this.openScheduleAdd()}
                        title="Add Schedules"
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 120,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                    />
                    <View style={{flex:1}}>
                        <List containerStyle={{marginBottom: 20}}>
                            {
                                this.state.schedules.map((data) => (
                                    <ListItem key={data.id}
                                              button onPress={() => this.deleteSchedule(data.id)}
                                              title={data.date +' '+data.time}
                                              subtitle={data.desc}
                                    />
                                ))
                            }
                        </List>
                    </View>

                    <Text style={styles.title}>
                        Attachment
                    </Text>
                    <Button
                        onPress={() => this.openAttachmentAdd()}
                        title="Add Attachment"
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 120,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                    />
                    <View style={{flex:1}}>
                        <List containerStyle={{marginBottom: 20}}>
                            {
                                this.state.attachments.map((data) => (
                                    <ListItem key={data.id}
                                              button onPress={() => this.openAttachmentExtra(data.id,data.url)}
                                              title={data.index}
                                    />
                                ))
                            }
                        </List>
                    </View>
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
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
    },
    rowProp:{
        flex:1,
        margin: 2,
        textAlign: 'left'
    }
});
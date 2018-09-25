import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Picker,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';
import * as firebase from 'firebase';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import Chance from 'chance';

import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';

import RNFetchBlob from 'rn-fetch-blob';

import uuid from 'react-native-uuid';

import RNFS from 'react-native-fs';

var chance = new Chance();

export default class AttachmentAdd extends Component {

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
            picker: 'Default value',
            visible: false,
            imagePath: '',
            imageStorageURL: ''
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

    attachmentAddedAlert(){
        return Alert.alert(
            'Success!',
            'Attachment has been added!',
            [
                {text: 'OK',onPress: ()=>this.attachmentAdded()},
            ],
            { cancelable: false }
        )
    }

    attachmentAdded(){
        this.props.navigation.navigate('ProjectStack',{
            projectId : this.state.projectId
        });
    }

    saveAttachment(uri,imageName){

        console.log(" path "+this.state.imagePath);

        let mime = 'image/jpg';

        return new Promise((resolve,reject)=> {

            console.log('test upload img');

            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

            //const uploadUri = uri.replace('file://', '');

            var database = firebase.database();

            var query = database.ref("attachments/"+this.state.projectId);

            const sessionId = new Date().getTime();
            let uploadBlob = null;

            const imageRef = firebase.storage().ref(this.state.projectId).child(imageName);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    this.setState({visible:true});
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .then((blob) => {
                    uploadBlob = blob;
                    console.log(blob);
                    return imageRef.put(blob, { contentType: mime });
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                    console.log("image url download ");
                    console.log("url : "+url);
                    this.setState({imageStorageURL:url});
                    this.setState({visible:false});
                    query.push(this.state.imageStorageURL).then(()=>{
                        this.attachmentAddedAlert();
                    });
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });


        });


        // let mime = 'image/jpg';
        //
        // console.log('test upload img');
        // //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        // const uploadUri = uri.replace('file://', '');
        //
        // const sessionId = new Date().getTime();
        // let uploadBlob = null;
        //
        // const imageRef = firebase.storage().ref(this.state.projectId).child(imageName);
        //
        // fs.readFile(uploadUri, 'base64')
        //     .then((data) => {
        //         return Blob.build(data, { type: `${mime};BASE64` });
        //     })
        //     .then((blob) => {
        //         uploadBlob = blob;
        //         console.log(blob);
        //         return imageRef.put(blob, { contentType: mime });
        //     })
        //     .then(() => {
        //         uploadBlob.close();
        //         console.log("image url"+imageRef.getDownloadURL());
        //         return imageRef.getDownloadURL();
        //     });
        //
        // console.log(imageRef.getDownloadURL());

        // var file = data;
        //
        // var metadata = {
        //     contentType: 'image/jpeg'
        // };
        //
        // var uploadTask = firebase.storage().ref().child(this.state.projectId+'/' + file.name).put(file, metadata);
        //
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        //     function(snapshot) {
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {
        //             case firebase.storage.TaskState.PAUSED: // or 'paused'
        //                 console.log('Upload is paused');
        //                 break;
        //             case firebase.storage.TaskState.RUNNING: // or 'running'
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },  function() {
        //         // Upload completed successfully, now we can get the download URL
        //         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //             console.log('File available at', downloadURL);
        //         });
        //     });

        //uploadImg(data.uri,uuid.v1());

        // var query = firebase.database().ref("attachment/"+this.state.projectId);
        //
        // var imgLink = this.state.
        //
        // query.push(budget).then(()=>this.budgetAddedAlert());

    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes)
                    }}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> foto </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture = async function() {
        if (this.camera) {

            const options = { quality: 0.35, base64: true,forceUpOrientation: true };
            const data = await this.camera.takePictureAsync(options)

            this.setState({imagePath: data.uri});

            this.saveAttachment(data.uri,uuid.v1());

            console.log('test take')

            console.log(data.uri);
        }
    };


}

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export  const uploadImg = (uri, imageName, mime = 'image/jpg') => {
    return (dispatch) => {
        return new Promise((resolve,reject)=> {

            console.log('test upload img');

            //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

            const uploadUri = uri.replace('file://', '');

            const sessionId = new Date().getTime();
            let uploadBlob = null;

            const imageRef = firebase.storage().ref(this.state.projectId).child(imageName);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .then((blob) => {
                    uploadBlob = blob;
                    console.log(blob);
                    return imageRef.put(blob, { contentType: mime });
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })
        })
    }
}

// const uploadImage = (uri, imageName, mime = 'image/jpg') => {
//     return new Promise((resolve, reject) => {
//
//         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//
//         //const uploadUri = uri.replace('file://', '')
//
//         let uploadBlob = null
//         const imageRef = firebase.storage().ref(this.state.projectId).child(imageName)
//         fs.readFile(uploadUri, 'base64')
//             .then((data) => {
//                 return Blob.build(data, { type: `${mime};BASE64` })
//             })
//             .then((blob) => {
//                 uploadBlob = blob
//                 return imageRef.put(blob, { contentType: mime })
//             })
//             .then(() => {
//                 uploadBlob.close()
//                 return imageRef.getDownloadURL()
//             })
//             .then((url) => {
//                 resolve(url)
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }

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
'use strict';

var React = require('react-native'),
    SpotLight = require('./spotlight.js');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} = React;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKAccessToken,
} = FBSDKCore;

var {
  FBSDKGraphRequest,
} = FBSDKCore;

var MyAccount = React.createClass ({
  goToSpotLight(){
    this.props.navigator.push({
      component: SpotLight,
      title: 'Spot Light',
    })
  },

  goToSignup(){
    this.props.navigator.push({
      component: SignUp,
      title: 'Sign Up',
    })
  },

  getInitialState(){

     var fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
      if (error) {
      alert('Error making request.');
      } else {
      this.setState({
        pic: result.picture.data.url,
        age: result.age_range.min,
        name: result.name,
        email: result.email,
        gender: result.gender

      });
      console.log(result);
      }
    }, '/me?fields=id,name,age_range,gender,picture.type(large)');  
    fetchFriendsRequest.start();

    return {
      pic: null,
      email: null,
      gender: null,
      age: null,
      name: null
    };
  },
  
  render(){
    var pic = this.state.pic,
    age = this.state.age,
    name = this.state.name,
    gender = this.state.gender;
    return(
      <View style={styles.mainContainer}>
       <Image style={styles.image} source={{uri: pic}}/>
          <View style={styles.detailsContainer}>
         

            <Text style={styles.contactHeader}> Name </Text>
            <Text style={styles.contactDetails}> {name}</Text>

            <Text style={styles.contactHeader}> Age </Text>
            <Text style={styles.contactDetails}> {age} </Text>

            <Text style={styles.contactHeader}> Gender </Text>
            <Text style={styles.contactDetails}> {gender} </Text>
          </View>


        </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 140,
    height: 140,
    marginTop: 120,
    borderRadius: 70,
    paddingRight: 30,
    marginLeft: 115,
  },
  locationName: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  detailsHeader: {
    color: 'green',
    fontSize: 14,
    marginTop: 20,
  },
  headerDetails: {
    color: 'white',
    fontSize: 18,
  },
    contactHeader: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5,
  },
  contactDetails: {
    color: 'green',
    fontSize: 18,
    marginBottom: 20,
  },
  contactHours: {
    color: 'green',
    fontSize: 14,
    marginBottom: 5,
  },

});

module.exports = MyAccount;
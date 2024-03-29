'use strict';

var React = require('react-native'),
    SpotLight = require('./spotlight.js');

var {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Navigator,
  NavigatorIOS,
  ListView,
} = React;

var Firebase = require('firebase');

class Favorites extends Component {
  constructor(props) {
    super(props);
    var myFirebase = new Firebase('https://fieldfinder.firebaseio.com');

    this.itemsRef = myFirebase.child('items');

    this.state= {
      newTodo: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.items = [];
  }

componentDidMount() {
  this.itemsRef.on('child_added', (dataSnapshot) => {
    this.items.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
    this.setState({
      todoSource: this.state.todoSource.cloneWithRows(this.items)
    });
  });
 

  this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
  });
}

addTodo() {
  if (this.state.newTodo !== '') {
    this.itemsRef.push({
      todo: this.state.newTodo
    });
    this.setState({
      newTodo : ''
    });
  }
}

removeTodo(rowData) {
  this.itemsRef.child(rowData.id).remove();
}

render() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          My Todos
        </Text>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.addTodo()}>
          <Text style={styles.btnText}>Add!</Text>
        </TouchableHighlight>
      </View>
      <ListView
        dataSource={this.state.todoSource}
        renderRow={this.renderRow.bind(this)} />
    </View>
  );
}

renderRow(rowData) {
  return (
    <TouchableHighlight
      onPress={() => this.removeTodo(rowData)}>
      <View>
        <View style={styles.row}>
          <Text style={styles.todoText}>{rowData.text.todo}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
}

}


var styles = StyleSheet.create({
  appContainer:{
    flex: 1,

  },
  titleView:{
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#46833d',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#46833d',
    borderRadius: 4,
    color: '#46833d'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

module.exports = Favorites;
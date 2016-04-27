import React, {Component} from 'react-native';
const Button = require('react-native-button');

import Game from './game';

const {
  Text,
  TouchableNativeFeedback,
  View,
} = React;

export default class App extends Component {
  state = {}

  changeUser = (user) => {
    this.setState({user});
  }

  render() {
    if (this.state.user) {
      return <Game user={this.state.user} />
    }

    const styles = React.StyleSheet.create({
      parent: {
        padding: 16
      },

      buttonText: {
        fontSize: 30,
        marginTop: 0,
        fontWeight: 'bold'
      },
  
      germanWord: {
        marginTop: 15,
        fontSize: 30,
        fontStyle: 'italic'
      },

      button: {
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 7,
        borderColor: 'blue',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 2
      },

      buttonContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 1,
        height: 55,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 3,
        marginVertical: 5,
      },
    });

    return (
      <View style = {styles.parent} >
        <Text>
          Welcome! Select your name:
        </Text>

        <Button
            containerStyle={styles.buttonContainer}
            style={{ color: 'green'}}
            onPress={() => {this.changeUser('Hee-Young')}}>
          <View>
            <Text style={styles.buttonText}>Hee-Young!</Text>
          </View>
        </Button>
        <Button //TouchableNativeFeedback
            containerStyle={styles.buttonContainer}
            style={{ color: 'green'}}
            onPress={() => {this.changeUser('Jae-Hwa')}}>
          <View>
            <Text style={styles.buttonText}>Jae-Hwa!</Text>
          </View>
        </Button>  
      </View>
    );
  }
}

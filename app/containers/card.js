import React, {Component} from 'react-native';
const Button = require('react-native-button');

import Game from './game';

const {
  Image,
  Text,
  TouchableNativeFeedback,
  View,
} = React;

class Card extends Component {
  state = {}

  render() {
    console.log(this.props);

    const styles = React.StyleSheet.create({
      parent: {
        padding: 16
      },

      buttonText: {
        alignSelf: 'center',
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
        flex: 1,
        height:150,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 3,
        marginVertical: 5,
        width: 150,
      },

      contentContainer: {
        alignSelf: 'center',
        height:150,
        justifyContent:'center',
        width: 150,
      },

      detailsImage: {
        width: 140,
        height: 140,
        backgroundColor: '#eaeaea',
        margin: 5,
      },
    });

    const {image, onClick, show, text} = this.props;

    const images = {
      hidden: require('../../hidden_image.jpg')
    };

    return (
      <TouchableNativeFeedback
          containerStyle={styles.buttonContainer}
          style={{ color: 'green'}}
          onPress={onClick}>
        <View style={styles.contentContainer}>

          {!show || image ? 
            (
              <Image
                resizeMode={Image.resizeMode.cover}
                source={show ? image : images.hidden}
                style={styles.detailsImage}
              />
            ) :
            <Text style={styles.buttonText}>{text}</Text>
          }
        </View>
      </TouchableNativeFeedback>  
    );
  }
}

Card.propTypes = {
  show: React.PropTypes.bool.isRequired,
  image: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string,
};

export default Card;
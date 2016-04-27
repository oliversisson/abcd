'use strict';

import React, { Component } from 'react-native';

import Card from './card';

const {
  InteractionManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matched: {'ant': false, 'bat': false, 'cat': false, 'dog': false},
      order: this.shuffle([['ant', 'ant'], ['bat', 'bat'], ['cat', 'cat'], ['dog', 'dog']]),
      peek1: null,
      peek2: null,
    };
  }

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomLeftIndex, randomRightIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomLeftIndex = Math.floor(Math.random() * currentIndex);
      randomRightIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element, left.
      temporaryValue = array[currentIndex][0];
      array[currentIndex][0] = array[randomLeftIndex][0];
      array[randomLeftIndex][0] = temporaryValue;

      // And swap it with the current element, right.
      temporaryValue = array[currentIndex][1];
      array[currentIndex][1] = array[randomRightIndex][1];
      array[randomRightIndex][1] = temporaryValue;
    }

    return array;
  }

  comparePeek = (a, b) => {
    return !!a && !!b && a[0] === b[0] && a[1] === b[1];
  }

  clearPeek = () => {
    this.setState({
      peek1: null, 
      peek2: null
    });
  }

  onCardClick = (name, column) => {
    const {matched, peek1, peek2} = this.state;

    const alreadyPeeking = this.comparePeek(peek1, [name, column]);

    if (peek2) {
      this.clearPeek();
      return;
    }

    if (matched[name] || alreadyPeeking) {
      return;
    }

    if (peek1) {
      if (peek1[0] === name) { // Found a match.
        this.setState({
          matched: Object.assign(matched, {[name]: true}),
          peek1: null,
          peek2: null,
        });
      } else { // Bad luck.
        this.setState({peek2: [name, column]});
      }
    } else {
      this.setState({peek1: [name, column]});
    }
  };

  render() {
    const {user} = this.props;
    const {order, peek1, peek2} = this.state;

    const styles = React.StyleSheet.create({
      parent: {
        //height: 600,
        padding: 16
      },
      contentContainer: { // imported
        padding: 10,
      },
      rightPane: {
        justifyContent: 'space-between',
        flex: 1,
      },
      movieTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
      },
      rating: {
        marginTop: 10,
      },
      ratingTitle: {
        fontSize: 14,
      },
      ratingValue: {
        fontSize: 28,
        fontWeight: '500',
      },
      mpaaWrapper: {
        alignSelf: 'flex-start',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 3,
        marginVertical: 5,
      },
      mpaaText: {
        fontFamily: 'Palatino',
        fontSize: 13,
        fontWeight: '500',
      },
      mainSection: {
        flexDirection: 'row',
      },
      separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: React.StyleSheet.hairlineWidth,
        marginVertical: 10,
      },
      castTitle: {
        fontWeight: '500',
        marginBottom: 3,
      },
      castActor: {
        marginLeft: 2,
      },

      horizontalView: {
        alignItems: 'center',
        flexDirection: 'row',
      },
    });

    const words = { // Map[["a", 1], ["b", 2], ["c", 3]]);
      'ant': require('../../ant.jpg'),
      'bat': require('../../bat.jpg'),
      'cat': require('../../cat.jpg'),
      'dog': require('../../dog.jpg'),
    };

    console.log(this.state);
    console.log(order);

    return (
      <React.View style={styles.parent}>
        <React.ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <React.Text>
              {`Welcome ${user}!`}
            </React.Text>
          </View>

          {order.map((row) => {
            const [text, image] = row;
            const leftClick = this.onCardClick.bind(this, text, 'left');
            const rightClick = this.onCardClick.bind(this, image, 'right');
            const showLeft = !!this.state.matched[text] || 
              this.comparePeek(peek1, [text, 'left']) ||
              this.comparePeek(peek2, [text, 'left']);
            const showRight = !!this.state.matched[image] ||
              this.comparePeek(peek1, [image, 'right']) ||
              this.comparePeek(peek2, [image, 'right']);
            console.log(text + showLeft + showRight + image + words[image]);

            return (
              <View key={text} style={styles.horizontalView}>
                <Card show={showLeft} onClick={leftClick} text={text} />
                <Card show={showRight} onClick={rightClick} image={words[image]} />
              </View>
            );
          })}
        </React.ScrollView>
      </React.View>
    );
  }
}

Game.propTypes = {
  user: React.PropTypes.string.isRequired,
};

export default Game;
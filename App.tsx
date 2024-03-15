import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const App = () => {
  const [playerOnePoints, setPlayerOnePoints] = useState(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState(0);

  const styles = StyleSheet.create({
    container1: {
      height: '50%',
      width: '100%',
      borderTopWidth: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      transform: [{rotate: '180deg'}],
    },

    container2: {
      height: '50%',
      width: '100%',
      borderTopWidth: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    score: {
      fontWeight: 'bold',
      fontSize: 50,
      paddingBottom: 12,
    },
  });

  const handlePressOne = () => {
    setPlayerOnePoints(prev => prev + 1);
  };
  const handlePressTwo = () => {
    setPlayerTwoPoints(prev => prev + 1);
  };

  return (
    <>
      <Pressable onPress={handlePressOne} style={styles.container1}>
        <View>
          <Text style={styles.score}>{playerOnePoints}</Text>
        </View>
      </Pressable>
      <Pressable onPress={handlePressTwo} style={styles.container2}>
        <View>
          <Text style={styles.score}>{playerTwoPoints}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default App;

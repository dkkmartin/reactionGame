import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const App = () => {
  const [playerOnePoints, setPlayerOnePoints] = useState(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState(0);
  const [playerTwoTurn, setPlayerTwoTurn] = useState(false);
  const [playerOneTurn, setPlayerOneTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [winner, setWinner] = useState('');

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

    container1Active: {
      height: '50%',
      width: '100%',
      borderTopWidth: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      transform: [{rotate: '180deg'}],
      backgroundColor: 'lightgreen',
    },

    container2Active: {
      height: '50%',
      width: '100%',
      borderTopWidth: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'lightgreen',
    },

    score: {
      fontWeight: 'bold',
      fontSize: 50,
      paddingBottom: 12,
    },

    menu: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    startButton: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 4,
    },

    startButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
    },
  });

  const startGame = () => {
    setWinner('');
    setIsWinner(false);
    setGameStarted(true);
    gameLoop();
  };

  const gameOver = () => {
    setPlayerOnePoints(0);
    setPlayerTwoPoints(0);
    setPlayerTwoTurn(false);
    setPlayerOneTurn(false);
    setGameStarted(true);
  };

  const randomSeconds = () => Math.floor(Math.random() * 6) + 2;

  const gameLoop = () => {
    setPlayerOneTurn(false);
    setPlayerTwoTurn(false);

    if (playerOnePoints >= 9) {
      setWinner('Player one wins!');
      setIsWinner(true);
      gameOver();
    } else if (playerTwoPoints >= 9) {
      setWinner('Player two wins!');
      setIsWinner(true);
      gameOver();
    } else {
      let gameInterval: NodeJS.Timeout;

      gameInterval = setInterval((): void => {
        setPlayerOneTurn(true);
        setPlayerTwoTurn(true);
        clearInterval(gameInterval);
      }, randomSeconds() * 1000);
    }
  };

  const handlePressOne = () => {
    if (!playerOneTurn) {
      setPlayerOnePoints(prev => (prev === 0 ? 0 : prev - 1));
    } else {
      setPlayerOnePoints(prev => prev + 1);
      gameLoop();
    }
  };

  const handlePressTwo = () => {
    if (!playerTwoTurn) {
      setPlayerTwoPoints(prev => (prev === 0 ? 0 : prev - 1));
    } else {
      setPlayerTwoPoints(prev => prev + 1);
      gameLoop();
    }
  };

  return (
    <View>
      {gameStarted ? (
        isWinner ? (
          <View style={styles.menu}>
            <Text style={styles.score}>{winner}</Text>
            <Pressable style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>Play again</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Pressable
              onPress={handlePressOne}
              style={
                playerOneTurn ? styles.container1Active : styles.container1
              }>
              <View>
                <Text style={styles.score}>{playerOnePoints}</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={handlePressTwo}
              style={
                playerTwoTurn ? styles.container2Active : styles.container2
              }>
              <View>
                <Text style={styles.score}>{playerTwoPoints}</Text>
              </View>
            </Pressable>
          </>
        )
      ) : (
        <View style={styles.menu}>
          <Pressable style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default App;

import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { colors, CLEAR, ENTER } from "../../src/styles";
import Keyboard from "../../src/Keyboard";

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

const filterWordsByLength = (wordPool, limit) => {
  return wordPool[limit] || [];
};

const GameTwo = ({ route }) => {
  const { wordLimit } = route.params;

  const navigation = useNavigation();
  
  const exitGame = () => {
    setModalVisible(true);
  };
  
  // Kelime havuzu
  const wordPool = {
    4: ["kuru", "yuva", "dans", "soda","oyun"],
    5: ["duvar", "metod", "kahve", "tatlı","eylül"],
    6: ["tuzluk", "yıldız", "parfüm", "yağmur","gözlük"],
    7: ["zelzele", "kelebek","kereste","oyuncak","darbuka"],
  };

  const [word, setWord] = useState(""); // Kullanıcının tahmin etmesi gereken kelime
  const [letters, setLetters] = useState([]); // Kelimenin harflerinin dizisi

  const [modalVisible, setModalVisible] = useState(false);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    // Timer zaten başlatılmışsa durdur
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerRef.current);
          setShowTimeoutAlert(true);
          startCountdown();
          return 60;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  
  const startCountdown = () => {
    setTimeout(() => {
      setShowTimeoutAlert(false);
      endGame();
    }, 10000);
  };

  const endGame = () => {};

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimer(60);
    startTimer();
  };

  const resetTimerOnMovement = () => {
    clearTimeout(timeoutRef.current);
    resetTimer();
    timeoutRef.current = setTimeout(() => {
      setShowTimeoutAlert(true);
      startCountdown();
    }, 60000);
  };
  

  useEffect(() => {
    resetTimerOnMovement();
  }, [curRow, curCol]);

  const [wordPoolWords, setWordPoolWords] = useState(() =>
  filterWordsByLength(wordPool, wordLimit));
  
useEffect(() => {
  const filteredWords = filterWordsByLength(wordPool, wordLimit);
  setWordPoolWords(filteredWords);
}, [wordLimit]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordPoolWords.length);
    const randomWord = wordPoolWords[randomIndex];
    setWord(randomWord);
    setLetters(randomWord.split(""));
  }, [wordLimit, wordPoolWords]);

  const renderWordPoolWords = () => {
    if (wordPoolWords.length === 0) return null;

    return (
      <View style={styles.wordPoolContainer}>
        {wordPoolWords.map((word, index) => (
          <Text key={index} style={styles.wordPoolText}>
            {word}
          </Text>
        ))}
      </View>
    );
  };
  
  
  const [rows, setRows] = useState(
    new Array(wordLimit).fill(new Array(wordLimit).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  useEffect(() => {
    if (curRow > 0) {
      GameState();
    }
  }, [curRow]);

  const GameState = () => {
    if (IfWon()) {
      Alert.alert("Kazandiniz!", "Tebrikler!", [
        {
          text: "Tamam",
          onPress: () => navigation.navigate('Selection', { gameType: route.params.gameType }), // Yönlendirme
        },
      ]);
    } else if (IfLost()) {
      Alert.alert("Kaybettiniz!", "Oyun Sona Erdi!");
    }
  };
  
  const IfWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const IfLost = () => {
   

    if (curRow === rows.length) {
      let greenScore = 0;
      let yellowScore = 0;
  
  
      const lastRow = rows[curRow - 1];
      lastRow.forEach((letter, col) => {
        if (letter === letters[col]) {
          greenScore += 10;
        } else if (letters.includes(letter)) {
          yellowScore += 5;
        }
      });
  
      const totalScore = greenScore + yellowScore;
  
      Alert.alert(
        "SKOR",
        `Yeşil Harfler: ${greenScore} \nSarı Harfler: ${yellowScore} \n\nTOPLAM PUAN: ${totalScore}`,
        [
          {
            text: "Tamam",
            onPress: () => navigation.navigate('Selection', { gameType: route.params.gameType }), // Yönlendirme
          },
        ]
      );
      
  
      return true;
    }
    return false;
  };
  

  const onKeyPressed = (key) => {
    // Timer'ı sıfırla
    resetTimer();
  
    clearTimeout(timeoutRef.current);
  
    const updatedRows = copyArray(rows);
  
    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }
  
    if (key === ENTER) {
      if (curCol === updatedRows[curRow].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }
  
    if (curCol < updatedRows[curRow].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      if (curCol + 1 === updatedRows[curRow].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      } else {
        setCurCol(curCol + 1);
      }
    }
  };
  
  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (letter, row, col) => {
    if (row > curRow || (row === curRow && col > curCol)) {
      return colors.black;
    }

    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyor musunuz?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonYes]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Selection', { gameType: route.params.gameType });
                }}
              >
                <Text style={styles.buttonText}>Evet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hayır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
 
 <Text style={styles.title}>KELİMELİK</Text>
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{timer}</Text>
    </View>
    {renderWordPoolWords()}
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(letter, i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      
      </ScrollView>
      
      <Keyboard onKeyPressed={onKeyPressed} />
      {renderModal()}
 
    <TouchableOpacity style={styles.exitButton} onPress={exitGame}>
      <Text style={styles.exitButtonText}>Oyundan Çık</Text>

    </TouchableOpacity>

  {showTimeoutAlert && (
        <View style={styles.timeoutAlertContainer}>
          <Text style={styles.timeoutAlertText}>
            1 dakika boyunca deneme yapılmadı!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    marginTop: 80,
    color: colors.black,
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  timeoutAlertContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  timeoutAlertText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    alignSelf: "stretch",
    marginVertical: 20,
    height: 100,
  },
  cell: {
    borderColor: colors.darkgrey,
    borderWidth: 3,
    aspectRatio: 1,
    margin: 3,
    flex: 1,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonYes: {
    backgroundColor: "#2196F3",
  },
  buttonNo: {
    backgroundColor: "#FF5733",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  exitButton: {
    position: 'absolute',
    top: 28,
    right: 4,
    backgroundColor: "black", // Kırmızı button arka plan rengi
    padding: 10,
    borderRadius: 20,
  },
  exitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  wordPoolContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  wordPoolText: {
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lightgrey,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default GameTwo;
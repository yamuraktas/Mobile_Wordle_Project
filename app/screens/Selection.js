import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";

import { useNavigation } from '@react-navigation/native';

const Selection = ({ navigation, route }) => {
  const { gameType } = route.params;

  const startGame = (selectedGameType, wordLimit) => {
    if (selectedGameType === "free") {
      navigation.navigate("GameTwo", { gameType: selectedGameType, wordLimit });
    }
  };
  
  const signOutUser = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      alert("Successfully signed out");
      navigation.navigate("Login"); // Oturum kapatıldıktan sonra Login ekranına yönlendir
    } catch (error) {
      console.log(error);
      alert("Sign out failed: " + error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={signOutUser}>
  <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
</TouchableOpacity>


      <Text style={styles.title}>Oyun Türü Seçimi</Text>
      <TouchableOpacity
        onPress={() => startGame("free", 4)} // Serbest Kelime Oyunu için
        style={[styles.button, styles.buttonMargin, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>
          Serbest Kelime - 4 Harf
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => startGame("free", 5)} // Serbest Kelime Oyunu için
        style={[styles.button, styles.buttonMargin, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>
          Serbest Kelime  - 5 Harf
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => startGame("free", 6)} // Serbest Kelime Oyunu için
        style={[styles.button, styles.buttonMargin, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>
          Serbest Kelime  - 6 Harf
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => startGame("free", 7)} // Serbest Kelime Oyunu için
        style={[styles.button, styles.buttonMargin, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>
          Serbest Kelime  - 7 Harf
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6EAF8", 
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20, 
    color: "#000000", 
  },
  button: {
    backgroundColor: "#1DC4D8", 
    width: "80%", // Button genişliği
    padding: 16, // Padding değeri
    //borderColor: "black",
    //borderWidth: 3, 
    borderRadius: 20, 
    alignItems: "center", 
  },
  buttonMargin: {
    marginVertical:8, 
  },
  buttonOutline: {
    Color: "#FFFFFF", 
    marginTop: 5, 
    //borderColor: "#000000", 
  },
  buttonOutlineText: {
    color: "#FFFFFF", 
    fontWeight: "800", 
    fontSize: 24, 
  },
  logoutButton: {
    position: 'absolute',
    top: 28,
    right: 4,
    backgroundColor: "black", 
    padding: 10,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
import React, { useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const navigateToSelection = (gameType) => {
    navigation.navigate("Selection", { gameType });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigateToSelection(); // Giriş başarılı olduğunda Selection ekranına yönlendir
    } catch (error) {
      console.log(error);
      alert("Sign in failed " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your emails for verification");
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.header}>KELİMELİK</Text> 
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => signIn()} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signUp()}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Create account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#D6EAF8",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 25, // Kutu içeriğinden dışa doğru dolgu
    backgroundColor: "#1DC4D8", // Arkaplan rengi
    color: "white", // Yazı rengi
    borderRadius: 40, // Yuvarlak kenarlı kutu
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#1DC4D8",
    fontSize: 18,
    width: "100%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#1DC4D8",
    width: "100%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#1DC4D8",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonOutlineText: {
    color: "#1DC4D8",
    fontWeight: "700",
    fontSize: 18,
  },
});

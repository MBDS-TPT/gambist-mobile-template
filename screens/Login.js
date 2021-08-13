import React, {useState} from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { UserService } from "../services/user/user.service";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const Login = (props) => {
  const { navigation } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    console.log("Login");
    setErrorMessage(undefined);
    if (!loginEmail) {
      console.log("Login empty");
      setErrorMessage('Please fill Email');
      return;
    }
    if (!password) {
      console.log("Password empty");
      setErrorMessage('Please fill Password');
      return;
    }
    setLoading(true);
    console.log('Calling user service with infos ', loginEmail, password);
    UserService.login(loginEmail, password)
      .then((res) => {
        console.log('Login Call')
        setLoading(false)
        if (res.message == "OK") {
          console.log('Login OK')
          const userIdToString = res.data.id.toString();
          AsyncStorage.setItem("userId", userIdToString)
            .then(() => {
              AsyncStorage.setItem("userName", res.data.username)
                .then(() => {
                  console.log(navigation);
                  navigation.replace("App");
                  console.log('Local storage saved');
                })
                .catch((error) => {
                  setErrorMessage(error + "");
                });
            })
            .catch((error) => {
              setErrorMessage(error + "");
            });
        } else {
          console.log('Wrong password');
          setErrorMessage(res.message+ "");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        console.log('Error with login');
        setErrorMessage(error + "");
      });
  };
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.1} middle>
                  <Text color="#8898AA" size={12}>
                    Welcome to Gambist
                  </Text>
                  
                </Block>
                <Block flex={0.18} middle>
                <Icon
                    size={46}
                    color={argonTheme.COLORS.ICON}
                    name="workspaces-outline"
                    family="MaterialIcons"
                    style={styles.inputIcons}
                  />
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        autoCapitalize='none'
                        borderless
                        placeholder="Email"
                        onChangeText={(UserEmail) =>
                          setLoginEmail(UserEmail)
                        }
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(UserPassword) =>
                          setPassword(UserPassword)
                        }
                        secureTextEntry={true}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                     
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          Forgot your password?
                        </Text>
                      </Block>
                    </Block>
                    { errorMessage && 
                      <Block row >
                          <Text bold size={12} color={argonTheme.COLORS.ERROR}>
                            {errorMessage}
                          </Text>
                      </Block>
                    }
                    
                    <Block middle>
                      <Button onPress={onLogin} color="primary" style={styles.createButton} loading={loading}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          SIGN IN
                        </Text>
                      </Button>
                    </Block>
                    <Block row width={width * 0.75} style={styles.passwordCheck}>
                      <Text color="#8898AA" size={12}>Don't have an account?</Text>
                      <Button
                        style={{ width: 100, position:"relative", bottom:22, right:20 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 12
                        }}
                        onPress={() => navigation.navigate('Register')}
                      >
                        Signup
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;

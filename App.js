import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { userProvider } from "./store/user/auth";
import { useFonts } from "@expo-google-fonts/inter";
import { getData } from "./handlers/localStorage";
import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./stacks/Authentication";
import { setTokenHeader } from "./services/tokenHeader";
import jwt_decode from "jwt-decode";
import { fetchUserData } from "./store/actions/user";
import Authenticated from "./stacks/Authenticated";
import { LinearGradient } from "expo-linear-gradient";

const queryClient = new QueryClient();

export default function App() {
  const { currentUser, setCurrentUser, logOut } = userProvider();

  let [fontsLoaded] = useFonts({
    FiragoRegular: require("./assets/fonts/FiraGO-Regular.otf"),
    FiragoBold: require("./assets/fonts/FiraGO-Bold.otf"),
    FiragoThin: require("./assets/fonts/FiraGO-Thin.otf"),
    FiragoLight: require("./assets/fonts/FiraGO-Light.otf"),
    FiragoBook: require("./assets/fonts/FiraGO-Book.otf"),
    Nino: require("./assets/fonts/bpg-nino-mtavruli-webfont.ttf"),
    NinoBold: require("./assets/fonts/bpg-nino-mtavruli-bold-webfont.ttf"),
  });

  useEffect(() => {
    //logOut();
    getData("secondaryToken").then((token) => {
      if (token) {
        setTokenHeader(token);
        var id = jwt_decode(token);
        try {
          fetchUserData(id, setCurrentUser);
        } catch (error) {
          setCurrentUser(false, null);
        }
      }
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#7BE495", "#329D9C"]}
      ></LinearGradient>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" translucent={true} />
        {currentUser.isAuthenticated ? (
          <Authenticated></Authenticated>
        ) : (
          <Authentication></Authentication>
        )}
      </QueryClientProvider>
    );
  }
}

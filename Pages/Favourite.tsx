import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { useRecoilState } from "recoil";
import { img_500 } from "../config/config";
import { DATA_STORAGE_KEY, inputGlobalState } from "./MovieDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

export default function Favourite(props: any) {
  const [favorite, setFavorite] = useRecoilState(inputGlobalState);

  const getFavourite = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFavourite(DATA_STORAGE_KEY).then((res) => {
      setFavorite(res);
    });
  }, []);

  const handleSubmit = (id: string) => {
    props.navigation.navigate("MovieDetails", { id: id });
  };
  return (
    <View style={styles.container}>
      {_.isEmpty(favorite) ? (
        <View>
          <Text style={styles.title}>No Favourite Movie</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            {console.log(favorite)}
            <FlatList
              data={favorite}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View style={styles.designContainer}>
                  <Image
                    source={{ uri: `${img_500}/${item.poster_path}` }}
                    style={styles.image}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.overview}>{item.overview}</Text>
                  <Button
                    title="Details"
                    onPress={() => {
                      handleSubmit(item.id);

                    }}
                   
                  />
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#39445a",
  },
  designContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  overview: {
    fontSize: 15,
    color: "black",
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
});

import React from "react";
import { AirbnbRating } from "react-native-ratings";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import { atom, useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  img_500,
  API_KEY,
} from "../config/config";
import axios, { AxiosResponse } from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import * as Linking from "expo-linking";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";

interface movieVariables {
  id: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  popularity: number;
  original_language: string;
}
interface resultKey {
  key: string;
}
interface videoVariable {
  results: resultKey[];
}

export const inputGlobalState = atom<movieVariables[]>({
  key: "inputDataState",
  default: [],
});

export const DATA_STORAGE_KEY = "@My_key1";

export const storeData = async (key:string, data: movieVariables[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};
const MovieDetails = (props: any) => {
  const id = props.route.params.id;
  const [globalState, setGlobalState] = useRecoilState(inputGlobalState);

  const fetchData = (id: string) => {
    return useQuery<AxiosResponse<movieVariables>>("GetMovie", () => {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
    });
  };

  const { data } = fetchData(id);

  const fetchVideo = (id: string) => {
    return useQuery<AxiosResponse<videoVariable>>("GetVideo", () => {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
    });
  };
  const dataArr = globalState.filter(
    (element) => element.id === data?.data?.id
  );
  const { data: videoData } = fetchVideo(id);

  const videoKey = videoData?.data?.results[0]?.key;

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={props.navigation} />
        <Text style={styles.title}>{data?.data.title}</Text>
        <Image
          source={{
            uri: `${img_500}${data?.data.backdrop_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.containerOverview}>
          <Text style={styles.titleOverview}>Overview</Text>
          <Text numberOfLines={3} style={styles.overview}>
            {data?.data.overview}
          </Text>
        </View>
        <AirbnbRating
          count={10}
          defaultRating={data?.data.vote_average!}
          size={20}
        />
        <View style={styles.voteCount}>
          <Text>
            <Text>Vote Count: </Text>
            {data?.data.vote_count}
          </Text>
          <Text> Popularity: {data?.data.popularity}</Text>
        </View>
        <View style={styles.languageWrapper}>
          <Text style={{ color: "lightblue" }}>
            Language: {data?.data.original_language}
          </Text>
          <Text style={{ color: "lightblue" }}>
            Vote Average: {data?.data.vote_average}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Text>Add To Favourite:</Text>

          <Pressable
            onPress={() => {
              if (dataArr.length === 1) {
                setGlobalState(
                  globalState.filter(
                    (item: movieVariables) => item.id !== data?.data.id
                  )
                );
                storeData(DATA_STORAGE_KEY, 
                  globalState.filter(
                    (item: movieVariables) => item.id !== data?.data.id
                  )
                );
              } else {
                setGlobalState([...globalState, data?.data!]);
                storeData(DATA_STORAGE_KEY, [...globalState, data?.data!]);
              }
            }}
          >
            {dataArr.length === 1 ? (
              <MaterialIcons name="favorite" size={24} color="red" />
            ) : (
              <MaterialIcons name="favorite" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <Button
          title="watch Trailer"
          onPress={() => {
            Linking.openURL(`https://www.youtube.com/watch?v=${videoKey}`);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#39445a",
  },
  title: {
    padding: 10,
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "white",
  },
  containerOverview: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  titleOverview: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  overview: {
    fontSize: 15,
    padding: 3,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 70,
    marginBottom: 10,
    flexDirection: "row",
  },
  voteCount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    fontSize: 15,
    color: "blue",
    borderWidth: 4,
    borderColor: "#20232a",
    marginTop: 10,
    marginBottom: 10,
  },
  languageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  buttonWrapper: {
    display: "flex",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

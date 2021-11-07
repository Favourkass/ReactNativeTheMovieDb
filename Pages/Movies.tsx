import React, { useEffect } from "react";
import axios from "axios";

import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import { atom } from "recoil";
import {
  img_500,
  API_KEY,
} from "../config/config";
import { FlatList } from "react-native";

interface MovieListProps {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: null | string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export const favouriteMovieCheck = atom<boolean>({
  key: "favouriteMoviCheck",
  default: false,
});

function Movies(props: any) {
  const [page, setPage] = React.useState(1);
  const [newContent, setNewContent] = React.useState<MovieListProps[]>([]);
  const [numOfPages, setNumOfPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  let listViewRef: FlatList<MovieListProps> | null;

  const fetchMovies = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      )
      .then((res) => {
        setNewContent([...newContent!, ...res?.data?.results]);
        setNumOfPages(res.data.total_pages);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const renderLooader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMore = () => {
    if (page < numOfPages) {
      setPage(page + 1);
    }
  };

  const handleSubmit = (id: string) => {
    props.navigation.navigate("MovieDetails", { id: id });
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <FlatList
          data={newContent}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image
                source={{
                  uri: `${img_500}/${item.poster_path}`,
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Button
                title="details"
                onPress={() => {
                  handleSubmit(item.id);
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          ref={(ref) => {
            listViewRef = ref;
          }}
          onEndReached={() => {
            loadMore();
          }}
          onEndReachedThreshold={20}
          ListFooterComponent={renderLooader}
        />
      </View>
    </View>
  );
}

export default Movies;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#39445a",
  },
  container: {
    paddingTop: 40,
    borderRadius: 90,
    backgroundColor: "white",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
    borderRadius: 30,
    flexDirection: "row",
  },

  title: {
    color: "#151515",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    alignSelf: "center",
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonClick: {
    backgroundColor: "#151515",
  },
});

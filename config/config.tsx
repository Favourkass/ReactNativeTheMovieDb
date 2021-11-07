//image sizes for tmdb
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

export const img_300 = "https://image.tmdb.org/t/p/w300";
export const img_500 = "https://image.tmdb.org/t/p/w500";
export const img_200 = "https://image.tmdb.org/t/p/w200";
export const API_KEY = '2394b155565604802f98664937234522';

// contentModal and singleContent
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

// contentModal
export const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

// For Carousel
export const noPicture =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
  export const URL = 'https://api.themoviedb.org/3/';

  export const TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzk0YjE1NTU2NTYwNDgwMmY5ODY2NDkzNzIzNDUyMiIsInN1YiI6IjYxN2JiZDY5M2UyZWM4MDA2MzVlYWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYwkq1nSqCtSb8bfAjHPV1V_nVAFDE4IidKzucJF7p8"
  interface videoVariable{
    key: string;
  }
  
  export const fetchVideo = (id: string) => {
    return useQuery <AxiosResponse<videoVariable>>('GetVideo', () => {
      return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
    })
  }

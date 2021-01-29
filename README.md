# MovieLibrary

# Watch it live [here]

#### Movie library app that fetches data from [OMDB API](http://www.omdbapi.com/)

This project is build in HTML, CSS, vanilla js, webpack, and also uses babel and axios.

To clone the repository and use the following commands
### To run in development mode
```
npm run dev
```

### To create a production build

```
npm run build
```

### For Live-Server reloading

```
npm run start
```

#### To use the OMDB API you need to get an API key and create .env file and then add the API key the file like:
API_KEY=yourapikey

PROXY=https://thingproxy.freeboard.io/fetch/

#### To access the API key in your search and movie model:
const apiKey=process.env.API_KEY;

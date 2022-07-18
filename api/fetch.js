================================
GET- Fetching data with query param
================================


 //react state management
    const [movies, setMovies] = useState([]);

    //gets called whenever the page loaded
    useEffect(() => {
      searchMovies("Batman");
      console.log("heelo " + movies.length)
    }, []);
  
  //react
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };



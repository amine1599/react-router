import React, { useState, useContext } from 'react';
import {Card,Form,Button,Row,Col} from 'react-bootstrap'
import {Routes,Route,useNavigate,Link} from 'react-router-dom'
// MovieCard component
const MovieCard = ({ movie }) => {
  const { title, description, posterURL, rating, trailerLink } = movie;
  const navigate = useNavigate()
  const handleNavigate =()=>{
    navigate(`/movies/${title}`)
    localStorage.setItem("movie",JSON.stringify(movie))
  }
  return (
    <Card className="d-flex align-items-center justify-content-center mb-3"  >
      <Card.Img src={posterURL} alt={title} className="movie-card__poster" style={{width:'300px',height:'250px', marginTop:"3px"}}/>
      <Card.Body>
        <Card.Title className="movie-card__title">{title}</Card.Title>
        <Card.Text className="movie-card__description">{description}</Card.Text>
        <Card.Text className="movie-card__rating">Rating: {rating}</Card.Text>
      </Card.Body>
      <Button onClick={handleNavigate}>Description</Button>
    </Card>
  );
};
// Description Component
const Description = ()=>{
  
  const navigate = useNavigate()
  const item = localStorage.getItem('movie')
  const movie=JSON.parse(item)
  
  const handleNavigateBack =()=>{
    navigate('/')
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
          <iframe width="560" height="315" src={movie.trailerLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Col>
          <Col>
          <Card.Text>{movie.description}</Card.Text>
          </Col>
        </Row>
        <Button onClick={handleNavigateBack}>Back</Button>
      </Card.Body>
    </Card>
  )
}

// MovieList component
const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

// Filter component
const Filter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleFilter = (event) => {
    event.preventDefault()
    onFilter({ title, rating });
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"3px"}}>
    <Form className="filter-form" style={{display: "flex", alignItems: "center"}}>
      <Form.Group>
      <Form.Control type="text" placeholder="Filter by title" className="filter-input" value={title} onChange={handleTitleChange} style={{marginRight: "10px",padding: "8px",borderRadius: "4px",border: "1px solid #ccc"}}/>
      </Form.Group>
      
      <Form.Group>
      <Form.Control type="number" placeholder="Filter by rating" className="filter-input" value={rating} onChange={handleRatingChange} style={{marginRight: "10px",padding: "8px",borderRadius: "4px",border: "1px solid #ccc"}}/>
      </Form.Group>
       
       <Button variant="primary" type="submit" className="filter-button" onClick={handleFilter} style={{marginLeft:"10px"}}>Filter</Button>

    </Form>
    </div>
  );
};

// MovieContext
const MovieContext = React.createContext([]);
// Home Component

// App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Movie 1',
      description: 'Description of Movie 1',
      trailerLink: 'https://www.youtube.com/embed/uWM4oQYHslM',
      posterURL: 'https://picsum.photos/200',
      rating: 4.5,
    },
    {
      title: 'Movie 2',
      description: 'Description of Movie 2',
      trailerLink: 'https://www.youtube.com/embed/p2zMXSXhZ9M',
      posterURL: 'https://picsum.photos/200',
      rating: 3.8,
    },
    
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilter = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(title.toLowerCase());
      const matchesRating = movie.rating >= Number(rating);
      return matchesTitle && matchesRating;
    });

    setFilteredMovies(filtered);
  };

  return (
    <div className="app">
     
      <h1 style={{textAlign:"center"}}>Movie App</h1>
      
      <Filter onFilter={handleFilter} />
      <MovieContext.Provider value={{ movies: filteredMovies }}>
        <Routes>
          <Route path='/' element={<MovieList/>} ></Route>
          <Route path='/movies/:title' element={<Description />} ></Route>
        </Routes>
      </MovieContext.Provider>
      
      
    </div>
  );
};

export default App;

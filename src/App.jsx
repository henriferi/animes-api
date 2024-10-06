import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #8e24aa;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const AnimeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
`;

const AnimeCard = styled.li`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const AnimeName = styled.h2`
  font-size: 1.5rem;
  color: #8e24aa;
  margin: 15px 0 10px;
`;

const AnimeSynopsis = styled.p`
  color: #555;
  font-size: 0.9rem;
`;

// Main Component
const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredAnimes, setFilteredAnimes] = useState([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get('https://kitsu.io/api/edge/anime?page[limit]=20');
        const animeData = response.data.data;

        const animeList = animeData.map(anime => ({
          name: anime.attributes.canonicalTitle,
          synopsis: anime.attributes.synopsis,
          image: anime.attributes.posterImage.small,
        }));

        setAnimes(animeList);
        setFilteredAnimes(animeList); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimes();
  }, []);


  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = animes.filter((anime) =>
      anime.name.toLowerCase().includes(term)
    );
    setFilteredAnimes(filtered);
  };

  return (
    <Container>
      <Title>Lista de Animes</Title>
      <SearchInput
        type="text"
        placeholder="Busque um anime pelo nome..."
        value={searchTerm}
        onChange={handleSearch}   
      />
      <AnimeGrid>
        {filteredAnimes.length > 0 ? (
          filteredAnimes.map((anime, index) => (
            <AnimeCard key={index}>
              <AnimeImage src={anime.image} alt={anime.name} />
              <AnimeName>{anime.name}</AnimeName>
              <AnimeSynopsis>{anime.synopsis}</AnimeSynopsis>
            </AnimeCard>
          ))
        ) : (
          <p>Nenhum anime encontrado</p>
        )}
      </AnimeGrid>
    </Container>
  );
};

export default AnimeList;

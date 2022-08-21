import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const categories = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "The mountains" },
  { "name": "Architecture" },
  { "name": "Cities" }
]

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => 
  {
    setIsLoading(true);

    const category =  categoryId ? `category=${categoryId}` : '';

    fetch(`https://63024bccc6dda4f287b73c90.mockapi.io/photo_collections?page=${page}&limit=3&${category}`).then(res => res.json()).then(json => {
      setCollections(json);
    })
      .catch(err => {
        console.log(err);
        alert('Error while getting data');
      }).finally(()=>{
        setIsLoading(false);
      })
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((obj, i) => (
              <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active': ''} key={obj.name}>
                {obj.name}
              </li>
            ))
          }
        </ul>
        <input onChange={value => setSearchValue(value.target.value)} className="search-input" placeholder="Search by name" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка ...</h2>
          ) : (
            collections.filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            }).map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
               />
            )))
    
        }
      </div>
      <ul className="pagination">
       {[...Array(5)].map((_, i) => (
          <li onClick={() => {setPage(i + 1)}} className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

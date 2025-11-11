import { useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import FactsList from './components/FactsList';
import Formfact from './components/Formfact';
import Header from './components/Header';
import { useEffect } from 'react';

import { supabase } from './lib/supabase';
import { initialFacts } from './data/category-initial-data';
import Loader from './components/Loader';

const App = () => {
  const [loadData, setLoadData] = useState(initialFacts);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase.from('facts').select();
    if (error) {
      console.error(error);
    } else {
      setLoadData(data);

      const seletedCategory = JSON.parse(localStorage.getItem('category'));
      if (!seletedCategory || seletedCategory === 'All') {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter((d) => d.category === seletedCategory));
      }
    }
  };

  const toggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  const filterHandle = (category) => {
    setFilteredData(
      category === 'All'
        ? loadData
        : loadData.filter((c) => c.category === category)
    );
    localStorage.setItem('category', JSON.stringify(category));
  };

  useEffect(() => {
    const render = async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    };
    render();
  }, []);

  return (
    <div className="contianer">
      <Header toggleForm={toggleForm} isOpen={isOpenForm} />
      <Formfact
        isOpen={isOpenForm}
        fetchData={fetchData}
        setIsOpenForm={setIsOpenForm}
      />
      <main className="main">
        <CategoryFilter filterHandle={filterHandle} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactsList data={filteredData} fetchData={fetchData} />
        )}
      </main>
    </div>
  );
};

export default App;

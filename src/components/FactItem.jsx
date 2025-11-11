import { useState } from 'react';
import { CATEGORIES } from '../data/category-color';
import { supabase } from '../lib/supabase';

const FactItem = ({
  id,
  text,
  soucre,
  category,
  votesInteresting,
  votesMindblowing,
  votesFalse,
  fetchData,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const updateVote = async (vote, score, id) => {
    try {
      setIsUpdate(true);
      const { error } = await supabase
        .from('facts')
        .update({ [vote]: score + 1 })
        .eq('id', id);
      if (error) throw error;

      fetchData();
      setIsUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="fact">
      <p>
        {text}
        <a className="source" href={soucre} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: `${
            CATEGORIES.find((c) => c.name === category).color
          }`,
        }}
      >
        {category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => updateVote('votesInteresting', votesInteresting, id)}
          disabled={isUpdate}
        >
          👍 {votesInteresting}
        </button>
        <button
          onClick={() => updateVote('votesMindblowing', votesMindblowing, id)}
          disabled={isUpdate}
        >
          🤯 {votesMindblowing}
        </button>
        <button
          onClick={() => updateVote('votesFalse', votesFalse, id)}
          disabled={isUpdate}
        >
          ⛔️ {votesFalse}
        </button>
      </div>
    </li>
  );
};

export default FactItem;

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
  const updateVote = async (vote, score, id) => {
    try {
      const { error } = await supabase
        .from('facts')
        .update({ [vote]: score + 1 })
        .eq('id', id);
      if (error) throw error;

      fetchData();
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
        >
          👍 {votesInteresting}
        </button>
        <button
          onClick={() => updateVote('votesMindblowing', votesMindblowing, id)}
        >
          🤯 {votesMindblowing}
        </button>
        <button onClick={() => updateVote('votesFalse', votesFalse, id)}>
          ⛔️ {votesFalse}
        </button>
      </div>
    </li>
  );
};

export default FactItem;

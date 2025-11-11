import { CATEGORIES } from '../data/category-color';
import { supabase } from '../lib/supabase';

const Formfact = ({ isOpen, fetchData, setIsOpenForm }) => {
  const isValidHttpUrl = (str) => {
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const createNewFact = async (fact) => {
    try {
      const { error } = await supabase.from('facts').insert(fact);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      const formData = new FormData(form);

      const inputForm = Object.fromEntries(formData.entries());

      if (
        !inputForm.text.trim() ||
        !inputForm.soucre.trim() ||
        !isValidHttpUrl(inputForm.soucre) ||
        inputForm.category.length === 0
      ) {
        throw new Error('Please input data, Check input again');
      }

      await createNewFact(inputForm);

      await form.reset();

      await setIsOpenForm(false);

      await fetchData();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      {isOpen && (
        <form className="fact-form" onSubmit={submitHandle}>
          <input
            type="text"
            placeholder="Share a fact with the world..."
            name="text"
          />
          <input
            type="text"
            placeholder="Trustworthy source..."
            name="soucre"
          />
          <select name="category">
            <option value="">Choose category:</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <button className="btn btn-large" type="submit">
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default Formfact;

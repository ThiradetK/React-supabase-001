import { CATEGORIES } from '../data/category-color';

const CategoryFilter = ({ filterHandle }) => {
  const category = CATEGORIES.map((c) => c.name);

  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => filterHandle('All')}
          >
            All
          </button>
        </li>
        {category.map((category) => (
          <li className="category" key={category}>
            <button
              className="btn btn-category"
              style={{
                backgroundColor: `${
                  CATEGORIES.find((c) => c.name === category).color
                }`,
              }}
              onClick={() => filterHandle(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;

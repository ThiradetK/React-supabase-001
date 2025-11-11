import FactItem from './FactItem';

const FactsList = ({ data, fetchData }) => {
  return (
    <section>
      <ul className="facts-list">
        {data.length > 0 ? (
          data
            .sort((a, b) => b.id - a.id)
            .map((d) => <FactItem key={d.id} {...d} fetchData={fetchData} />)
        ) : (
          <p className="message-medium">
            NO FACTS FOR THIS CATEGORY YET! CREATE THE FIRST ONE 🤞
          </p>
        )}
      </ul>
    </section>
  );
};

export default FactsList;

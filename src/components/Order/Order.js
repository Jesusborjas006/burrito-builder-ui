const Order = (props) => {

  return (
    <>
      <div className="order">
        <h3>{props.name}</h3>
        <ul className="ingredient-list">
          {props.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Order;

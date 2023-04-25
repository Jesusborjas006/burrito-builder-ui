const Order = (props) => {
  console.log(props);
  return (
    <>
      <div className="order">
        <h3>{props.name}</h3>
        <ul className="ingredient-list">
          {props.ingredients.map((ingredient) => (
            <li key={`${props.name}-${props.id + 1}`}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Order;

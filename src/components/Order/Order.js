const Order = (props) => {
  console.log(props);
  console.log(props.ingredients.map((ingredient) => ingredient));
  return (
    <>
      <div className="order">
        <h3>{props.name}</h3>
        <ul className="ingredient-list">
          {props.ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Order;

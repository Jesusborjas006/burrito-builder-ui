import React, { Component } from "react";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleNameChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    console.log("Submitted");
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state,
    };
    this.props.newOrderFunc(newOrder);

    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(event) => this.handleNameChange(event)}
        />
        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

export default OrderForm;

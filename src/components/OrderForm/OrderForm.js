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

  handleIngredientChange = (event) => {
    event.preventDefault();
    console.log("Ingredient Name", event.target.name);
    console.log("Value", event.target.value);
    this.setState({
      [event.target.ingredients]: this.state.ingredients.push(
        event.target.value
      ),
    });
  };

  handleSubmit = (e) => {
    console.log("Submitted");
    if (this.state.name && this.state.ingredients.length >= 1) {
      e.preventDefault();
      const newOrder = {
        id: Date.now(),
        ...this.state,
      };
      // this.props.newOrderFunc(newOrder);
      this.clearInputs();
    } else {
      <h2>Must complete form</h2>;
    }
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

    console.log(this.state.ingredients);
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          value={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
          required
        >
          {ingredient}
        </button>
      );
    });

    return (
      <>
        <form>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={(event) => this.handleNameChange(event)}
            required
          />
          {ingredientButtons}

          <p>
            Order: {this.state.ingredients.join(", ") || "Nothing selected"}
          </p>

          <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
        </form>
      </>
    );
  }
}

export default OrderForm;

describe("Should be able to add new order", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      codeStatus: 200,
      fixture: "orders.json",
    });
    cy.visit("http://localhost:3000/");
  });

  it("Should start with three orders", () => {
    cy.get(".order-container").children().should("have.length", 3);
  });

  it("Should be able to add a new order when filling out form", () => {
    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/orders",
      },
      {
        statusCode: 200,
        body: {
          id: 4,
          name: "Bob",
          ingredients: ["beans", "steak", "queso fresco", "pico de gallo"],
        },
      }
    )
      .get("form")
      .get("input")
      .type("Bob")
      .get(".ingredient-btn")
      .first()
      .click()
      .get(".ingredient-btn")
      .eq(1)
      .click()
      .get(".ingredient-btn")
      .eq(5)
      .click()
      .get(".ingredient-btn")
      .eq(6)
      .click()
      .get("form")
      .get("p")
      .contains("Order: beans, steak, queso fresco, pico de gallo")
      .get(".submit-btn")
      .click();

    cy.get(".order-container").children().should("have.length", 4);

    cy.get(".order-container")
      .children()
      .eq(3)
      .should("contain", "Bob")
      .and("contain", "beans")
      .and("contain", "steak")
      .and("contain", "queso fresco")
      .and("contain", "pico de gallo");
  });

  it("Should let user know to fill out name input to submit order", () => {
    cy.get(".submit-btn").click();

    cy.get("input").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");

      cy.get(".order-container").children().should("have.length", 3);
    });
  });

  it("Should not display a new order if no ingredients were clicked and lets user know with an alert", () => {
    cy.get(".order-container").children().should("have.length", 3);
    cy.get("form").get("input").type("Bob");
    cy.get(".submit-btn").click();
    cy.get(".order-container").children().should("have.length", 3);
  });
});

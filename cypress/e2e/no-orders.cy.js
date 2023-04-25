describe("Content the user sees when theres no orders", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      codeStatus: 200,
      fixture: "no-orders.json",
    });
    cy.visit("http://localhost:3000/");
  });

  it("Should not display any orders to page and display message to user", () => {
    cy.get(".App > :nth-child(2)").contains("No orders yet!");
  });

  it("Should get rid of the message when an order is added", () => {
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
    cy.get(".no-orders-text").should("not.exist");
    cy.get(".order").should("exist");

    cy.get(".order-container")
      .children()
      .eq(0)
      .should("contain", "Bob")
      .and("contain", "beans")
      .and("contain", "steak")
      .and("contain", "queso fresco")
      .and("contain", "pico de gallo");
  });
});

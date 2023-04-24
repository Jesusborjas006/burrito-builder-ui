describe("Should test all content being shown to user", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      codeStatus: 200,
      fixture: "orders.json",
    });
    cy.visit("http://localhost:3000/");
  });

  it("Should have a title", () => {
    cy.get("h1").contains("Burrito Builder");
  });

  it("Should have three different orders being displayed", () => {
    cy.get(".order-container").children().should("have.length", 3);

    cy.get(".order-container").get(".order").eq(0).contains("Jesus")

    cy.get(".order-container").get(".order").eq(1).children().eq(1).contains("steak")

    cy.get(".order-container").get(".order").eq(1).children().eq(1).contains("jalapeno")

    cy.get(".order-container").get(".order").eq(2).contains("John")
    cy.get(".order-container").get(".order").eq(2).contains("sofritas")
  });

  it("Should display a form container with different inputs", () => {
    cy.get('form').get("input").should("be.visible")

    cy.get("form").get(".ingredient-btn").should("have.length", 12)

    cy.get(".ingredient-btn").first().contains("beans")

    cy.get(".ingredient-btn").last().contains("sour cream")

    cy.get(".submit-btn").contains("Submit Order")
  })

  it("Should display a text saying that no order is selected", () => {
    cy.get("form").get("p").contains("Order: Nothing selected")
  })
});

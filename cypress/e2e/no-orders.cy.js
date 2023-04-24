describe('Content the user sees when theres no orders', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      codeStatus: 200,
      fixture: "no-orders.json",
    });
    cy.visit("http://localhost:3000/");
  })

  it("Should not display any orders to page and display message to user", () => {
    cy.get('.App > :nth-child(2)').contains("No orders yet!")
  })

  it("Should get rid of the message when an order is added", () => {
    cy.get("form").get("input").type("Bob");
    cy.get(".ingredient-btn").first().click();
    cy.get(".ingredient-btn").eq(1).click();
    cy.get(".ingredient-btn").eq(5).click();
    cy.get(".ingredient-btn").eq(6).click();
    cy.get("form")
      .get("p")
      .contains("Order: beans, steak, queso fresco, pico de gallo");
    cy.get(".submit-btn").click();
    cy.get('.no-orders-text').should('not.exist');
    cy.get(".order").should("exist")
  })
})
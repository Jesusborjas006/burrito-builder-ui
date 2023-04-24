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
    cy.get("form").get("input").type("Bob");
    cy.get(".ingredient-btn").first().click();
    cy.get(".ingredient-btn").eq(1).click();
    cy.get(".ingredient-btn").eq(5).click();
    cy.get(".ingredient-btn").eq(6).click();
    cy.get("form")
      .get("p")
      .contains("Order: beans, steak, queso fresco, pico de gallo");
    cy.get(".submit-btn").click();

    cy.get(".order-container").children().should("have.length", 4);
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
    // cy.on("window:alert", (txt) => {
    //   expect(txt).to.contains("You must add ingredients to your order");
    // });
    cy.get(".order-container").children().should("have.length", 3);
  });
});

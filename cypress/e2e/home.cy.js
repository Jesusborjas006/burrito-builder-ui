describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      codeStatus: 200,
      fixture: "orders.json"
    });
    cy.visit("http://localhost:3000/");
  });

  it("Should have a title", () => {
    cy.get("h1").contains("Burrito Builder");
  });
});

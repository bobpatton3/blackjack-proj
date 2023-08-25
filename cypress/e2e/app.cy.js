describe("Page populated when Shuffle pressed", () => {
  it("should load a deck of cards and deal two card to the player and two to the dealer", () => {
    cy.visit("http://localhost:3000");

    cy.contains("button", "Shuffle").click();

    cy.contains("Dealer Count:");
    cy.contains("Player Count:");
    cy.contains("Cards Remaining: 48");

    cy.get('img[class*="cardClass"]').should("have.length", 4);

    cy.contains("button", "Hit Me!").click();
    cy.contains("Cards Remaining: 47");

    cy.contains("button", "Deal").click();
    cy.contains("Cards Remaining: 43");
  });
});

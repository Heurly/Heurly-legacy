describe("Test du composant LoginPage", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it('Contient le logo avec attribut data-cy="logo"', () => {
    cy.get("[data-cy=logo]").should("exist");
  });

  it('Contient le texte "Pour les étudiants Par les étudiants"', () => {
    cy.contains("Pour les étudiants Par les étudiants").should("exist");
  });

  it("Contient un bouton", () => {
    cy.get("button").should("exist");
  });

  it('Contient une icône de logo Google avec attribut data-cy="googleIcon"', () => {
    cy.get("[data-cy=googleIcon]").should("exist");
  });
});

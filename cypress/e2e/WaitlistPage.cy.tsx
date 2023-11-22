describe("Test de la page waitlist", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('Affiche le logo avec attribut data-cy="logo"', () => {
    cy.get("[data-cy=logo]").should("exist");
  });

  it('Affiche le texte "Entrer votre email pour être sur la waitlist"', () => {
    cy.contains("Entrer votre email pour être sur la waitlist").should("exist");
  });

  it('Affiche le texte "Accepter les CGU"', () => {
    cy.contains("Accepter les CGU").should("exist");
  });

  it('Affiche un bouton "S\'abonner"', () => {
    cy.contains("S'abonner").should("exist");
  });

  it("Affiche un input de type email", () => {
    cy.get('input[type="email"]').should("exist");
  });

  it('Affiche un switch avec attribut data-cy="switch"', () => {
    cy.get("[data-cy=switch]").should("exist");
  });

  it('Affiche le texte "Vous êtes bien sur la waitlist" après soumission du formulaire', () => {
    cy.get('input[type="email"]').type("test@test.fr");
    cy.get('[data-cy="switch"]').click();
    cy.contains("S'abonner").click();
    cy.contains("Vous êtes bien sur la waitlist").should("exist");
    cy.url().should("include", "?success=true");
  });

  it("Désactive le bouton 'S'abonner' si l'utilisateur n'accepte pas les CGU", () => {
    cy.get('input[type="email"]').type("test@test.fr");
    cy.contains("S'abonner").should("be.disabled");
  });

  it("Désactive le bouton 'S'abonner' si l'utilisateur ne rentre pas l'email mais à accepter les CGU", () => {
    cy.get('[data-cy="switch"]').click();
    cy.contains("S'abonner").should("be.disabled");
  });
});

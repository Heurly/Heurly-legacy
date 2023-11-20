import TopBar from "@/components/Topbar";

describe("NavBar Component test", () => {
  beforeEach(() => {
    cy.mount(<TopBar />);
  });

  it("contains the logo", () => {
    cy.get("[data-cy=logo]").should("be.visible");
  });

  it("contains the settings icon", () => {
    cy.get("[data-cy=settingsIcon]").should("be.visible");
  });
});

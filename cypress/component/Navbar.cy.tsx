import NavBar from "../../src/components/Navbar";

describe("NavBar Component test", () => {
  beforeEach(() => {
    cy.mount(<NavBar />);
  });

  it("contains the logo", () => {
    cy.get("[data-cy=logo]").should("be.visible");
  });

  it("contains the event icon", () => {
    cy.get("[data-cy=eventIcon]").should("be.visible");
  });

  it("contains the revision icon", () => {
    cy.get("[data-cy=revisionIcon]").should("be.visible");
  });

  it("contains the timetable icon", () => {
    cy.get("[data-cy=timetableIcon]").should("be.visible");
  });

  it("contains the settings icon", () => {
    cy.get("[data-cy=settingsIcon]").should("be.visible");
  });

  it("contains the logout icon", () => {
    cy.get("[data-cy=logoutIcon]").should("be.visible");
  });
  it("contains the user icon", () => {
    cy.get("[data-cy=userIcon]").should("be.visible");
  });
});

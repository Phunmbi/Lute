import { parseDate } from "../../src/utils/helpers";

describe("View base dashboard test", () => {
	it("Load dashboard page and confirm content", () => {
		cy.visit("http://localhost:1234");

		// fill login form and trigger login
		cy.get("#cy-login-input-email").type("phunmbi@gmail.com");
		cy.get("#cy-login-input-password").type("deadass");
		cy.get("#cy-login-input-submit").click();

		// confirm sign in
		cy.contains("Orders").should("be.visible");

		// simulate create flow
		cy.get("#cy-create-button").click();
		cy.get("#cy-create-input-title").type("Sample test");
		cy.get("#cy-create-input-customer-name").type("Cypress automation");
		cy.get("#cy-create-input-bookingDate").type(
			parseDate(new Date()) as string
		);
		cy.get("#cy-create-input-address-country").type("Nigeria");
		cy.get("#cy-create-input-submit").click();

		// simulate view All
		// cy.get("button").should("be.at.least", 10);
		cy.contains("Load more").should("be.visible");
		cy.contains("Manage Orders").should("be.visible");
		cy.contains("Title").should("be.visible");
		cy.contains("Kemi").should("be.visible");

		//initiate logout
		cy.get("#cy-logout").click();

		// confirm logout
		cy.contains("Lute").should("be.visible");
		cy.contains("Login").should("be.visible");
	});
});

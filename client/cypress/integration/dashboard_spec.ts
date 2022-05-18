describe("View base dashboard test", () => {
	it("Load dashboard page and confirm content", () => {
		cy.visit('http://localhost:1234');
		
		cy.contains("Orders History").should("be.visible");
	});
});

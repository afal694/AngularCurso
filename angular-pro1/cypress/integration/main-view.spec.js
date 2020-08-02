const { createYield } = require("typescript");

describe('ventana principal', () => {
    it('Tiene encabezado correcto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Proyecto Angular');
        cy.contains('Home').click();

        cy.url().should('include', '/home');

        // ingresa nombre
        cy.get('#nombre')
            .type('Cundinamarca')
            .should('have.value', 'Cundinamarca')

        // ingresa url
        cy.get('#imagenUrl')
            .type('1564')
            .should('have.value','1564');
        
        //guarda

        cy.contains('Guardar!').click();
    });

    it('Logea usuario', () => {
        cy.contains('Login').click();
        // ingresa nombre de usuario
        cy.get('[name=username]')
            .type('user')
            .should('have.value','user')

        // ingresa password 
        cy.get('[name=password]')
        .type('password')
        .should('have.value','password')

        cy.get('#Entrar').click();  

        // entra a página protected
        cy.contains('Protected').click();
        cy.url().should('include', '/protected');

        // logout
        cy.contains('Login').click();
        cy.contains('Salir').click();
    });
});
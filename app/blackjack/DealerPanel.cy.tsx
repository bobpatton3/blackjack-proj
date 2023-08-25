import React from 'react'
import DealerPanel from './DealerPanel'

describe('<DealerPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DealerPanel />);

    cy.contains("button", "Shuffle");
    cy.contains("button", "Deal");
    cy.contains('Cards Remaining: 52');
  })
})
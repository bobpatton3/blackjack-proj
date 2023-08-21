import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DealerPanel from "@/app/blackjack/DealerPanel";

describe('DealerPanel', () => {
    beforeEach(() => {
        render(<DealerPanel />);
    })

    it('Shuffle button should render with className', () => {
        const shuffleButton = screen.getByRole('button', { name: 'Shuffle' });
        expect(shuffleButton).toHaveClass('defaultButton');
    });


})
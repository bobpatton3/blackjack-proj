import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayerPanel from "@/app/blackjack/PlayerPanel";
import { CardType } from "@/context/deckDataContext";

describe('PlayerPanel', () => {
    const cards: CardType[] = [
        {
            "code": "6H",
            "image": "https://deckofcardsapi.com/static/img/6H.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/6H.svg",
                "png": "https://deckofcardsapi.com/static/img/6H.png"
            },
            "value": "6",
            "suit": "HEARTS"
        },
        {
            "code": "5S",
            "image": "https://deckofcardsapi.com/static/img/5S.png",
            "images": {
                "svg": "https://deckofcardsapi.com/static/img/5S.svg",
                "png": "https://deckofcardsapi.com/static/img/5S.png"
            },
            "value": "5",
            "suit": "SPADES"
        }
    ];
    const playerCardIndices: number[] = [0, 1];
    const playerCount: number = 15;
    const deckLoaded: boolean = true;
    const hitPlayerCallback: () => void = () => { };
    const endGame: (playerCount: number) => void = () => { };
    const hitMeButtonDisabledFalse: boolean = false;
    const hitMeButtonDisabledTrue: boolean = true;
    const playerWins: number = 5;
    const resetWinCounts: () => void = () => { };

    it('Stand button should render with className', () => {
        render(<PlayerPanel
            cards={cards}
            playerCardIndices={playerCardIndices}
            playerCount={playerCount}
            deckLoaded={deckLoaded}
            hitMeCallback={hitPlayerCallback}
            standCallback={endGame}
            hitMeButtonDisabled={hitMeButtonDisabledFalse}
            playerWins={playerWins}
            resetWinCounts={resetWinCounts} />);

        const shuffleButton = screen.getByRole('button', { name: 'Stand' });
        expect(shuffleButton).toHaveClass('defaultButton');
    });

    it('Stand button should be disabled if specified', () => {
        render(<PlayerPanel
            cards={cards}
            playerCardIndices={playerCardIndices}
            playerCount={playerCount}
            deckLoaded={deckLoaded}
            hitMeCallback={hitPlayerCallback}
            standCallback={endGame}
            hitMeButtonDisabled={hitMeButtonDisabledTrue}
            playerWins={playerWins}
            resetWinCounts={resetWinCounts} />);

        const shuffleButton = screen.getByRole('button', { name: 'Stand' });
        expect(shuffleButton).toBeDisabled();
    });
})
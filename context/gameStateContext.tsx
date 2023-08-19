"use client"

import React, { createContext } from "react";
import { CardType } from "./deckDataContext";

export type Hand = {
    cards: CardType[],
    total: number,
}

export type GameStateType = {
    dealer: Hand,
    player: Hand,
}

type GameStateGlobalContextType = {
    gameState: GameStateType;
    setGameState: (gameStateDataContext: GameStateType) => void;
}

const gameStateDataInstance: GameStateGlobalContextType = {
    gameState: {
        dealer: {
            cards: [],
            total: 0,
        },
        player: {
            cards: [],
            total: 0,
        },
    },
    setGameState: (newGameState: GameStateType) => { gameStateDataInstance.gameState = newGameState },
}

export const DeckDataContext = createContext<GameStateGlobalContextType>(gameStateDataInstance);

//export const useDeckDataContext = () => useContext(DeckDataContext);
export const DeckDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <DeckDataContext.Provider value={gameStateDataInstance}>
            {children}
        </DeckDataContext.Provider>
    );
}

"use client"

import React, { createContext } from "react";

export type CardType = {
    code: string,
    image: string,
    images: {
        svg: string,
        png: string,
    },
    value: string,
    suit: string,
}

export type NewDeckInfoType = {
    success: boolean,
    deck_id: string,
    shuffled: boolean,
    remaining: number,
    cards: CardType[],
}

type DeckDataGlobalContextType = {
    deck: NewDeckInfoType;
    setDeck: (deckDataContext: NewDeckInfoType) => void;
}

const deckDataInstance: DeckDataGlobalContextType = {
    deck: {
        success: false,
        deck_id: "xxx",
        shuffled: false,
        remaining: 0,
        cards: [],
    },
    setDeck: (newDeck: NewDeckInfoType) => { deckDataInstance.deck = newDeck },
}

export const DeckDataContext = createContext<DeckDataGlobalContextType>(deckDataInstance);

//export const useDeckDataContext = () => useContext(DeckDataContext);
export const DeckDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <DeckDataContext.Provider value={deckDataInstance}>
            {children}
        </DeckDataContext.Provider>
    );
}

"use client"

import { useContext, useState } from "react";
import { CardType, DeckDataContext, NewDeckInfoType } from "@/context/deckDataContext";
import PlayerPanel from "./PlayerPanel"
import DeckUtility from "./DeckUtility";

export default function DealerPanel() {
    const [deckLoaded, setDeckLoaded] = useState<boolean>(false);
    const [deckID, setDeckID] = useState<string>("none");
    const [cards, setCards] = useState<CardType[]>([]);
    const deckDataContext = useContext(DeckDataContext);

    function setDeck(newDeck: NewDeckInfoType) {
        console.log("setDeck: " + newDeck.deck_id);
        deckDataContext.setDeck(newDeck);
        setDeckID(deckDataContext.deck.deck_id);
        setCards(deckDataContext.deck.cards);
        setDeckLoaded(true);
    }

    function setReshuffledDeck(newDeck: NewDeckInfoType) {
        console.log("setReshuffledDeck: " + newDeck.deck_id);
        deckDataContext.setDeck(newDeck);
        setCards(deckDataContext.deck.cards);
    }

    function shuffleOnClick() {
        if (!deckLoaded) {
            console.log("shuffleOnClick: loading new deck ");
            DeckUtility.getADeck(setDeck);
        } else {
            console.log("shuffleOnClick: deckID = " + deckID);
            DeckUtility.shuffleDeck(deckID, setReshuffledDeck);
        }
    }

    return (
        <div>
            <button onClick={shuffleOnClick} className="defaultButton">Shuffle</button>

            <div className="dealersTitleDiv">
                Dealer Cards:
            </div>

            {(deckLoaded) &&
                <div className="dealerCardImagesDiv">
                    <div className="singleCardImageDiv">
                        <img src={cards[1].image} alt={cards[1].value + " " + cards[1].suit} width="100" />
                    </div>

                    <div className="singleCardImageDiv">
                        <img src={cards[3].image} alt={cards[3].value + " " + cards[3].suit} width="100" />
                    </div>
                </div>
            }
            <PlayerPanel cards={cards} deckLoaded={deckLoaded} />
        </div>
    )
}
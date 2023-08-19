"use client"

import { CardType } from "@/context/deckDataContext"

export default function PlayerPanel({ cards, deckLoaded }: { cards: CardType[], deckLoaded: boolean }) {
    return (
        <div>
            <button onClick={() => { }} className="defaultButton">Hit Me!</button>
            <button onClick={() => { }} className="defaultButton">Stand</button>

            <div className="dealersTitleDiv">
                Player Cards:
            </div>

            {(deckLoaded) &&
                <div className="dealerCardImagesDiv">
                    <div className="singleCardImageDiv">
                        <img src={cards[0].image} alt={cards[0].value + " " + cards[0].suit} width="100" />
                    </div>

                    <div className="singleCardImageDiv">
                        <img src={cards[2].image} alt={cards[2].value + " " + cards[2].suit} width="100" />
                    </div>
                </div>
            }
        </div>
    )
}
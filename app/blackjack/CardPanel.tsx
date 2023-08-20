"use client"

import { CardType } from "@/context/deckDataContext"

export default function CardPanel({
    cards,
    cardIndices,
    scoreCount,
    deckLoaded,
    player,
    wins,
}: {
    cards: CardType[],
    cardIndices: number[],
    scoreCount: number,
    deckLoaded: boolean,
    player: string,
    wins: number,
}) {

    function singleCardStyle(ndx: number): any {
        return {
            "position": "absolute",
            "left": 30 * ndx,
            "zIndex": ndx,
        };
    }

    return (
        <div>
            {(deckLoaded) &&
                <div>
                    <div className="dealersTitleDiv">
                        {player} Count: {scoreCount},  {player} Hands: {wins}
                    </div>

                    <div className="dealerCardImagesDiv">
                        {cardIndices.map((i, ndx) =>
                            <div style={singleCardStyle(ndx)} key={cards[i].code}>
                                <img src={cards[i].image} alt={cards[i].value + " " + cards[i].suit} className="cardClass" />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
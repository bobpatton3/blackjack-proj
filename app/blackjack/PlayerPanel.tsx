"use client"

import { CardType } from "@/context/deckDataContext"
import CardPanel from "./CardPanel";

export default function PlayerPanel({
    cards,
    playerCardIndices,
    playerCount,
    deckLoaded,
    hitMeCallback,
    standCallback,
}: {
    cards: CardType[],
    playerCardIndices: number[],
    playerCount: number,
    deckLoaded: boolean,
    hitMeCallback: () => void,
    standCallback: () => void,
}) {

    function hitMe() {
        hitMeCallback();
    }

    function stand() {
        standCallback();
    }

    return (
        <div>
            <CardPanel cards={cards} cardIndices={playerCardIndices} scoreCount={playerCount} deckLoaded={deckLoaded} player={"Player"} />
            {(deckLoaded) &&
                <div>
                    <button onClick={hitMe} className="defaultButton">Hit Me!</button>
                    <button onClick={stand} className="defaultButton">Stand</button>
                </div>
            }
        </div>
    )
}
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
    hitMeButtonDisabled,
    playerWins,
    resetWinCounts,
}: {
    cards: CardType[],
    playerCardIndices: number[],
    playerCount: number,
    deckLoaded: boolean,
    hitMeCallback: () => void,
    standCallback: (playerCount: number) => void,
    hitMeButtonDisabled: boolean,
    playerWins: number,
    resetWinCounts: () => void,
}) {

    function hitMe() {
        hitMeCallback();
    }

    function stand() {
        standCallback(playerCount);
    }

    return (
        <div>
            <CardPanel
                cards={cards}
                cardIndices={playerCardIndices}
                scoreCount={playerCount}
                deckLoaded={deckLoaded}
                player={"Player"}
                wins={playerWins}
            />
            {(deckLoaded) &&
                <div>
                    <button onClick={hitMe} className="defaultButton" disabled={hitMeButtonDisabled}>Hit Me!</button>
                    <button onClick={stand} className="defaultButton" disabled={hitMeButtonDisabled}>Stand</button>
                    <button onClick={resetWinCounts} className="defaultButton" >Reset Wins</button>
                </div>
            }
        </div>
    )
}
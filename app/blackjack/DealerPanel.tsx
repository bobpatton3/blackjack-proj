"use client"

import { useContext, useState } from "react";
import { CardType, DeckDataContext, NewDeckInfoType } from "@/context/deckDataContext";
import PlayerPanel from "./PlayerPanel"
import DeckOfCardsAPIUtility from "./DeckOfCardsAPIUtility";
import CardPanel from "./CardPanel";

export default function DealerPanel() {
    const [deckLoaded, setDeckLoaded] = useState<boolean>(false);
    const [hitMeButtonDisabled, setHitMeButtonDisabled] = useState<boolean>(false);
    const [dealButtonDisabled, setDealButtonDisabled] = useState<boolean>(false);
    const [deckID, setDeckID] = useState<string>("none");
    const [cards, setCards] = useState<CardType[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const [deckIndex, setDeckIndex] = useState<number>(0);
    const [dealerCount, setDealerCount] = useState<number>(0);
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [dealerWins, setDealerWins] = useState<number>(0);
    const [playerWins, setPlayerWins] = useState<number>(0);
    const [playerCardIndices, setPlayerCardIndices] = useState<number[]>([]);
    const [dealerCardIndices, setDealerCardIndices] = useState<number[]>([]);
    const [winner, setWinner] = useState<string>("");
    const deckDataContext = useContext(DeckDataContext);

    function setDeck(newDeck: NewDeckInfoType) {
        console.log("setDeck: " + newDeck.deck_id);
        setDeckID(newDeck.deck_id);
        setDeckLoaded(true);
        setReshuffledDeck(newDeck);
    }

    function setReshuffledDeck(newDeck: NewDeckInfoType) {
        console.log("setReshuffledDeck: " + newDeck.deck_id);
        deckDataContext.setDeck(newDeck);
        setCards(newDeck.cards);
        initializeValuesArrayWithShuffledDeck(newDeck.cards);
    }

    function initializeValuesArrayWithShuffledDeck(cardsParam: CardType[]) {
        const newValuesArray: number[] = [];
        cardsParam.forEach((card) => {
            if (card.value === "ACE") newValuesArray.push(11);
            else if (["KING", "QUEEN", "JACK"].includes(card.value)) newValuesArray.push(10);
            else newValuesArray.push(parseInt(card.value));
        });
        setValues(newValuesArray);
        setDealerCardIndices([1, 3]);
        setPlayerCardIndices([0, 2]);
        setDealerCount(getCount([1, 3], newValuesArray));
        setPlayerCount(getCount([0, 2], newValuesArray));
        setDeckIndex(4);
    }

    function shuffleOnClick() {
        if (!deckLoaded) {
            console.log("shuffleOnClick: loading new deck ");
            DeckOfCardsAPIUtility.getADeck(setDeck);
        } else {
            console.log("shuffleOnClick: deckID = " + deckID);
            DeckOfCardsAPIUtility.shuffleDeck(deckID, setReshuffledDeck);
        }
        setHitMeButtonDisabled(false);
        setDealButtonDisabled(false);
        setWinner("");
    }

    function hitPlayerCallback() {
        playerCardIndices.push(deckIndex);
        setPlayerCardIndices(playerCardIndices);
        setDeckIndex(deckIndex + 1);
        setCounts();

        const playerCnt = getCount(playerCardIndices, values);
        if (playerCnt >= 21) endGame(playerCnt);
    }

    function dealOnClick() {
        setDealerCardIndices([deckIndex + 1, deckIndex + 3]);
        setPlayerCardIndices([deckIndex, deckIndex + 2]);
        setDealerCount(getCount([deckIndex + 1, deckIndex + 3], values));
        setPlayerCount(getCount([deckIndex, deckIndex + 2], values));
        setDeckIndex(deckIndex + 4);
        setHitMeButtonDisabled(false);
        setWinner("");
    }

    function getCount(cardIndices: number[], valuesArray: number[]) {
        let handSum: number = 0;
        let aceCount: number = 0;
        cardIndices.forEach((i) => {
            handSum += valuesArray[i];
            if (valuesArray[i] === 11) aceCount += 1;
        });
        while (handSum > 21 && aceCount > 0) {
            console.log(`handSum = ${handSum} ;  aceCount = ${aceCount}`);
            handSum -= 10;
            aceCount -= 1;
        }
        console.log(`returning handSum = ${handSum}`);
        return handSum;
    }

    function setCounts() {
        setDealerCount(getCount(dealerCardIndices, values));
        setPlayerCount(getCount(playerCardIndices, values));
    }

    function resetWinCounts() {
        setDealerWins(0);
        setPlayerWins(0);
    }

    function endGame(playerCnt: number) {
        console.log("endGame");
        setHitMeButtonDisabled(true);
        if (playerCnt > 21) {
            setWinner("Player busts - dealer wins.");
            setDealerWins(dealerWins + 1)
        } else if (playerCnt > dealerCount) {
            setWinner("Player wins!");
            setPlayerWins(playerWins + 1)
        } else if (dealerCount > playerCnt) {
            setWinner("Dealer wins.");
            setDealerWins(dealerWins + 1)
        } else {
            setWinner("Tie - Dealer wins.");
            setDealerWins(dealerWins + 1)
        }
        if (deckIndex > 42) setDealButtonDisabled(true);
    }



    return (
        <div>
            <div className="shuffleAndDeckStatus">
                <button onClick={shuffleOnClick} className="defaultButton">Shuffle</button>
                <button onClick={dealOnClick} className="defaultButton" disabled={dealButtonDisabled}>Deal</button>
                <div className="deckStatus">(Cards Remaining: {52 - deckIndex})</div>
            </div>

            <CardPanel
                cards={cards}
                cardIndices={dealerCardIndices}
                scoreCount={dealerCount}
                deckLoaded={deckLoaded}
                player={"Dealer"}
                wins={dealerWins}
            />
            <PlayerPanel
                cards={cards}
                playerCardIndices={playerCardIndices}
                playerCount={playerCount}
                deckLoaded={deckLoaded}
                hitMeCallback={hitPlayerCallback}
                standCallback={endGame}
                hitMeButtonDisabled={hitMeButtonDisabled}
                playerWins={playerWins}
                resetWinCounts={resetWinCounts}
            />
            <div className="dealersTitleDiv">{winner}</div>
        </div>
    )
}
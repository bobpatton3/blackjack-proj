import { NewDeckInfoType } from "@/context/deckDataContext";

export default class DeckUtility {

    public static async getADeck(getADeckCallback: (deckDataContext: NewDeckInfoType) => void) {
        let deckInfo: NewDeckInfoType = {
            success: false,
            deck_id: "",
            shuffled: false,
            remaining: 0,
            cards: [],
        }

        try {
            const initialDeckResponse = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

            if (!initialDeckResponse.ok) {
                throw new Error('Call to New Deck API failed');
            }

            deckInfo = await initialDeckResponse.json();

            if (!deckInfo.success) {
                throw new Error('Returned Deck reports a failure');
            }

            const deckId = deckInfo.deck_id;

            const cardStackResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=14`);

            if (!cardStackResponse.ok) {
                throw new Error('Call to API to retrieve card array failed');
            }

            deckInfo = await cardStackResponse.json();

            if (!deckInfo.success) {
                throw new Error('Deck reports a failure upon retrieving cards');
            }

        } catch (error) {
            console.error('Exception: ', error)
        }

        console.log("getADeck: " + deckInfo.deck_id);
        getADeckCallback(deckInfo);
    }



    public static async shuffleDeck(deckId: string, shuffleDeckCallback: (deckDataContext: NewDeckInfoType) => void) {

        let deckInfo: NewDeckInfoType = {
            success: false,
            deck_id: "",
            shuffled: false,
            remaining: 0,
            cards: [],
        };

        try {
            const initialDeckResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);

            if (!initialDeckResponse.ok) {
                throw new Error('Call to New Deck API failed');
            }

            deckInfo = await initialDeckResponse.json();

            if (!deckInfo.success) {
                throw new Error('Returned Deck reports a failure');
            }

            const cardStackResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=14`);

            if (!cardStackResponse.ok) {
                throw new Error('Call to API to retrieve card array failed');
            }

            deckInfo = await cardStackResponse.json();

            if (!deckInfo.success) {
                throw new Error('Deck reports a failure upon retrieving cards');
            }

        } catch (error) {
            console.error('Exception: ', error)
        }

        console.log("shuffleDeck: " + deckId);
        shuffleDeckCallback(deckInfo);
    }


}

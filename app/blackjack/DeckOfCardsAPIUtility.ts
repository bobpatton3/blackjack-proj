import { NewDeckInfoType } from "@/context/deckDataContext";
import axios from "axios";

export default class DeckOfCardsAPIUtility {

    public static async getADeck(getADeckCallback: (deckDataContext: NewDeckInfoType) => void) {
        try {
            const deckResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

            if (deckResponse.status != 200) {
                throw new Error('Call to New Deck API failed: ' + deckResponse.statusText);
            }

            const deckId = deckResponse.data.deck_id;

            const cardStackResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);

            if (cardStackResponse.status != 200) {
                throw new Error('Call to API to retrieve card array failed: ' + cardStackResponse.statusText);
            }

            console.log("getADeck: " + cardStackResponse.data.deck_id);
            getADeckCallback(cardStackResponse.data);

        } catch (error) {
            console.error('Exception: ', error)
        }
    }

    public static async shuffleDeck(deckId: string, shuffleDeckCallback: (deckDataContext: NewDeckInfoType) => void) {

        try {
            const deckResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);

            if (deckResponse.status != 200) {
                throw new Error('Call to Shuffle Deck API failed: ' + deckResponse.statusText);
            }

            const cardStackResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);

            if (cardStackResponse.status != 200) {
                throw new Error('Call to API to retrieve card array failed: ' + cardStackResponse.statusText);
            }

            console.log("shuffleDeck: " + cardStackResponse.data.deck_id);
            shuffleDeckCallback(cardStackResponse.data);

        } catch (error) {
            console.error('Exception: ', error)
        }
    }


}

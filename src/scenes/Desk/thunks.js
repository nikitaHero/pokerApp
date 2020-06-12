import { actions } from "./ducks";
import axios from "axios";
import { toastr } from "react-redux-toastr";

export const getHands = () => {
  return async (dispatch) => {
    await dispatch(actions.getHandsRequest());

    try {
      const deckRes = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );

      const deckData = await deckRes.data;

      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=8`
      );
      const data = await res.data;

      const sortedData = [];

      await data.cards.forEach((item) => {
        switch (item.value) {
          case "2":
            return sortedData.push({ image: item.image, value: 2 });
          case "3":
            return sortedData.push({ image: item.image, value: 3 });
          case "4":
            return sortedData.push({ image: item.image, value: 4 });
          case "5":
            return sortedData.push({ image: item.image, value: 5 });
          case "6":
            return sortedData.push({ image: item.image, value: 6 });
          case "7":
            return sortedData.push({ image: item.image, value: 7 });
          case "8":
            return sortedData.push({ image: item.image, value: 8 });
          case "9":
            return sortedData.push({ image: item.image, value: 9 });
          case "10":
            return sortedData.push({ image: item.image, value: 10 });
          case "JACK":
            return sortedData.push({ image: item.image, value: 11 });
          case "QUEEN":
            return sortedData.push({ image: item.image, value: 12 });
          case "KING":
            return sortedData.push({ image: item.image, value: 13 });
          case "ACE":
            return sortedData.push({ image: item.image, value: 14 });
          default:
            return true;
        }
      });
      let hand1 = [];
      let hand2 = [];

      await sortedData.slice(0, 4).forEach((card) => {
        const findPair = hand1.findIndex((item) => item.value === card.value);
        if (findPair >= 0) {
          hand1.push({ value: card.value, isPair: true, image: card.image });
          hand1[findPair].isPair = true;
        } else {
          hand1.push({ value: card.value, isPair: false, image: card.image });
        }
      });
      await sortedData.slice(4).forEach((card) => {
        const findPair = hand2.findIndex((item) => item.value === card.value);
        if (findPair >= 0) {
          hand2.push({ value: card.value, isPair: true, image: card.image });
          hand2[findPair].isPair = true;
        } else {
          hand2.push({ value: card.value, isPair: false, image: card.image });
        }
      });

      const hands = {
        hand1,
        hand2,
      };

      await dispatch(actions.getHandsSuccess(hands));
      await toastr.success("You get  hands!", "console.log or show them");
    } catch (error) {
      dispatch(actions.getHandsError(error));
    }
  };
};

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getHands } from "./thunks";
import { toastr } from "react-redux-toastr";

import { Wrapper, Keyboard, Button, Content, Hand, Card } from "./styled";

const Desk = ({ desk, getHands }) => {
  useEffect(() => {
    getHands();
  }, []);

  const [hands, setHands] = useState({ hand1: null, hand2: null });
  const [winner, setWinner] = useState({ winner: null, pairs: [] });
  const _handleConsoleLog = () => {
    console.log(desk.cards);
  };

  const _handleShowHands = () => {
    if (desk.cards) {
      setHands(desk.cards);
      getWinners();
    }
  };

  const getWinners = () => {
    const filtredPair1 = desk.cards.hand1
      .filter((item) => item.isPair === true)
      .sort((a, b) => b.value - a.value);
    const filtredPair2 = desk.cards.hand2
      .filter((item) => item.isPair === true)
      .sort((a, b) => b.value - a.value);

    if (filtredPair1.length > filtredPair2.length) {
      setWinner({ winner: 0, pairs: filtredPair1 });
    } else if (filtredPair1.length < filtredPair2.length) {
      setWinner({ winner: 1, pairs: filtredPair2 });
    } else if (filtredPair1.length === 0 && filtredPair2.length === 0) {
      setWinner({ winner: -1, pairs: [] });
      toastr.success("Success", "No pair");
    } else if (filtredPair1.length === filtredPair2.length) {
      if (filtredPair1[0].value > filtredPair2[0].value) {
        setWinner({ winner: 0, pairs: filtredPair1 });
      } else if (filtredPair1[0].value < filtredPair2[0].value) {
        setWinner({ winner: 1, pairs: filtredPair2 });
      }
    }
  };

  const _handeNewHands = () => {
    getHands();

    setHands({ hand1: null, hand2: null });
    setWinner({ winner: null, pairs: null });
  };
  return (
    <Wrapper>
      <Keyboard>
        <Button disable={desk.isFetching} onClick={_handleConsoleLog}>
          console.log hands
        </Button>
        <Button disable={desk.isFetching} onClick={_handleShowHands}>
          show hands
        </Button>
        <Button disable={desk.isFetching} onClick={_handeNewHands}>
          get new hands
        </Button>
      </Keyboard>
      <Content>
        <Hand className={winner.winner === 0 ? "winning" : false}>
          {hands.hand1 &&
            hands.hand1.map((card, index) => {
              let isWinner = winner.pairs
                ? winner.pairs.findIndex((item) => item.value === card.value)
                : -1;
              return (
                <Card
                  key={index + card.toString()}
                  img={card.image}
                  className={
                    isWinner >= 0 && winner.winner === 0
                      ? `pair${isWinner}`
                      : false
                  }
                />
              );
            })}
        </Hand>
        <Hand className={winner.winner === 1 ? "winning" : false}>
          {hands.hand2 &&
            hands.hand2.map((card, index) => {
              let isWinner = winner.pairs
                ? winner.pairs.findIndex((item) => item.value === card.value)
                : -1;
              return (
                <Card
                  key={index + card.toString()}
                  img={card.image}
                  className={
                    isWinner >= 0 && winner.winner === 1
                      ? `pair${isWinner}`
                      : false
                  }
                />
              );
            })}
        </Hand>
      </Content>
    </Wrapper>
  );
};

const mapState = (state) => ({
  desk: state.desk,
});

export const mapDispatch = (dispatch) => ({
  getHands: () => dispatch(getHands()),
});

export default connect(mapState, mapDispatch)(Desk);

import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Keyboard = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ disable }) => (disable ? "grey" : "red")};
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid black;
  text-transform: uppercase;
  cursor: ${({ disable }) => (disable ? "default" : "pointer")};
  margin-right: 20px;
  pointer-events: ${({ disable }) => (disable ? "none" : "default")};
  :hover {
    box-shadow: ${({ disable }) => (disable ? "none" : "0px 0px 15px red")};
  }
  :last-child {
    margin-right: 0px;
  }
`;

export const Content = styled.div``;

export const Hand = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 8px;
`;

export const Card = styled.div`
  width: 226px;
  height: 314px;
  background: center / contain no-repeat
    url(${({ img }) => (img ? img : false)});
  margin-right: 15px;
  :last-child {
    margin-right: 0px;
  }
`;

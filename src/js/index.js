import "../style.css";
// const cardsJSON = require("./flights.json");
import Card from "./Card";
import CardList from "./CardList";
const flightsJSON = require("./flights");

(() => {
  const flights = flightsJSON.result.flights;
  // console.log(flights);
  const page = document;



  // const card = new Card("", "", page);

  // отрисовка карточек
  const cardList = new CardList(
    page,
    (element, card) => new Card(element, card, page),
  );
  cardList.showCards(flights);


  // сортировка по цене
  // cardList.sortByPrice();

  // сортировка по возрасту
  // cardList.sortByAge();


})();
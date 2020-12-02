import "../style.css";
// const cardsJSON = require("./flights.json");
import Card from "./Card";
import CardList from "./CardList";
const flightsJSON = require("./flights");

(() => {
  const flightsArr = flightsJSON.result.flights;
  const page = document;
  const chipFirst = page.querySelector(".sort__avia_input-first");
  const chipSecond = page.querySelector(".sort__avia_input-second");

  const aeroflot = "Аэрофлот - российские авиалинии";
  const pilishAirlines = "LOT Polish Airlines"
  // const moscow = "Москва";
  // const london = "ЛОНДОН";
  const flights = flightsArr.filter(flight => flight.flight.carrier.caption === aeroflot || flight.flight.carrier.caption === pilishAirlines);


  const flightsSortBySmallPrice = [...flights].sort((a, b) => {
    const elA = a.flight.price.total.amount;
    const elB = b.flight.price.total.amount;
    return elA - elB;
  });



  chipFirst.textContent = flightsSortBySmallPrice[0].flight.carrier.caption;
  chipSecond.textContent = flightsSortBySmallPrice[1].flight.carrier.caption


  // отрисовка карточек
  const cardList = new CardList(
    page,
    (element, card) => new Card(element, card, page),
    flights
  );
  cardList.showCards();

  // сортировка по возрастанию цены
  page.querySelector('input[value="smallPrice"]').addEventListener("click", () => {
    cardList.sortBySmallPrice();
  });

  // сортировка по убыванию цены
  page.querySelector('input[value="bigPrice"]').addEventListener("click", () => {
    cardList.sortByBigPrice();
  });

  // сортировка по времени в пути
  page.querySelector('input[value="timeInFlight"]').addEventListener("click", () => {
    cardList.sortByTime();
  });

  // сортировка по 1 пересадке
  page.querySelector('input[value="oneTransfer"]').addEventListener("click", () => {
    cardList.sortByOneTransfer();
  });

  // сортировка без пересадок
  page.querySelector('input[value="noTransfer"]').addEventListener("click", () => {
    cardList.sortByNoTransfer();
  });

  // сортировка цена от
  page.querySelector('input[name="price-from"]').addEventListener("input", (e) => {
    cardList.sortByPriceFrom(e);
  });

  // сортировка цена до
  page.querySelector('input[name="price-to"]').addEventListener("input", (e) => {
    cardList.sortByPriceTo(e);
  });

})();
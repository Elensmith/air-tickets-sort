import "../style.css";
import Card from "./Card";
import CardList from "./CardList";
const flightsJSON = require("./flights");

(() => {
  const flightsArr = flightsJSON.result.flights;
  const page = document;
  const chipCompanyFirst = page.querySelector(".sort__avia_input-first");
  const chipCompanySecond = page.querySelector(".sort__avia_input-second");
  const chipPriceFirst = page.querySelector(".sort__avia_price-first");
  const chipPriceSecond = page.querySelector(".sort__avia_price-second");

  const aeroflot = "Аэрофлот - российские авиалинии";
  const pilishAirlines = "LOT Polish Airlines"

  // сортировка по двум компаниям. для дальнейшего использования
  const flights = flightsArr.filter(flight => flight.flight.carrier.caption === aeroflot || flight.flight.carrier.caption === pilishAirlines);

  // сортировка по компании 1 (низкая цена) для отрисовки в доме
  const flightsChipCompanyFirst = flightsArr.filter(flight => flight.flight.carrier.caption === aeroflot).sort((a, b) => {
    const elA = a.flight.price.total.amount;
    const elB = b.flight.price.total.amount;
    return elA - elB;
  });
  // сортировка по компании 2 (низкая цена) для отрисовки в доме
  const flightsChipCompanySecond = flightsArr.filter(flight => flight.flight.carrier.caption === pilishAirlines).sort((a, b) => {
    const elA = a.flight.price.total.amount;
    const elB = b.flight.price.total.amount;
    return elA - elB;
  });

  chipCompanyFirst.textContent = flightsChipCompanyFirst[0].flight.carrier.caption;
  chipCompanySecond.textContent = flightsChipCompanySecond[0].flight.carrier.caption
  chipPriceFirst.textContent = `${flightsChipCompanyFirst[0].flight.price.total.amount + " " + "р."}`;
  chipPriceSecond.textContent = `${flightsChipCompanySecond[0].flight.price.total.amount + " " + "р."}`;

  // инстанс для отрисовки карточек
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

  // только билеты авиакомпании flightsChipCompanyFirst 
  page.querySelector('input[name="chip-avia-first"]').addEventListener("input", () => {
    cardList.sortByChipCompanyFirst();
  });

  // только билеты авиакомпании flightsChipCompanySecond 
  page.querySelector('input[name="chip-avia-second"]').addEventListener("input", () => {
    cardList.sortByChipCompanySecond();
  });
})();
export default class CardList {
  constructor(page, Card) {
    this.page = page;
    this.Card = Card;
    this.addCard = this.addCard.bind(this);
    this.temp = this.page.querySelector(".ticket-template").content;
    this.cardTemp = this.temp.querySelector(".ticket");
    // this._sortHandler = this._sortHandler.bind(this);
  }


  showCards(array) {
    const aeroflot = "Аэрофлот - российские авиалинии";
    const pilishAirlines = "LOT Polish Airlines"
    // const moscow = "Москва";
    // const london = "ЛОНДОН";
    const flights = array.filter(flight => flight.flight.carrier.caption === aeroflot || flight.flight.carrier.caption === pilishAirlines);

    // const moscowLondon = flights.filter(flight => flight.flight.legs[0].segments[0].departureCity.caption === moscow && flight.flight.legs[1].segments[0].departureCity.caption === london);
    const filterBySmallPrice = [...flights].sort((a, b) => {
      const elA = a.querySelector(element).textContent;
      const elB = b.querySelector(element).textContent;
      const getPrice = (el) => parseInt(el.replace(/ /g, ""));
      return getPrice(elA) - getPrice(elB);
    })
    // console.log(flights);
    // console.log(moscowLondon);
    flights.forEach((element) => {
      console.log(element)
      this.addCard(element);
    });

  }



  addCard(element) {
    this.card = this.Card(element, this.cardTemp);
    this.card.setData();
    this.card.createCard();
  }

  // sortByPrice() {
  //   const price = ".card__price";
  //   this.page.querySelector(".search-result__sorted-by-price").addEventListener("click", () => this._sortHandler(price))
  // }

  // sortByAge() {
  //   const age = ".card__age";
  //   this.page.querySelector(".search-result__sorted-by-age").addEventListener("click", () => this._sortHandler(age))
  // }

  // _sortHandler(element) {
  //   const cards = this.page.querySelectorAll(".card");

  //   const sorted = [...cards].sort((a, b) => {
  //     const elA = a.querySelector(element).textContent;
  //     const elB = b.querySelector(element).textContent;
  //     const getPrice = (el) => parseInt(el.replace(/ /g, ""));
  //     return getPrice(elA) - getPrice(elB);
  //   })
  //   const cantainer = this.page.querySelector(".search-result__cards");
  //   sorted.forEach(el => cantainer.appendChild(el));

  // }
}
export default class CardList {
  constructor(page, Card, array) {
    this.page = page;
    this.Card = Card;
    this.array = array;
    this.addCard = this.addCard.bind(this);
    this.temp = this.page.querySelector(".ticket-template").content;
    this.cardTemp = this.temp.querySelector(".ticket");
    this._cleanHandler = this._cleanHandler.bind(this);
    this.buttonShowMore = this.page.querySelector(".search-result__show-more");
    this.ticketsArray = this.array;
    this.splicedArray = this.ticketsArray;
    this.inputFrom = this.page.getElementsByName("price-from").value;
  }


  showCards() {
    const twoTickets = 2;
    let ticketsChunks = [];

    if (this.array !== this.ticketsArray) {
      this.ticketsArray = this.array;
      this.splicedArray = this.ticketsArray;
    }
    if (this.splicedArray.length > twoTickets) {
      ticketsChunks = this.splicedArray.splice(0, twoTickets);
      ticketsChunks.forEach((element) => {
        this.addCard(element);
      });
      this._showMore();
    } else {
      ticketsChunks = this.splicedArray;
      this.splicedArray.forEach((element) => {
        this.addCard(element);
      });
    }

  }

  _showMore() {
    if (this.splicedArray.length <= 2) {
      this.buttonShowMore.classList.remove("search-result__show-more_on");
    }
    this.buttonShowMore.addEventListener("click", (event) => {
      event.stopPropagation();
      this.showCards();
    });
  }

  addCard(element) {
    this.card = this.Card(element, this.cardTemp);
    this.card.setData();
    this.card.createCard();
  }

  sortBySmallPrice() {
    this._cleanHandler();
    const flightsSortBySmallPrice = [...this.array].sort((a, b) => {
      const elA = a.flight.price.total.amount;
      const elB = b.flight.price.total.amount;
      return elA - elB;
    });
    this.array = flightsSortBySmallPrice;
    this.showCards();
  }

  sortByBigPrice() {
    this._cleanHandler();
    const flightsSortByBigPrice = [...this.array].sort((a, b) => {
      const elA = a.flight.price.total.amount;
      const elB = b.flight.price.total.amount;
      return elB - elA;
    });
    this.array = flightsSortByBigPrice;
    this.showCards();
  }

  sortByNoTransfer() {
    this._cleanHandler();
    const noTransfer = this.array.filter(flight =>
      flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1);
    this.array = noTransfer;
    this.showCards();
  }

  sortByOneTransfer() {
    this._cleanHandler();
    const oneTransfer = this.array.filter(flight =>
      flight.flight.legs[0].segments.length > 1 || flight.flight.legs[1].segments.length > 1);
    this.array = oneTransfer;
    this.showCards();
  }

  sortByPriceFrom(e) {
    // this._cleanHandler();
    console.log(e);
    // const inputFrom = this.page.querySelector('input[name="price-to"]').value;
    // console.log(this.inputFrom);
    // const fromPrice = this.array.filter(flight =>
    //   flight.flight.price.total.amount >= 1 && flight.flight.legs[1].segments.length === 1);
    // this.array = noTransfer;
    // this.showCards();
  }

  sortByPriceTo(e) {
    // this._cleanHandler();

  }

  sortByTime() {
    this._cleanHandler();
    const flightsSortByTime = [...this.array].sort((a, b) => {
      const elA_one = a.flight.legs[0].duration;
      const elA_two = a.flight.legs[1].duration;
      const elB_one = b.flight.legs[0].duration;
      const elB_two = b.flight.legs[1].duration;
      const elA = elA_one + elA_two;
      const elB = elB_one + elB_two;
      return elA - elB;
    });
    this.array = flightsSortByTime;
    this.showCards();
  }

  _cleanHandler() {
    let d = this.page.querySelector(".search-result__tickets");
    this.page.querySelectorAll(".ticket").forEach((child) => {
      d.removeChild(child);
    });
  }

}
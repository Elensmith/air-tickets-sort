export default class CardList {
  constructor(page, Card, arrayMain) {
    this.page = page;
    this.Card = Card;
    this.arrayMain = arrayMain;
    this.array = this.arrayMain;
    this.addCard = this.addCard.bind(this);
    this.temp = this.page.querySelector(".ticket-template").content;
    this.cardTemp = this.temp.querySelector(".ticket");
    this._cleanHandler = this._cleanHandler.bind(this);
    this.buttonShowMore = this.page.querySelector(".search-result__show-more");
    this.ticketsArray = this.array;
    this.splicedArray = this.ticketsArray;
    this.inputFrom = [];
    this.inputTo = [];
    this.ticketsChunks = [];
    this.aeroflot = "Аэрофлот - российские авиалинии";
    this.pilishAirlines = "LOT Polish Airlines"
  }

  // отрисовка по 2 карточки
  showCards() {
    const twoTickets = 2;
    // let ticketsChunks = [];

    if (this.array !== this.ticketsArray) {
      this.ticketsArray = this.array;
      this.splicedArray = this.ticketsArray;
      this.ticketsChunks = [];
    }
    if (this.splicedArray.length > twoTickets) {
      this.ticketsChunks = this.splicedArray.splice(0, twoTickets);
      this.ticketsChunks.forEach((element) => {
        this.addCard(element);
      });
      this._showMore();
    } else {
      this.ticketsChunks = this.splicedArray;
      this.splicedArray.forEach((element) => {
        this.addCard(element);
      });
    }

  }

  // кнопка "показать еще"
  _showMore() {
    if (this.splicedArray.length <= 2) {
      this.buttonShowMore.classList.remove("search-result__show-more_on");
    }
    this.buttonShowMore.addEventListener("click", (event) => {
      event.stopPropagation();
      this.showCards();
    });
    // console.log(this.ticketsChunks);
  }

  // подстановка значений в карточку + создание карточки
  addCard(element) {
    this.card = this.Card(element, this.cardTemp);
    this.card.setData();
    this.card.createCard();
  }

  // сортировка по возрастанию цены
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

  // сортировка по убыванию цены
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


  // сортировка без пересадок
  sortByNoTransfer() {
    this._cleanHandler();
    const noTransfer = this.array.filter(flight =>
      flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1);
    this.array = noTransfer;
    this.showCards();
  }

  // сортировка по 1 пересадке
  sortByOneTransfer() {
    this._cleanHandler();
    const oneTransfer = this.array.filter(flight =>
      flight.flight.legs[0].segments.length > 1 || flight.flight.legs[1].segments.length > 1);
    this.array = oneTransfer;
    this.showCards();
  }

  // сортировка цена от
  sortByPriceFrom(e) {
    this._cleanHandler();
    this.inputFrom.push(e.data);
    if (e.data === null) {
      this.inputFrom.pop();
      // min.substring(0, min.length - 1);
    }
    const min = parseFloat(this.inputFrom.toString().replace(/,/g, ''));

    const fromPrice = this.arrayMain.filter(flight =>
      flight.flight.price.total.amount >= min);
    this.array = fromPrice;
    this.showCards();
  }

  // сортировка цена до
  sortByPriceTo(e) {
    this._cleanHandler();
    this.inputTo.push(e.data);
    if (e.data === null) {
      this.inputTo.pop();
      // min.substring(0, min.length - 1);
    }
    const max = parseFloat(this.inputTo.toString().replace(/,/g, ''));

    console.log(max);
    console.log(this.inputTo);
    const toPrice = this.arrayMain.filter(flight =>
      flight.flight.price.total.amount <= max);
    this.array = toPrice;
    this.showCards();
  }

  // сортировка по времени в пути
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

  // только билеты авиакомпании flightsChipCompanyFirst 
  sortByChipCompanyFirst() {
    this._cleanHandler();
    if (this.page.querySelector('input[name="chip-avia-second"]').checked) {
      this.array = this.arrayMain;
      this.showCards();
    }

    const flightsChipCompanyFirst = this.array.filter(flight => flight.flight.carrier.caption === this.aeroflot);
    this.array = flightsChipCompanyFirst;
    this.showCards();
  }

  // только билеты авиакомпании flightsChipCompanySecond 
  sortByChipCompanySecond() {
    this._cleanHandler();
    if (this.page.querySelector('input[name="chip-avia-first"]').checked) {
      this.array = this.arrayMain;
      this.showCards();
    }
    const flightsChipCompanySecond = this.array.filter(flight => flight.flight.carrier.caption === this.pilishAirlines);
    this.array = flightsChipCompanySecond;
    this.showCards();
  }

  // очистка дома перед добавлением отсортированных карточек
  _cleanHandler() {
    let d = this.page.querySelector(".search-result__tickets");
    this.page.querySelectorAll(".ticket").forEach((child) => {
      d.removeChild(child);
    });
  }

}
export default class Card {
  constructor(data, template, page) {
    this.data = data;
    this.template = template;
    this.page = page;
    this.setData = this.setData.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeHour = this.changeHour.bind(this);
    this.timeConverter = this.timeConverter.bind(this);
  }

  setData() {
    const departureTicket = this.template.querySelector(".ticket__from-box");
    const arrivalTicket = this.template.querySelector(".ticket__return-box");
    const totalPrice = this.template.querySelector(".ticket__price");

    // билет туда
    const departureCity = departureTicket.querySelector(".ticket__departure-city");
    const departureCaption = departureTicket.querySelector(".ticket__departure-caption");
    const departureAirportCode = departureTicket.querySelector(".ticket__departure-airport-code");
    const destinationCity = departureTicket.querySelector(".ticket__destination-city");
    const destinationCaption = departureTicket.querySelector(".ticket__destination-caption");
    const destinationAirportCode = departureTicket.querySelector(".ticket__destination-airport-code");
    const departureTime = departureTicket.querySelector(".ticket__departure-time");
    const departureDate = departureTicket.querySelector(".ticket__departure-date");
    const timeInFlight = departureTicket.querySelector(".ticket__time-in-flight");
    const arrivalTime = departureTicket.querySelector(".ticket__arrival-time");
    const arrivalDate = departureTicket.querySelector(".ticket__arrival-date");
    const transfer = departureTicket.querySelector(".ticket__transfer");
    const airline = departureTicket.querySelector(".ticket__airline");
    // console.log(this.data);
    // билет обратно
    const departureCityReturn = arrivalTicket.querySelector(".ticket__departure-city");
    const departureCaptionReturn = arrivalTicket.querySelector(".ticket__departure-caption");
    const departureAirportCodeReturn = arrivalTicket.querySelector(".ticket__departure-airport-code");
    const destinationCityReturn = arrivalTicket.querySelector(".ticket__destination-city");
    const destinationCaptionReturn = arrivalTicket.querySelector(".ticket__destination-caption");
    const destinationAirportCodeReturn = arrivalTicket.querySelector(".ticket__destination-airport-code");
    const departureTimeReturn = arrivalTicket.querySelector(".ticket__departure-time");
    const departureDateReturn = arrivalTicket.querySelector(".ticket__departure-date");
    const timeInFlightReturn = arrivalTicket.querySelector(".ticket__time-in-flight");
    const arrivalTimeReturn = arrivalTicket.querySelector(".ticket__arrival-time");
    const arrivalDateReturn = arrivalTicket.querySelector(".ticket__arrival-date");
    const transferReturn = arrivalTicket.querySelector(".ticket__transfer");
    const airlineReturn = arrivalTicket.querySelector(".ticket__airline");

    const noTransfer = this.data.flight.legs[0].segments.length === 1;
    const noTransferReturn = this.data.flight.legs[1].segments.length === 1;
    totalPrice.textContent = `${this.data.flight.price.total.amount + " " + "₽"}`;
    // подстановка значений туда
    departureCity.textContent = this.data.flight.legs[0].segments[0].departureCity.caption;
    departureCaption.textContent = this.data.flight.legs[0].segments[0].departureAirport.caption;
    departureAirportCode.textContent = this.data.flight.legs[0].segments[0].departureAirport.uid;
    destinationCity.textContent = this.data.flight.legs[1].segments[0].departureCity.caption;
    destinationCaption.textContent = this.data.flight.legs[1].segments[0].departureAirport.caption;
    destinationAirportCode.textContent = this.data.flight.legs[1].segments[0].departureAirport.uid;
    departureTime.textContent = this.changeHour(this.data.flight.legs[0].segments[0].departureDate);
    departureDate.textContent = this.changeDate(this.data.flight.legs[0].segments[0].departureDate);
    timeInFlight.textContent = this.timeConverter(this.data.flight.legs[0].duration);
    arrivalTime.textContent = noTransfer ? this.changeHour(this.data.flight.legs[0].segments[0].arrivalDate) : this.changeHour(this.data.flight.legs[0].segments[1].arrivalDate);
    arrivalDate.textContent = noTransfer ? this.changeDate(this.data.flight.legs[0].segments[0].arrivalDate) : this.changeDate(this.data.flight.legs[0].segments[1].arrivalDate);
    transfer.textContent = this.data.flight.legs[0].segments.length > 1 ? "1 пересадка" : "";
    airline.textContent = this.data.flight.carrier.caption;
    // console.log(typeof this.data.flight.legs[0].segments[0].departureDate);

    // подстановка значений обратно
    departureCityReturn.textContent = this.data.flight.legs[1].segments[0].departureCity.caption;
    departureCaptionReturn.textContent = this.data.flight.legs[1].segments[0].departureAirport.caption;
    departureAirportCodeReturn.textContent = this.data.flight.legs[1].segments[0].departureAirport.uid;
    destinationCityReturn.textContent = noTransferReturn ? this.data.flight.legs[1].segments[0].arrivalCity.caption : this.data.flight.legs[1].segments[1].arrivalCity.caption;
    destinationCaptionReturn.textContent = noTransferReturn ? this.data.flight.legs[1].segments[0].arrivalAirport.caption : this.data.flight.legs[1].segments[1].arrivalAirport.caption;
    destinationAirportCodeReturn.textContent = noTransferReturn ? this.data.flight.legs[1].segments[0].arrivalAirport.uid : this.data.flight.legs[1].segments[1].arrivalAirport.uid;
    departureTimeReturn.textContent = this.changeHour(this.data.flight.legs[1].segments[0].departureDate);
    departureDateReturn.textContent = this.changeDate(this.data.flight.legs[1].segments[0].departureDate);
    timeInFlightReturn.textContent = this.timeConverter(this.data.flight.legs[1].duration);
    arrivalTimeReturn.textContent = noTransferReturn ? this.changeHour(this.data.flight.legs[1].segments[0].arrivalDate) : this.changeHour(this.data.flight.legs[1].segments[1].arrivalDate);
    arrivalDateReturn.textContent = noTransferReturn ? this.changeDate(this.data.flight.legs[1].segments[0].arrivalDate) : this.changeDate(this.data.flight.legs[1].segments[1].arrivalDate);
    transferReturn.textContent = this.data.flight.legs[1].segments.length > 1 ? "1 пересадка" : "";
    airlineReturn.textContent = this.data.flight.carrier.caption;
  }

  createCard() {
    this.page
      .querySelector(".search-result__tickets")
      .append(
        this.page.querySelector(".ticket-template").content.cloneNode(true),
      );
  }

  changeDate(string) {
    const date = new Date(string);
    const day = new Intl.DateTimeFormat("ru", { day: "numeric" }).format(date);
    const month = new Intl.DateTimeFormat("ru", { month: "short" }).format(date);
    const weekday = new Intl.DateTimeFormat("ru", { weekday: "short" }).format(date);
    return `${day} ${month} ${weekday}`;
  };

  changeHour(string) {
    const date = new Date(string);
    const hour = new Intl.DateTimeFormat("ru", { hour: "2-digit" }).format(date);
    const minute = new Intl.DateTimeFormat("ru", { minute: "2-digit" }).format(date);
    return `${hour}:${minute === "0" ? "00" : minute}`;
  }

  timeConverter(string) {
    const hours = Math.floor(string / 60);
    const minutes = string % 60;
    return hours + " " + "ч" + " " + minutes + " " + "мин";
  }
}
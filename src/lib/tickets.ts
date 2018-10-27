import { Ticket } from '../interfaces/generalObject';
const ticketsList = require('../../tickets.json');

export default class TicketsManager {
  tickets: Array<Ticket>;

  constructor() {
    this.tickets = ticketsList;
  }

  getAll = () => {
    return this.tickets;
  };

  filter = filter => {
    return this.tickets.filter(filter);
  };
}

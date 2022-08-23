/**
 * Represents event
 */
export class Event {

  /** ID */
  id: string = '';
  /** Title */
  title: string = '';
  /** Subtitle */
  subtitle: string = '';
  /** Description */
  description: string = '';
  /** Image */
  image: string = '';

  /** Start date */
  start_date: string = '';
  /** End date */
  end_date: string = '';
  /** Place */
  place = '';

  /** Category */
  category: string[] = [];
  /** Languages */
  languages: string[] = [];
  /** Fees */
  fees: number = 0;
  /** URL */
  url = '';
  /** Contact person */
  contact_person: string = '';
  /** Contact phone */
  contact_phone: string = '';
  /** contact email */
  contact_mail: string = '';
}

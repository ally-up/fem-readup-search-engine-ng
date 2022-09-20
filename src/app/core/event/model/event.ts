/**
 * Represents event
 */
export class Event {

  /** ID */
  id: string | null = null;
  /** Title */
  title: string | null = null;
  /** Source */
  source: string | null = null;
  /** URL */
  url: string | null = null;

  /** Subtitle */
  subtitle: string | null = null;
  /** Description */
  description: string | null = null;
  /** Image */
  image: string | null = null;
  /** Image from bucket */
  image_bucket: string | null = null;

  /** Start date */
  start_date: string | null = null;
  /** End date */
  end_date: string | null = null;

  /** Category */
  category: string | null = null;
  /** Languages */
  languages: string[] = [];
  /** Organizer */
  organizer: string | null = null;
  /** Fees */
  fees: number = 0;

  /** Contact person */
  contact_person: string | null = null;
  /** Contact phone */
  contact_phone: string | null = null;
  /** Contact email */
  contact_mail: string | null = null;

  /** Location street */
  location_street: string | null = null;
  /** Location city */
  location_city: string | null = null;

  /** Updated */
  updated: string | null = null;
}

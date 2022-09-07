/**
 * Represents event
 */
export class Event {

  /** ID */
  id: string | null = null;
  /** Title */
  title: string | null = null;
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
  /** Place */
  place: string | null = null;

  /** Category */
  category: string | null = null;
  /** Languages */
  languages: string[] = [];
  /** Fees */
  fees: number = 0;
  /** URL */
  url: string | null = null;
  /** Contact person */
  contact_person: string | null = null;
  /** Contact phone */
  contact_phone: string | null = null;
  /** contact email */
  contact_mail: string | null = null;

  /** Updated */
  updated: string | null = null;
}

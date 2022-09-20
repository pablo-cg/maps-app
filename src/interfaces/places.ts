export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  place_name_es: string;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
  language_es?: 'es';
  language?: 'es';
  matching_text?: string;
  matching_place_name?: string;
}

export interface Context {
  id: string;
  text_es: string;
  text: string;
  wikidata?: string;
  language_es?: 'es';
  language?: 'es';
  short_code?: 'cl' | 'CL-RM';
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  landmark: boolean;
  address?: string;
  foursquare: string;
  category?: string;
  wikidata?: string;
}

export interface GeoData {
  eng: string
  lat: string
  lng: string
  capital: string
  mm: string
  districts: District[]
}
export interface District {
  eng: string,
  mm: string
  townships: Township[]
}
export interface Township {
  eng: string
  mm: string
}
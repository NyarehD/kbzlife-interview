export default interface PersonalInformation {
  title: "Mr" | "Mrs" | "Dr" | string
  type: "NRC" | "Old NRC" | "Passport" | string
  fullName: string
  state: string,
  township: string
  dateOfBirth: string
  nrcNumber: string
  nrcTypeNumber: string
}
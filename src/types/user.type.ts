import ContactInformation from "./contact-information.type";
import MailingInformation from "./mailing-information.type";
import PersonalInformation from "./personal-information.type";

export default interface User extends PersonalInformation, ContactInformation, MailingInformation {
}
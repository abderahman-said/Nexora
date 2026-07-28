import { CountryOption } from "./country";

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  serviceCategory: string;
  budgetRange: string;
  projectDetails: string;
  attachments?: File[];
}

export interface PhoneInputWithCountryProps {
  selectedCountry: CountryOption;
  onSelectCountry: (country: CountryOption) => void;
  phoneNumber: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

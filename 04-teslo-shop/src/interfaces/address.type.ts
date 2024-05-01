export interface Address {
  name: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
}
export interface UserAddress {
  name: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;

  id: string;
  userId: string;
  countryId: string;
}

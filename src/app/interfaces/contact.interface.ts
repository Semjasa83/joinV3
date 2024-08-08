export interface Contact {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  address: Address | null;
  color: string;
  _id: string;
}

export interface Address {
  street: string | null;
  streetNumber: number | null;
  city: string | null;
  zip: number | null;
  country: string | null;
}
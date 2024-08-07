export interface Contact{
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  address: {
    street: string | null;
    streetNumber: number | null;
    city: string | null;
    zip: number | null;
    country: string | null;
  }
  color: string;
}

export interface Contact {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  address: Address | null;
  color: string;
  _id: null | string;
}

export interface Address extends Contact {
  street: string | null;
  streetNumber: number | null;
  city: string | null;
  zip: number | null;
  country: string | null;
}

export class AddressImpl implements Address {
  constructor(
    public firstName: string | null = '',
    public lastName: string | null = '',
    public email: string | null = '',
    public phone: number | null = null,
    public address: Address | null = null,
    public street: string | null = '',
    public streetNumber: number | null = null,
    public city: string | null = '',
    public zip: number | null = null,
    public country: string | null = '',
    public color: string = '',
    public _id: string | null = null,
  ) {}
}

export class ContactImpl implements Contact {
  constructor(
    public firstName: string | null = '',
    public lastName: string | null = '',
    public email: string | null = '',
    public phone: number | null = null,
    public address: Address | null = new AddressImpl(),
    public color: string = '',
    public _id: string | null = null,
  ) {}
}

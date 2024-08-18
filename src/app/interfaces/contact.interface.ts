export interface Contact {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: number | null;
  address: AddressDetails | null;
  color: string;
  _id: null | string;
}

export interface AddressDetails {
  street: string | '';
  streetNumber: string | '';
  city: string | '';
  zip: number | null;
  country: string | '';
}

export interface Address extends Contact {
  address: AddressDetails;
}

export class AddressImpl implements AddressDetails {
  constructor(
    public street: string = '',
    public streetNumber: string = '',
    public city: string = '',
    public zip: number | null = null,
    public country: string = '',
  ) {}
}

export class ContactImpl implements Contact {
  constructor(
    public firstName: string | null = '',
    public lastName: string | null = '',
    public email: string | null = '',
    public phone: number | null = null,
    public address: AddressDetails | null = new AddressImpl(),
    public color: string = '',
    public _id: string | null = null,
  ) {}
}

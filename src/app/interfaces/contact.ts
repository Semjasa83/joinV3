
export class Contact {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    phone: number;
    mobile: string;
    shortTag: string;
    color: string;
    city: string;
    postalcode: string;
    state: string;
    street: string;
    streetnumber: string;

    constructor (obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthday = obj ? obj.birthday : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.mobile = obj ? obj.mobile : '';
        this.shortTag = obj ? obj.shortTag : '';
        this.color = obj ? obj.color : '';
        this.city = obj ? obj.city : '';
        this.postalcode = obj ? obj.postalcode : '';
        this.state = obj ? obj.state : '';
        this.street = obj ? obj.street : '';
        this.streetnumber = obj ? obj.streetnumber : '';
    }

    public toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            birthday: this.birthday,
            email: this.email,
            phone: this.phone,
            mobile: this.mobile,
            shortTag: this.shortTag,
            color: this.color,
            city: this.city,
            postalcode: this.postalcode,
            state: this.state,
            street: this.street,
            streetnumber: this.streetnumber
        }
    }
}
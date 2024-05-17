
export class Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    mobile: number;
    address: {
        street: string;
        streetnumber: string;
        city: string;
        zip: string;
        country: string;
    };
    id: string;
    color: string;

    constructor (obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.mobile = obj ? obj.mobile : '';
        this.address = obj ? obj.address : {
            street: '',
            streetnumber: '',
            city: '',
            zip: '',
            country: ''
        };
        this.id = obj ? obj.id : '';
        this.color = obj ? obj.color : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            mobile: this.mobile,
            address: this.address,
            id: this.id,
            color: this.color
        }
    }
}

export class Contact {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: number;
    address: {
        street: string | null;
        streetnumber: string | null;
        city: string | null;
        zip: number;
        country: string | null;
    };
    id: string;
    color: string;

    constructor (obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
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

    // public toJSON() {
    //     return {
    //         firstName: this.firstName,
    //         lastName: this.lastName,
    //         email: this.email,
    //         phone: this.phone,
    //         address: this.address,
    //         id: this.id,
    //         color: this.color
    //     }
    // }
}


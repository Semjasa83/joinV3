
export class Contact {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: number | null;
    address: {
        street: string | null;
        streetnumber: number | null;
        city: string | null;
        zip: number | null;
        country: string | null;
    };
    color: string;

    constructor (obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : null;
        this.address = obj ? obj.address : {
            street: '',
            streetnumber: null,
            city: '',
            zip: null,
            country: ''
        };
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


export class funddata {
    contact_id!: string;
    account_type!: string;
    bank_account!: {
        name: string;
        ifsc: any;
        account_number: number
    }
}
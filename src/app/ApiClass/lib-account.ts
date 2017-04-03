import {LibTransaction} from './lib-transaction'

export class LibAccount {
accountId?: string;
value?: number;
open_date?: string;
user_id?: string;
bank_id?: string;
bankName?: string;
CreditPersent?: string;
DepositPersent?: string;
CreditLimit?: number;
transaction?: Array<LibTransaction>;
}

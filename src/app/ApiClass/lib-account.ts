import {LibTransaction} from './lib-transaction'

export class LibAccount {
accountId?: number;
value?: number;
open_date?: string;
user_id?: number;
bank_id?: number;
bankName?: string;
CreditPersent?: string;
DepositPersent?: string;
CreditLimit?: number;
transaction?: Array<LibTransaction>;
}

import { Branch, District, MediaUpload, State } from './cms.model';
import { UserModel } from './user.model';

export class Principle {
    code: string;
    name: string;
}


export class UserRegion {
    user: UserModel
    states: State[]
    districts: District[]
    branches: Branch[]
}



export class RentMaster {
    [x: string]: any;
    id: number;
    bank: number;
    state: number;
    district: number;
    branch: Branch;
    LandlordName: string;
    LandlordAccountNumber: string;
    LandlordConfirmAccountNumber: string;
    LandlordMobile: number;
    LandlordEmail: string;
    IFSC: string;
    DepositAmount: number;
    DepositUTR: string;
    DepositDate: string;
    AgreementDate: Date;
    AgreementExpiryDate: Date;
    Remark: string;
    Attachment: MediaUpload[];
    rent_details: RentDetails[]
    branch_actions : BranchAction[]
    ValidUntil : Date
}

export class RentDetails {
    id: number;
    From: Date;
    ToDate: Date;
    RentAmount: number;
}

export class UploadUTR {
    id: number;
    utr: string;
    amount: number;
    txn_date: Date;
    month: string;
    year: number;
    created_by: number;
    rent_master : RentMaster
}

export class BranchAction {
    id: number
    actionMonth: Date
    action: string
    rent_master : RentMaster
}
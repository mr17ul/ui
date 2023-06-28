import { RentMaster } from './rentadmin.model';
import { UserModel } from './user.model';

export class Principle {
    code: string;
    name: string;

}
export class Bank {
    code: string;
    name: string;
    description: string;
}

export class State {
    code: string;
    name: string;
    description: string;
}
export class District {
    code: string;
    name: string;
    description: string;
    state: State;
}

export class Branch {
    id: number
    code: string;
    name: string;
    description: string;
    district: District
}

export class ComplaintCategory {
    code: string
    name: string
    description: string
}

export class Feedback {
    code: string
    name: string
    email: string
    mobile: string
    subject: string
    message: string
}

export class ComplaintAction {
    remarks: string
    actionTaken: string
    complaint: Complaint
    created_at: Date
}

export class Complaint {
    id: number
    memberName: string;
    memberId: string;
    groupName: string;
    groupId: string;
    details: string;
    complaintDate: Date;
    signature: string;
    category: ComplaintCategory;
    branch: Branch;
    bank: Bank;
    principle: Principle;
    mobileNo: bigint;
    email: string;
    complaintActions: Array<ComplaintAction>;
    attachments: any[]

}

export class UserRegion {
    user: UserModel
    states: State[]
    districts: District[]
    branches: Branch[]
}

export class MediaUpload {
    public id: number
    public url: string
    public name: string
    public size: number
    public file: File
}


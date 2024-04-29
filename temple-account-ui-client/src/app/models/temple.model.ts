export interface Member {
    memberId: number;
    name: string;
    fatherName: string;
    gender: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: string;
    ancestorVillage: string;
    phone: string;
    whatsApp: string;
    emailId: string;
    notes: string;
    createdDt: Date;
    createdBy: string;
    updatedDt: Date;
    updatedBy: string;
}

export interface SearchMemberQuery {
    memberId: number;
    name: string;
    fatherName: string;
    gender: string;
    city: string;
    zipCode: string;
    ancestorVillage: string;
    phone: string;
    whatsApp: string;
    emailId: string;
}

export interface SearchPaymentQuery {
    paymentId: number;
    memberId: number;
    receiptNo: number;
    occasionCd: string;
    paymentType: string;
    financialYear: string;
    paymentDate: Date;
    paymentMode: string;
}

export interface Payment {
    paymentId: number;
    member: Member;
    receiptNo: number;
    occasionCd: string;
    occasionDesc: string;
    paymentType: string;
    paymentAmount: number;
    financialYear: string;
    paymentDate: Date;
    paymentMode: string;
    createdDt: Date;
    createdBy: string;
    updatedDt: Date;
    updatedBy: string;
}

export interface Occasion {
    value: string;
    viewValue: string;
  }



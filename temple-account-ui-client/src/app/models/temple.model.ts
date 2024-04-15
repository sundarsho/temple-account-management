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



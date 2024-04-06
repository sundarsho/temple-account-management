export interface User {
    userId: number;
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
}

export interface SearchUserQuery {
    userId: number;
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



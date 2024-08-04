export interface Member {
    memberId: number;
    name: string;
    fatherName: string;
    gender: string;
    status: string;
    streetAddress1: string;
    streetAddress2: string;
    streetAddress3: string;
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
    receivedBy: string;
    groupByField: string;
    aggregationType: string;
    aggregationField: string;
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
    comments: string;
    receivedBy: string;
    createdDt: Date;
    createdBy: string;
    updatedDt: Date;
    updatedBy: string;
}

export interface Occasion {
    value: string;
    viewValue: string;
  }

  export interface GroupBy {
    value: string;
    viewValue: string;
  }

  export interface GroupSummaryStatistics {
    groupBy: string;
    description: string;
    count: number;
    sum: number;
    value: any;
  }

  export class QueryParams {
    public static readonly DEFAULT_GROUP_BY_FIELD : string = 'paymentType';
    public static readonly DEFAULT_FINANCIAL_YEAR : string = '2024-2025';
    public static readonly DEFAULT_AGGREGATION : string = 'paymentAmount';
    public static readonly DEFAULT_DATE_STR : string = '';
    groupByField: string = QueryParams.DEFAULT_GROUP_BY_FIELD;  
    selectedDateStr: string = QueryParams.DEFAULT_DATE_STR;  
    financialYear: string = QueryParams.DEFAULT_FINANCIAL_YEAR;  
  }

  export interface FieldDescriptor {
    name: string;
    displayName: string;   
    
  }


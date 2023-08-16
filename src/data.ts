
export enum ReportType {
    Expense = "expense",
    Income = "income",
}

export interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type: ReportType
    }[]
    
}

export const data: Data = {
    report: [
        {
            id: "ec486468-ec5d-4599-815b-04f2e60889c8",
            source: "Salary",
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Income,
        },
        {
            id: "43ef8243-4eee-4ea0-b7cc-fd793ebeb5ae",
            source: "Youtube",
            amount: 500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Income,
        },
        {
            id: "558f8ae2-eed1-422c-94fc-b6549319bc11",
            source: "Food",
            amount: 1500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Expense,
        },
        {
            id: "uuid4",
            source: "Car",
            amount: 12500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.Expense,
        }
    ]
}



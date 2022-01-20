export interface IIncomesCategory {
  id: string;
  value: number;
  category: string;
  color: string;
}

export interface IIncomesCategoryData {
  [key: string]: IIncomesCategory[];
}

export interface IIncomesCategoryResponse {
  income: IIncomesCategoryData;
  expense: IIncomesCategoryData;
}

export interface IStatisticsResponse {
  balance: number;
  incomes: number;
  expenses: number;
  transactions_performed: number;
}

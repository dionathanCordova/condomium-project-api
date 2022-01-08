export const mockExpense = () => {
  return {
    id: '09982e30-1e9b-4ba6-b065-88441deb0900',
    water_bill: 200,
    electricity_bill: 102,
    gas_bill: 140,
    cash_reserve_after_bill: 2020.1,
    month: 2,
    year: 2021,
    condominium_id: '09982e30-1e9b-4ba6-b065-88441deb0900',
  };
};

export const mockExpenseReport = {
  createExpenseReport: jest.fn().mockResolvedValue(mockExpense()),
  findOne: jest.fn().mockResolvedValue(mockExpense()),
  updateExpenseReport: jest.fn().mockResolvedValue(mockExpense()),
};

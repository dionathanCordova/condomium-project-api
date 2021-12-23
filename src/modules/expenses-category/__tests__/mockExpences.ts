export const mockExpense = () => {
  return {
    id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
    title: 'Troca gás',
  };
};

export const mockExpensesCategoryRepository = {
  findAll: jest.fn().mockResolvedValue(mockExpense()),
  createExpensesCategory: jest.fn().mockResolvedValue(mockExpense()),
  updateExpense: jest.fn().mockResolvedValue(mockExpense()),
  removeExpense: jest.fn().mockResolvedValue(mockExpense()),
};

export const mockExpense = () => {
  return {
    id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
    title: 'Gás',
    value: 100,
    month: 1,
    year: 2021,
    category_id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
    condominium_id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
  };
};

export const mockExpensesRepositoty = {
  createExpense: jest.fn().mockResolvedValue(mockExpense()),
  findAll: jest.fn().mockResolvedValue(mockExpense()),
  update: jest.fn().mockResolvedValue(mockExpense()),
  delete: jest.fn().mockResolvedValue(mockExpense()),
};

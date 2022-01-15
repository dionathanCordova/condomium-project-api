export const mockWaterExpenses = () => {
  return {
    id: '09982e30-1e9b-4ba6-b065-88441deb0900',
    apartment: '201',
    previous_reading: 10,
    current_reading: 11,
    m3_expenses: 1,
    total_value: 4,
    add_value: 1,
    confirm_expense: true,
    month: 1,
    year: 2022,
    condominium_id: '09982e30-1e9b-4ba6-b065-88441deb0900',
  };
};

export const mockWaterExpensesRepository = {
  createWaterExpenses: jest.fn().mockResolvedValue(mockWaterExpenses()),
  findOne: jest.fn().mockResolvedValue(mockWaterExpenses()),
  updateWaterExpenses: jest.fn().mockResolvedValue(mockWaterExpenses()),
};

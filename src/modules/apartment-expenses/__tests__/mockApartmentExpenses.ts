export const mockApartmentExpenses = () => {
  return {
    id: '09982e30-1e9b-4ba6-b065-88441deb0900',
    water_bill: 200,
    electricity_bill: 102,
    gas_bill: 140,
    cash_reserve_after_bill: 2020.1,
    month: 2,
    year: 2021,
    condominium_id: '09982e30-1e9b-4ba6-b065-88441deb0900',
    cleaning_expenses: 102,
    reserve_expenses: 500,
    apartment: '201',
    total: 210,
    payment_status: 'Done',
    total_debt: 600,
  };
};

export const mockApartmentExpensesRepository = {
  createApartmentExpenses: jest.fn().mockResolvedValue(mockApartmentExpenses()),
  findOne: jest.fn().mockResolvedValue(mockApartmentExpenses()),
  updateApartmentExpenses: jest.fn().mockResolvedValue(mockApartmentExpenses()),
};

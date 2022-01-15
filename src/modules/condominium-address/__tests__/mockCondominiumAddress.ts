export const mockCondominiumStub = () => {
  return {
    id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
    city: 'Rebecca',
    state: 'Santa Catarina',
    cep: '00110-102',
    number: '200c',
    country: 'Brasil',
    created_at: '2021-12-09T14:56:15.397Z',
    condominium_id: '21a19f85-cfeb-4ad4-8474-c1aac4b88643',
  };
};

export const mockCondominiumAddressRepository = {
  find: jest.fn().mockResolvedValue(mockCondominiumStub()),
  findOne: jest.fn().mockResolvedValue(mockCondominiumStub()),
  createCondominiumAddress: jest.fn().mockResolvedValue(mockCondominiumStub()),
  updateCondominiumAddress: jest.fn().mockResolvedValue(mockCondominiumStub()),
};

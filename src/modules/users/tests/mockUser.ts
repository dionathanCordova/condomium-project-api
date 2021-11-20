import { Users } from '../entities/user.entity';

export const mockUser = () => {
  const user = {
    name: 'dionathan',
    telephone: '123',
    apartment: '201',
    condominium_id: 1,
    email: 'dionathan@test.com',
    password: 'pass',
    id: '09982e30-1e9b-4ba6-b065-88441deb0e7c',
    permission_id: 0,
    avatar: '',
    can_show_data: true,
    is_admin: false,
  };

  return new Users(user);
};

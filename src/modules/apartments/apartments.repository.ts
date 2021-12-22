import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartments } from './entities/apartment.entity';

@EntityRepository(Apartments)
export class ApartmentsRepository extends BaseRepository<Apartments> {
  async findAll(condominium_id: string) {
    return this.find({ where: { condominium_id } });
  }

  async getOne(apartment: string, condominium_id: string) {
    return this.findOne({ where: { apartment, condominium_id } });
  }

  async createApartment(createApartmentDto: CreateApartmentDto) {
    const apartment = this.create(createApartmentDto);
    return this.save(apartment);
  }

  async deleteApartment(id: string) {
    return this.delete(id);
  }
}

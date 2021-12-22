import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ApartmentsRepository } from './apartments.repository';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(private readonly apartmentsRepository: ApartmentsRepository) {}

  async create(createApartmentDto: CreateApartmentDto) {
    const findExists = await this.apartmentsRepository.getOne(
      createApartmentDto.apartment,
      createApartmentDto.condominium_id,
    );

    if (findExists)
      throw new NotAcceptableException('Apartment already exists');

    return this.apartmentsRepository.createApartment(createApartmentDto);
  }

  findAll(condominium_id: string) {
    return this.apartmentsRepository.findAll(condominium_id);
  }

  async remove(id: string) {
    const findExists = await this.apartmentsRepository.findOne(id);

    if (!findExists) throw new NotAcceptableException('Apartment not exists');

    return this.apartmentsRepository.deleteApartment(id);
  }
}

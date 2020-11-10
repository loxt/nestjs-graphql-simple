import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { MongoRepository } from 'typeorm';
import { validateOrReject } from 'class-validator';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email) private emailRepository: MongoRepository<Email>,
  ) {}

  async create(createEmailInput: CreateEmailInput): Promise<Email> {
    const createEmail = new Email();
    Object.assign(createEmail, createEmailInput);

    await validateOrReject(createEmail);
    return this.emailRepository.save(createEmail);
  }

  async findAll(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  async findOne(email: string): Promise<Email> {
    return this.emailRepository.findOne({ email: email });
  }

  async update({ email, name }: UpdateEmailInput): Promise<Email> {
    const updateEmail = await this.emailRepository.findOne({ email });

    if (!updateEmail) {
      throw new NotFoundException();
    }
    updateEmail.name = name;
    await validateOrReject(updateEmail);

    return this.emailRepository.save(updateEmail);
  }

  async remove(email: string): Promise<Email> {
    const deleteEmail = await this.emailRepository.findOneAndDelete({ email });
    if (!deleteEmail.value) {
      throw new NotFoundException();
    }
    return deleteEmail.value;
  }
}

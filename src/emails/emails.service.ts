import { Injectable } from '@nestjs/common';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
  ) {}

  async create(createEmailInput: CreateEmailInput) {
    const createEmail = new Email();
    Object.assign(createEmail, createEmailInput);

    await validateOrReject(createEmail);
    return this.emailRepository.save(createEmail);
  }

  async findAll() {
    return this.emailRepository.find();
  }

  async findOne(email: string) {
    return this.emailRepository.findOne({ email: email });
  }

  async update({ email, name }: UpdateEmailInput) {
    const updateEmail = await this.emailRepository.findOne({ email });

    updateEmail.name = name;
    await validateOrReject(updateEmail);

    return this.emailRepository.save(updateEmail);
  }

  async remove(email: string) {
    return this.emailRepository.delete({ email });
  }
}

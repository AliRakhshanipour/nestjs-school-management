import { ConflictException } from '@nestjs/common';

export class PersonalCodeExistsException extends ConflictException {
  constructor(personalCode: string) {
    super(
      `A teacher with this personal code (${personalCode}) already exists.`,
    );
  }
}

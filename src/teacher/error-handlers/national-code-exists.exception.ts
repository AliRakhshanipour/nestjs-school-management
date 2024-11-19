import { ConflictException } from '@nestjs/common';

export class NationalCodeExistsException extends ConflictException {
  constructor(nationalCode: string) {
    super(
      `A teacher with this national code (${nationalCode}) already exists.`,
    );
  }
}

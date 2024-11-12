import { IsNumber } from 'class-validator';

export class GetUserById {
  @IsNumber()
  id: number;
}

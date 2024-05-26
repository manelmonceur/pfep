import { PartialType } from '@nestjs/mapped-types';

export class CreateChildDto {
  firstName: string;
  lastName: string;
  class: string;
}

export class UpdateChildDto extends PartialType(CreateChildDto) {}

import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({ type: String, required: true, default: 'My Address' })
  address: `0x${string}`;

  @ApiProperty({ type: Number, required: true, default: 1 })
  amountToMint: number;
}

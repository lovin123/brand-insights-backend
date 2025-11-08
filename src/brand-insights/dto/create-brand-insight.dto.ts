import { IsNotEmpty, IsString, IsUrl, IsEmail } from 'class-validator';

export class CreateBrandInsightDto {
  @IsNotEmpty({ message: 'Brand name is required' })
  @IsString({ message: 'Brand name must be a string' })
  brandName: string;

  @IsNotEmpty({ message: 'Brand website is required' })
  @IsUrl({}, { message: 'Brand website must be a valid URL' })
  brandWebsite: string;

  @IsNotEmpty({ message: 'Contact email is required' })
  @IsEmail({}, { message: 'Contact email must be a valid email address' })
  contactEmail: string;
}

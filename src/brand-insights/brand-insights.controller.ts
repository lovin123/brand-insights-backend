import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BrandInsightsService } from './brand-insights.service';
import { CreateBrandInsightDto } from './dto/create-brand-insight.dto';

@Controller('brand-insights')
export class BrandInsightsController {
  constructor(private readonly brandInsightsService: BrandInsightsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createBrandInsightDto: CreateBrandInsightDto) {
    return this.brandInsightsService.generateInsights(createBrandInsightDto);
  }
}

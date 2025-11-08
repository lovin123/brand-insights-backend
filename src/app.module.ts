import { Module } from '@nestjs/common';
import { BrandInsightsController } from './brand-insights/brand-insights.controller';
import { BrandInsightsService } from './brand-insights/brand-insights.service';

@Module({
  imports: [],
  controllers: [BrandInsightsController],
  providers: [BrandInsightsService],
})
export class AppModule {}

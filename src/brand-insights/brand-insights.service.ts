import { Injectable } from '@nestjs/common';
import { CreateBrandInsightDto } from './dto/create-brand-insight.dto';

export interface KeywordVolume {
  keyword: string;
  monthlySearchVolume: number;
}

export interface Competitor {
  name: string;
  searchScore: number;
}

export interface HistoricalDataPoint {
  month: string;
  visibility: number;
  searchScore: number;
}

export interface BrandInsightsMetrics {
  googleVisibility: number;
  searchScore: number;
  keywordVolumes: KeywordVolume[];
  competitorAnalysis: Competitor[];
  historicalTrend: HistoricalDataPoint[];
  scoreBreakdown: {
    visibility: number;
    keywordStrength: number;
    backlinks: number;
    domainAuthority: number;
  };
}

export interface BrandInsightsResponse {
  message: string;
  submittedDetails: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  };
  metrics: BrandInsightsMetrics;
}

@Injectable()
export class BrandInsightsService {
  /**
   * Generate mock brand insights based on brand details
   */
  generateInsights(dto: CreateBrandInsightDto): BrandInsightsResponse {
    // Generate Google Visibility Score (60-95)
    const googleVisibility = this.randomInt(60, 95);

    // Generate Search Score (weighted average of visibility and keyword strength)
    const keywordStrength = this.randomInt(50, 90);
    const searchScore = Math.round(
      googleVisibility * 0.6 + keywordStrength * 0.4,
    );

    // Generate Keyword Volumes (3-5 keywords)
    const keywordCount = this.randomInt(3, 5);
    const keywordVolumes = this.generateKeywordVolumes(
      dto.brandName,
      keywordCount,
    );

    // Generate Competitor Analysis (3-4 competitors)
    const competitorCount = this.randomInt(3, 4);
    const competitorAnalysis = this.generateCompetitors(competitorCount);

    // Generate Historical Trend Data (last 6 months)
    const historicalTrend = this.generateHistoricalTrend(
      googleVisibility,
      searchScore,
    );

    // Generate Score Breakdown
    const scoreBreakdown = {
      visibility: googleVisibility,
      keywordStrength: keywordStrength,
      backlinks: this.randomInt(40, 85),
      domainAuthority: this.randomInt(45, 90),
    };

    return {
      message: `Brand insights generated successfully for ${dto.brandName}`,
      submittedDetails: {
        brandName: dto.brandName,
        brandWebsite: dto.brandWebsite,
        contactEmail: dto.contactEmail,
      },
      metrics: {
        googleVisibility,
        searchScore,
        keywordVolumes,
        competitorAnalysis,
        historicalTrend,
        scoreBreakdown,
      },
    };
  }

  /**
   * Generate random integer between min and max (inclusive)
   */
  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate keyword volumes based on brand name
   */
  private generateKeywordVolumes(
    brandName: string,
    count: number,
  ): KeywordVolume[] {
    const baseKeywords = [
      `${brandName.toLowerCase()} sign`,
      `digital signature ${brandName.toLowerCase()}`,
      `${brandName.toLowerCase()} platform`,
      `best ${brandName.toLowerCase()}`,
      `${brandName.toLowerCase()} review`,
      `online ${brandName.toLowerCase()}`,
      `${brandName.toLowerCase()} software`,
    ];

    // Select random keywords
    const selectedKeywords = this.shuffleArray([...baseKeywords]).slice(
      0,
      count,
    );

    return selectedKeywords.map((keyword) => ({
      keyword,
      monthlySearchVolume: this.randomInt(500, 10000),
    }));
  }

  /**
   * Generate mock competitors
   */
  private generateCompetitors(count: number): Competitor[] {
    const competitorNames = [
      'DocuSign',
      'SignNow',
      'Adobe Sign',
      'HelloSign',
      'PandaDoc',
      'SignRequest',
      'RightSignature',
    ];

    const selected = this.shuffleArray([...competitorNames]).slice(0, count);

    return selected
      .map((name) => ({
        name,
        searchScore: this.randomInt(65, 95),
      }))
      .sort((a, b) => b.searchScore - a.searchScore); // Sort by score descending
  }

  /**
   * Generate historical trend data for the last 6 months
   */
  private generateHistoricalTrend(
    currentVisibility: number,
    currentSearchScore: number,
  ): HistoricalDataPoint[] {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const currentDate = new Date();
    const trend: HistoricalDataPoint[] = [];

    // Generate data for last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthName = months[date.getMonth()];

      // Create a trend that gradually increases to current values
      const progress = i === 5 ? 0.7 : 1 - (5 - i) * 0.05;
      const visibility = Math.max(
        50,
        Math.round(currentVisibility * progress + this.randomInt(-5, 5)),
      );
      const searchScore = Math.max(
        50,
        Math.round(currentSearchScore * progress + this.randomInt(-5, 5)),
      );

      trend.push({
        month: monthName,
        visibility,
        searchScore,
      });
    }

    return trend;
  }

  /**
   * Shuffle array (Fisher-Yates algorithm)
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

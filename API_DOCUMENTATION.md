# Brand Insights API Documentation

## Overview

The Brand Insights API is a RESTful service built with NestJS that generates comprehensive marketing analytics and performance insights for brands. The API provides simulated data including Google Visibility Scores, Search Scores, Keyword Volumes, and Competitor Analysis.

**Base URL:** `http://localhost:3001/api`

**API Version:** 1.0.0

**Content-Type:** `application/json`

---

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Generate Brand Insights](#generate-brand-insights)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Rate Limiting](#rate-limiting)
- [CORS Configuration](#cors-configuration)

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

---

## Endpoints

### Generate Brand Insights

Generate comprehensive brand performance insights including visibility scores, keyword data, competitor analysis, and historical trends.

**Endpoint:** `POST /api/brand-insights`

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "brandName": "string (required)",
  "brandWebsite": "string (required, valid URL)",
  "contactEmail": "string (required, valid email)"
}
```

**Request Body Schema:**

| Field          | Type   | Required | Validation                      | Description             |
| -------------- | ------ | -------- | ------------------------------- | ----------------------- |
| `brandName`    | string | Yes      | Non-empty string                | The name of the brand   |
| `brandWebsite` | string | Yes      | Valid URL (http:// or https://) | The brand's website URL |
| `contactEmail` | string | Yes      | Valid email format              | Contact email address   |

**Response:** `200 OK`

**Response Body:**

```json
{
  "message": "string",
  "submittedDetails": {
    "brandName": "string",
    "brandWebsite": "string",
    "contactEmail": "string"
  },
  "metrics": {
    "googleVisibility": "number (60-95)",
    "searchScore": "number (calculated)",
    "keywordVolumes": [
      {
        "keyword": "string",
        "monthlySearchVolume": "number"
      }
    ],
    "competitorAnalysis": [
      {
        "name": "string",
        "searchScore": "number (65-95)"
      }
    ],
    "historicalTrend": [
      {
        "month": "string",
        "visibility": "number",
        "searchScore": "number"
      }
    ],
    "scoreBreakdown": {
      "visibility": "number",
      "keywordStrength": "number",
      "backlinks": "number",
      "domainAuthority": "number"
    }
  }
}
```

**Response Fields:**

| Field                        | Type   | Description                                              |
| ---------------------------- | ------ | -------------------------------------------------------- |
| `message`                    | string | Success message with brand name                          |
| `submittedDetails`           | object | Echo of submitted brand information                      |
| `metrics.googleVisibility`   | number | Google Visibility Score (0-100)                          |
| `metrics.searchScore`        | number | Overall Search Score (0-100)                             |
| `metrics.keywordVolumes`     | array  | List of keywords with monthly search volumes (3-5 items) |
| `metrics.competitorAnalysis` | array  | List of competitors with search scores (3-4 items)       |
| `metrics.historicalTrend`    | array  | Last 6 months of performance data                        |
| `metrics.scoreBreakdown`     | object | Detailed breakdown of score components                   |

---

## Data Models

### CreateBrandInsightDto

```typescript
{
  brandName: string; // Required, non-empty
  brandWebsite: string; // Required, valid URL
  contactEmail: string; // Required, valid email
}
```

### KeywordVolume

```typescript
{
  keyword: string; // Keyword phrase
  monthlySearchVolume: number; // Estimated monthly searches (500-10000)
}
```

### Competitor

```typescript
{
  name: string; // Competitor brand name
  searchScore: number; // Search score (65-95)
}
```

### HistoricalDataPoint

```typescript
{
  month: string; // Month abbreviation (e.g., "Jan", "Feb")
  visibility: number; // Google Visibility score for the month
  searchScore: number; // Search Score for the month
}
```

### ScoreBreakdown

```typescript
{
  visibility: number; // Google Visibility (60-95)
  keywordStrength: number; // Keyword Strength (50-90)
  backlinks: number; // Backlinks score (40-85)
  domainAuthority: number; // Domain Authority (45-90)
}
```

### BrandInsightsResponse

```typescript
{
  message: string;
  submittedDetails: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  };
  metrics: {
    googleVisibility: number;
    searchScore: number;
    keywordVolumes: KeywordVolume[];
    competitorAnalysis: Competitor[];
    historicalTrend: HistoricalDataPoint[];
    scoreBreakdown: ScoreBreakdown;
  };
}
```

---

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

### Validation Errors (400 Bad Request)

When request validation fails:

```json
{
  "statusCode": 400,
  "message": [
    "Brand name is required",
    "Brand website must be a valid URL",
    "Contact email must be a valid email address"
  ],
  "error": "Bad Request"
}
```

**Common Validation Errors:**

| Error Message                                 | Field          | Cause                     |
| --------------------------------------------- | -------------- | ------------------------- |
| "Brand name is required"                      | `brandName`    | Field is empty or missing |
| "Brand name must be a string"                 | `brandName`    | Invalid data type         |
| "Brand website is required"                   | `brandWebsite` | Field is empty or missing |
| "Brand website must be a valid URL"           | `brandWebsite` | Invalid URL format        |
| "Contact email is required"                   | `contactEmail` | Field is empty or missing |
| "Contact email must be a valid email address" | `contactEmail` | Invalid email format      |

### Server Errors (500 Internal Server Error)

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Examples

### cURL

**Request:**

```bash
curl -X POST http://localhost:3001/api/brand-insights \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "Zoop.one",
    "brandWebsite": "https://zoop.one",
    "contactEmail": "contact@zoop.one"
  }'
```

**Response:**

```json
{
  "message": "Brand insights generated successfully for Zoop.one",
  "submittedDetails": {
    "brandName": "Zoop.one",
    "brandWebsite": "https://zoop.one",
    "contactEmail": "contact@zoop.one"
  },
  "metrics": {
    "googleVisibility": 82,
    "searchScore": 76,
    "keywordVolumes": [
      {
        "keyword": "zoop.one sign",
        "monthlySearchVolume": 2400
      },
      {
        "keyword": "digital signature zoop.one",
        "monthlySearchVolume": 5400
      },
      {
        "keyword": "zoop.one platform",
        "monthlySearchVolume": 3200
      }
    ],
    "competitorAnalysis": [
      {
        "name": "DocuSign",
        "searchScore": 88
      },
      {
        "name": "SignNow",
        "searchScore": 72
      },
      {
        "name": "Adobe Sign",
        "searchScore": 91
      }
    ],
    "historicalTrend": [
      {
        "month": "Jul",
        "visibility": 58,
        "searchScore": 54
      },
      {
        "month": "Aug",
        "visibility": 62,
        "searchScore": 58
      },
      {
        "month": "Sep",
        "visibility": 68,
        "searchScore": 63
      },
      {
        "month": "Oct",
        "visibility": 73,
        "searchScore": 69
      },
      {
        "month": "Nov",
        "visibility": 78,
        "searchScore": 73
      },
      {
        "month": "Dec",
        "visibility": 82,
        "searchScore": 76
      }
    ],
    "scoreBreakdown": {
      "visibility": 82,
      "keywordStrength": 68,
      "backlinks": 65,
      "domainAuthority": 78
    }
  }
}
```

### JavaScript (Fetch API)

```javascript
const response = await fetch('http://localhost:3001/api/brand-insights', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    brandName: 'Zoop.one',
    brandWebsite: 'https://zoop.one',
    contactEmail: 'contact@zoop.one',
  }),
});

const data = await response.json();
console.log(data);
```

### JavaScript (Axios)

```javascript
const axios = require('axios');

const response = await axios.post('http://localhost:3001/api/brand-insights', {
  brandName: 'Zoop.one',
  brandWebsite: 'https://zoop.one',
  contactEmail: 'contact@zoop.one',
});

console.log(response.data);
```

### Python (Requests)

```python
import requests

url = 'http://localhost:3001/api/brand-insights'
payload = {
    'brandName': 'Zoop.one',
    'brandWebsite': 'https://zoop.one',
    'contactEmail': 'contact@zoop.one'
}

response = requests.post(url, json=payload)
data = response.json()
print(data)
```

### TypeScript (with error handling)

```typescript
interface BrandInsightRequest {
  brandName: string;
  brandWebsite: string;
  contactEmail: string;
}

interface BrandInsightResponse {
  message: string;
  submittedDetails: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  };
  metrics: {
    googleVisibility: number;
    searchScore: number;
    keywordVolumes: Array<{
      keyword: string;
      monthlySearchVolume: number;
    }>;
    competitorAnalysis: Array<{
      name: string;
      searchScore: number;
    }>;
    historicalTrend: Array<{
      month: string;
      visibility: number;
      searchScore: number;
    }>;
    scoreBreakdown: {
      visibility: number;
      keywordStrength: number;
      backlinks: number;
      domainAuthority: number;
    };
  };
}

async function generateBrandInsights(
  request: BrandInsightRequest,
): Promise<BrandInsightResponse> {
  try {
    const response = await fetch('http://localhost:3001/api/brand-insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate insights');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating brand insights:', error);
    throw error;
  }
}

// Usage
const insights = await generateBrandInsights({
  brandName: 'Zoop.one',
  brandWebsite: 'https://zoop.one',
  contactEmail: 'contact@zoop.one',
});
```

---

## Rate Limiting

Currently, there are no rate limits imposed on the API. However, it's recommended to implement reasonable request throttling in production environments.

---

## CORS Configuration

The API is configured to accept requests from:

- **Origin:** `http://localhost:3000`
- **Methods:** `GET, HEAD, PUT, PATCH, POST, DELETE`
- **Credentials:** Enabled

To modify CORS settings, update the configuration in `src/main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:3000', // Change to your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

---

## Notes

### Data Generation

- All metrics are **simulated/mock data** for demonstration purposes
- Google Visibility Score: Random value between 60-95
- Search Score: Weighted average (60% visibility + 40% keyword strength)
- Keyword Volumes: Randomly generated (3-5 keywords, 500-10000 monthly searches)
- Competitor Analysis: Randomly selected from a predefined list (3-4 competitors)
- Historical Trend: Last 6 months with gradual progression to current values
- Score Breakdown: Individual component scores for detailed analysis

### Future Enhancements

The API is designed to be easily extended with:

- Real API integrations (Google Search Console, SEMrush, Ahrefs)
- Database persistence for historical data
- User authentication and authorization
- Rate limiting and request throttling
- Caching for improved performance
- Webhook support for async processing
- Export functionality (PDF, CSV)

---

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.

**API Base URL:** `http://localhost:3001/api`  
**Documentation Version:** 1.0.0  
**Last Updated:** 2024

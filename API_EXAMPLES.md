# API Usage Examples

Quick reference guide with practical examples for common use cases.

## Table of Contents

- [Basic Request](#basic-request)
- [Error Handling](#error-handling)
- [Response Processing](#response-processing)
- [Integration Examples](#integration-examples)

---

## Basic Request

### cURL

```bash
curl -X POST http://localhost:3001/api/brand-insights \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "Zoop.one",
    "brandWebsite": "https://zoop.one",
    "contactEmail": "contact@zoop.one"
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('http://localhost:3001/api/brand-insights', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    brandName: 'Zoop.one',
    brandWebsite: 'https://zoop.one',
    contactEmail: 'contact@zoop.one'
  })
});

const insights = await response.json();
```

### Python

```python
import requests

response = requests.post(
    'http://localhost:3001/api/brand-insights',
    json={
        'brandName': 'Zoop.one',
        'brandWebsite': 'https://zoop.one',
        'contactEmail': 'contact@zoop.one'
    }
)

insights = response.json()
```

### PHP

```php
<?php
$data = [
    'brandName' => 'Zoop.one',
    'brandWebsite' => 'https://zoop.one',
    'contactEmail' => 'contact@zoop.one'
];

$ch = curl_init('http://localhost:3001/api/brand-insights');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$insights = json_decode($response, true);
curl_close($ch);
?>
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type Request struct {
    BrandName    string `json:"brandName"`
    BrandWebsite string `json:"brandWebsite"`
    ContactEmail string `json:"contactEmail"`
}

func main() {
    req := Request{
        BrandName:    "Zoop.one",
        BrandWebsite: "https://zoop.one",
        ContactEmail: "contact@zoop.one",
    }
    
    jsonData, _ := json.Marshal(req)
    resp, _ := http.Post(
        "http://localhost:3001/api/brand-insights",
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    defer resp.Body.Close()
}
```

---

## Error Handling

### JavaScript with Error Handling

```typescript
async function getBrandInsights(data: {
  brandName: string;
  brandWebsite: string;
  contactEmail: string;
}) {
  try {
    const response = await fetch('http://localhost:3001/api/brand-insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 400) {
        // Validation errors
        console.error('Validation errors:', error.message);
        return { error: 'Invalid input', details: error.message };
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    return { error: 'Network error', message: error.message };
  }
}
```

### Python with Error Handling

```python
import requests
from requests.exceptions import RequestException

def get_brand_insights(brand_name, brand_website, contact_email):
    try:
        response = requests.post(
            'http://localhost:3001/api/brand-insights',
            json={
                'brandName': brand_name,
                'brandWebsite': brand_website,
                'contactEmail': contact_email
            },
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 400:
            error_data = e.response.json()
            print(f"Validation errors: {error_data.get('message')}")
        return {'error': 'HTTP error', 'status': e.response.status_code}
    except RequestException as e:
        print(f"Request failed: {e}")
        return {'error': 'Network error', 'message': str(e)}
```

---

## Response Processing

### Extract Specific Metrics

```typescript
const insights = await getBrandInsights({
  brandName: 'Zoop.one',
  brandWebsite: 'https://zoop.one',
  contactEmail: 'contact@zoop.one'
});

// Extract specific metrics
const visibility = insights.metrics.googleVisibility;
const searchScore = insights.metrics.searchScore;
const topKeyword = insights.metrics.keywordVolumes[0];
const topCompetitor = insights.metrics.competitorAnalysis[0];

console.log(`Visibility: ${visibility}/100`);
console.log(`Search Score: ${searchScore}/100`);
console.log(`Top Keyword: ${topKeyword.keyword} (${topKeyword.monthlySearchVolume} searches/month)`);
console.log(`Top Competitor: ${topCompetitor.name} (${topCompetitor.searchScore}/100)`);
```

### Process Historical Trend

```typescript
const trend = insights.metrics.historicalTrend;

// Calculate average visibility
const avgVisibility = trend.reduce((sum, point) => sum + point.visibility, 0) / trend.length;

// Find best month
const bestMonth = trend.reduce((best, current) => 
  current.visibility > best.visibility ? current : best
);

console.log(`Average Visibility: ${avgVisibility.toFixed(1)}`);
console.log(`Best Month: ${bestMonth.month} (${bestMonth.visibility})`);
```

### Filter and Sort Keywords

```typescript
// Get keywords with high search volume (>5000)
const highVolumeKeywords = insights.metrics.keywordVolumes
  .filter(kw => kw.monthlySearchVolume > 5000)
  .sort((a, b) => b.monthlySearchVolume - a.monthlySearchVolume);

console.log('High Volume Keywords:');
highVolumeKeywords.forEach(kw => {
  console.log(`  ${kw.keyword}: ${kw.monthlySearchVolume.toLocaleString()}/month`);
});
```

---

## Integration Examples

### React Hook

```typescript
import { useState } from 'react';

function useBrandInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const generateInsights = async (brandData: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/brand-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate insights');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateInsights, loading, error, data };
}
```

### Vue.js Composition API

```typescript
import { ref } from 'vue';

export function useBrandInsights() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref(null);

  const generateInsights = async (brandData: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('http://localhost:3001/api/brand-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      data.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return { generateInsights, loading, error, data };
}
```

### Node.js Service

```typescript
import axios from 'axios';

class BrandInsightsService {
  private baseURL = 'http://localhost:3001/api';

  async generateInsights(brandData: {
    brandName: string;
    brandWebsite: string;
    contactEmail: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseURL}/brand-insights`,
        brandData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to generate insights'
        );
      }
      throw error;
    }
  }
}

export default new BrandInsightsService();
```

---

## Testing with Postman

1. **Create a new POST request**
   - URL: `http://localhost:3001/api/brand-insights`
   - Method: `POST`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "brandName": "Zoop.one",
     "brandWebsite": "https://zoop.one",
     "contactEmail": "contact@zoop.one"
   }
   ```

4. **Send Request**

---

## Testing with Insomnia

1. Create new request
2. Set method to `POST`
3. URL: `http://localhost:3001/api/brand-insights`
4. Body type: `JSON`
5. Add JSON body:
   ```json
   {
     "brandName": "Zoop.one",
     "brandWebsite": "https://zoop.one",
     "contactEmail": "contact@zoop.one"
   }
   ```

---

For more detailed information, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)


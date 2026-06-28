# نیازمندی‌های API صفحه اصلی (Landing Page)

> مستند سازی آندپوینت‌های مورد نیاز برای تبدیل داده‌های hardcoded صفحه اصلی به API پویا.

---

## فهرست مطالب

1. [زیرساخت موجود](#۱-زیرساخت-موجود)
2. [آندپوینت‌ها](#۲-آندپوینت‌ها)
   - [SERVICES — خدمات کارشناسی](#services--خدمات-کارشناسی)
   - [FEATURES — امکانات](#features--امکانات)
   - [PROPERTIES — نمونه املاک](#properties--نمونه-املاک)
   - [STATS — آمار و عملکرد](#stats--آمار-و-عملکرد)
   - [TESTIMONIALS — نظرات مشتریان](#testimonials--نظرات-مشتریان)
   - [CITIES — پوشش سراسری](#cities--پوشش-سراسری)
   - [TIMELINE — مراحل کارشناسی](#timeline--مراحل-کارشناسی)
   - [GALLERY — پیش‌نمایش پلتفرم](#gallery--پیش‌نمایش-پلتفرم)
   - [MARQUEE — انواع املاک](#marquee--انواع-املاک)
   - [HERO — بنر اصلی](#hero--بنر-اصلی)
   - [CTA — فراخوان نهایی](#cta--فراخوان-نهایی)
3. [نکات فنی](#۳-نکات-فنی)

---

## ۱. زیرساخت موجود

| مورد | مقدار |
|---|---|
| Base URL | `http://localhost:4000` |
| HTTP Client | `fetchClient.ts` با قابلیت `api.get<T>()` |
| State Management | `@tanstack/react-query` v5 |
| Auth | JWT با auto-refresh |
| رابط کاربری | `useQuery` hook |

```typescript
// الگوی استفاده از API در کامپوننت‌ها
const { data, isLoading } = useQuery<Service[]>({
  queryKey: ["landing-services"],
  queryFn: () => api.get<Service[]>("/landing/api/v1/services/"),
});
```

---

## ۲. آندپوینت‌ها

---

### `SERVICES` — خدمات کارشناسی

**آندپوینت:** `GET /landing/api/v1/services/`

**توضیح:** لیست خدمات کارشناسی رسمی املاک. در بخش افقی اسکرولی نمایش داده می‌شود.

**Request:**
```http
GET /landing/api/v1/services/
```

**Response:**
```json
{
  "count": 6,
  "results": [
    {
      "id": 1,
      "title": "کارشناسی رسمی اسناد",
      "description": "بررسی و تأیید اصالت اسناد ملکی، سند تک برگ، قولنامه‌ای و شش‌درصد با دقت بالا.",
      "color": "#D4A843",
      "features": ["تأیید مالکیت", "بررسی اصالت سند", "زنجیره سند"],
      "building_floors": 5,
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه یکتای خدمت |
| `title` | `string` | عنوان خدمت |
| `description` | `string` | توضیحات خدمت |
| `color` | `string` | کد رنگ hex (برای استایل‌بندی) |
| `features` | `string[]` | لیست ویژگی‌های خدمت (۳ آیتم) |
| `building_floors` | `number` | تعداد طبقات ساختمان SVG (فقط جهت نمایش بصری) |
| `order` | `number` | ترتیب نمایش |

**داده‌های current:**

| id | title | color | features |
|---|---|---|---|
| 1 | کارشناسی رسمی اسناد | #D4A843 | تأیید مالکیت، بررسی اصالت سند، زنجیره سند |
| 2 | ارزیابی رسمی ملک | #14B8A6 | ارزیابی رسمی، قیمت‌گذاری کارشناسی، گزارش دادگستری |
| 3 | کارشناسی ساختمان | #06B6D4 | بازرسی سازه، بررسی تأسیسات، گزارش فنی |
| 4 | کارشناسی مجوزها | #D4A843 | بررسی پروانه، انطباق با ضوابط، بازرسی مجوز |
| 5 | کارشناسی اراضی | #14B8A6 | ارزیابی زمین، تحلیل موقعیت، گزارش توجیهی |
| 6 | پرونده دیجیتال | #06B6D4 | آرشیو دیجیتال، ذخیره امن، دسترسی آسان |

---

### `FEATURES` — امکانات

**آندپوینت:** `GET /landing/api/v1/features/`

**توضیح:** ویژگی‌های کلیدی پلتفرم در قالب گرید Masonry.

**Request:**
```http
GET /landing/api/v1/features/
```

**Response:**
```json
{
  "count": 4,
  "results": [
    {
      "id": "report",
      "title": "گزارش رسمی",
      "subtitle": "قابل ارائه",
      "description": "گزارش‌های کارشناسی رسمی که در مراجع قضایی و اداری قابل ارائه و استناد هستند.",
      "color": "#14B8A6",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `string` | شناسه یکتا (key برای سوئیچ کامپوننت بصری: `report`, `match`, `track`, `secure`) |
| `title` | `string` | عنوان ویژگی |
| `subtitle` | `string` | برچسب کوتاه |
| `description` | `string` | توضیحات ویژگی |
| `color` | `string` | کد رنگ hex |
| `order` | `number` | ترتیب نمایش |

> **نکته:** فیلد `id` تعیین‌کننده کامپوننت بصری مرتبط است. مقادیر مجاز: `report`, `match`, `track`, `secure`.

---

### `PROPERTIES` — نمونه املاک

**آندپوینت:** `GET /landing/api/v1/properties/`

**توضیح:** نمونه املاک ارزیابی شده. در اسلایدر Swiper نمایش داده می‌شود.

**Request:**
```http
GET /landing/api/v1/properties/
```

**Response:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "type": "آپارتمان مسکونی",
      "price": "۸,۵۰۰,۰۰۰,۰۰۰",
      "price_raw": 8500000000,
      "area": "۱۲۰ متر",
      "area_raw": 120,
      "rooms": "۳ خواب",
      "location": "تهران، ولیعصر",
      "city": "تهران",
      "district": "ولیعصر",
      "color": "#D4A843",
      "features": ["پارکینگ", "انباری", "آسانسور"],
      "expert_score": "۹.۲",
      "expert_score_raw": 9.2,
      "status": "verified",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه ملک |
| `type` | `string` | نوع ملک (آپارتمان مسکونی، ویلای شهرکی، و...) |
| `price` | `string` | قیمت فرمت‌شده فارسی |
| `price_raw` | `number` | قیمت خام (عددی، برای محاسبات) |
| `area` | `string` | متراژ فرمت‌شده فارسی |
| `area_raw` | `number` | متراژ خام (متر مربع) |
| `rooms` | `string` | تعداد اتاق فرمت‌شده |
| `location` | `string` | موقعیت کامل |
| `city` | `string` | شهر |
| `district` | `string` | منطقه/محله |
| `color` | `string` | کد رنگ hex |
| `features` | `string[]` | امکانات ملک (پارکینگ، انباری و...) |
| `expert_score` | `string` | امتیاز کارشناس فرمت‌شده فارسی |
| `expert_score_raw` | `number` | امتیاز خام عددی |
| `status` | `string` | وضعیت: `verified` \| `pending` |
| `order` | `number` | ترتیب نمایش |

---

### `STATS` — آمار و عملکرد

**آندپوینت:** `GET /landing/api/v1/stats/`

**توضیح:** آمار کلیدی پلتفرم با انیمیشن شمارنده.

**Request:**
```http
GET /landing/api/v1/stats/
```

**Response:**
```json
{
  "count": 4,
  "results": [
    {
      "id": 1,
      "value": 12500,
      "suffix": "+",
      "label": "ملک ارزیابی شده",
      "color": "#D4A843",
      "icon": "building",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `value` | `number` | مقدار عددی (برای انیمیشن شمارنده) |
| `suffix` | `string` | پسوند (`+` یا `%`) |
| `label` | `string` | برچسب فارسی |
| `color` | `string` | کد رنگ hex |
| `icon` | `string` | نوع آیکون: `building` \| `expert` \| `satisfaction` \| `city` |
| `order` | `number` | ترتیب نمایش |

---

### `TESTIMONIALS` — نظرات مشتریان

**آندپوینت:** `GET /landing/api/v1/testimonials/`

**توضیح:** نظرات و بازخوردهای مشتریان. در اسلایدر افقی بی‌نهایت نمایش داده می‌شود.

**Request:**
```http
GET /landing/api/v1/testimonials/
```

**Response:**
```json
{
  "count": 6,
  "results": [
    {
      "id": 1,
      "name": "رضا محمدی",
      "role": "خریدار ملک",
      "text": "ازبین فرآیند ارزیابی ملک من را بسیار ساده و سریع کرد. گزارش کارشناسی دقیق و قابل اعتماد بود.",
      "rating": 5,
      "property_type": "آپارتمان مسکونی",
      "avatar_url": null,
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `name` | `string` | نام مشتری |
| `role` | `string` | نقش/سمت مشتری |
| `text` | `string` | متن نظر |
| `rating` | `number` | امتیاز (۱ تا ۵) |
| `property_type` | `string` | نوع ملک مرتبط |
| `avatar_url` | `string \| null` | آدرس عکس پروفایل (اختیاری) |
| `order` | `number` | ترتیب نمایش |

---

### `CITIES` — پوشش سراسری

**آندپوینت:** `GET /landing/api/v1/cities/`

**توضیح:** شهرهای تحت پوشش با موقعیت روی نقشه ایران.

**Request:**
```http
GET /landing/api/v1/cities/
```

**Response:**
```json
{
  "count": 9,
  "results": [
    {
      "id": 1,
      "name": "تهران",
      "count": "۱۲,۴۵۰",
      "count_raw": 12450,
      "x": 213.2,
      "y": 149.0,
      "color": "#D4A843",
      "size": "lg",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `name` | `string` | نام شهر |
| `count` | `string` | تعداد ملک فرمت‌شده فارسی |
| `count_raw` | `number` | تعداد خام عددی |
| `x` | `number` | مختصات X روی نقشه SVG (Range: ~50-400) |
| `y` | `number` | مختصات Y روی نقشه SVG (Range: ~50-350) |
| `color` | `string` | کد رنگ hex |
| `size` | `string` | اندازه پین: `lg` \| `md` \| `sm` |
| `order` | `number` | ترتیب نمایش |

> **نکته:** مختصات `x` و `y` بر اساس viewBox نقشه SVG ایران هستند. نقشه فعلی از `IRAN_OUTLINE` ثابت استفاده می‌کند (نیازی به API ندارد).

---

### `TIMELINE` — مراحل کارشناسی

**آندپوینت:** `GET /landing/api/v1/timeline/`

**توضیح:** مراحل پنج‌گانه فرآیند کارشناسی.

**Request:**
```http
GET /landing/api/v1/timeline/
```

**Response:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "title": "ثبت درخواست",
      "subtitle": "شروع کنید",
      "description": "اطلاعات ملک و اسناد خود را از طریق فرم آنلاین ارسال کنید.",
      "duration": "۲ دقیقه",
      "icon": "form",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `title` | `string` | عنوان مرحله |
| `subtitle` | `string` | برچسب کوتاه |
| `description` | `string` | توضیحات مرحله |
| `duration` | `string` | مدت زمان تقریبی |
| `icon` | `string` | نوع آیکون: `form` \| `analyze` \| `expert` \| `inspect` \| `report` |
| `order` | `number` | ترتیب نمایش |

---

### `GALLERY` — پیش‌نمایش پلتفرم

**آندپوینت:** `GET /landing/api/v1/gallery/`

**توضیح:** کارت‌های پیش‌نمایش قابلیت‌های پلتفرم در گرید.

**Request:**
```http
GET /landing/api/v1/gallery/
```

**Response:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "title": "داشبورد کارشناسی",
      "description": "گزارش‌های ارزیابی و مدیریت پرونده‌های ملکی در دسترس شما.",
      "color": "#D4A843",
      "grid_col_span": 2,
      "grid_row_span": 2,
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `title` | `string` | عنوان قابلیت |
| `description` | `string` | توضیحات قابلیت |
| `color` | `string` | کد رنگ hex |
| `grid_col_span` | `number` | تعداد ستون‌های اشغالی در گرید (۱ یا ۲) |
| `grid_row_span` | `number` | تعداد ردیف‌های اشغالی در گرید (۱ یا ۲) |
| `order` | `number` | ترتیب نمایش |

---

### `MARQUEE` — انواع املاک

**آندپوینت:** `GET /landing/api/v1/property-types/`

**توضیح:** لیست انواع املاک برای نمایش در مارکی اسکرول بی‌نهایت.

**Request:**
```http
GET /landing/api/v1/property-types/
```

**Response:**
```json
{
  "count": 8,
  "results": [
    {
      "id": 1,
      "name": "آپارتمان",
      "order": 1
    }
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `id` | `number` | شناسه |
| `name` | `string` | نوع ملک |
| `order` | `number` | ترتیب نمایش |

**داده‌های current:** آپارتمان، ویلا، زمین، باغ، مغازه، دفتر، انبار، کارخانه

---

### `HERO` — بنر اصلی

**آندپوینت:** `GET /landing/api/v1/hero/`

**توضیح:** محتوای بنر اصلی صفحه. از آنجا که این محتوا تقریباً ثابت است، می‌تواند ادمین‌پنل باشد یا ثابت بماند.

**Request:**
```http
GET /landing/api/v1/hero/
```

**Response:**
```json
{
  "badge": "کارشناسی رسمی و تخصصی املاک",
  "headline": [
    "ارزیابی و بررسی",
    "تخصصی ملک شما"
  ],
  "subheadline": "کارشناسان معتبر برای ارزیابی ساختمان و سند ملکی شما",
  "cta_primary": "درخواست کارشناسی ملک",
  "cta_secondary": "بررسی کامل اسناد ملکی",
  "cta_primary_link": "/sr/new",
  "cta_secondary_link": "/pages/faq",
  "trust_badges": [
    "ارزیابی دقیق ساختمان و سازه",
    "گزارش تفصیلی و قابل‌اعتماد",
    "تصمیم‌های مطمئن"
  ]
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `badge` | `string` | برچسب بالای عنوان |
| `headline` | `string[]` | خطوط عنوان (خط اول + خط دوم) |
| `subheadline` | `string` | زیرعنوان |
| `cta_primary` | `string` | متن دکمه اصلی |
| `cta_secondary` | `string` | متن دکمه فرعی |
| `cta_primary_link` | `string` | لینک دکمه اصلی |
| `cta_secondary_link` | `string` | لینک دکمه فرعی |
| `trust_badges` | `string[]` | نشان‌های اعتماد (۳ آیتم) |

---

### `CTA` — فراخوان نهایی

**آندپوینت:** `GET /landing/api/v1/cta/`

**توضیح:** بخش فراخوان نهایی و فوتر.

**Request:**
```http
GET /landing/api/v1/cta/
```

**Response:**
```json
{
  "headline": ["آماده‌اید", "ملک خود را", "ارزیابی کنید؟"],
  "subtitle": "کارشناسان معتبر ما آماده ارزیابی تخصصی ساختمان و سند ملکی شما هستند.",
  "cta_primary": "سفارش کارشناسی ملک",
  "cta_secondary": "مشاوره رایگان",
  "cta_primary_link": "/sr/new",
  "cta_secondary_link": "/pages/contact",
  "trust_badges": ["امنیت بانکی", "کارشناسان مجرب", "پشتیبانی ۲۴ ساعته"],
  "footer_links": [
    { "label": "حریم خصوصی", "href": "/pages/privacy" },
    { "label": "شرایط استفاده", "href": "/pages/terms" },
    { "label": "تماس با ما", "href": "/pages/contact" },
    { "label": "سوالات متداول", "href": "/pages/faq" }
  ],
  "social_links": {
    "telegram": "https://t.me/azbin",
    "linkedin": "https://linkedin.com/company/azbin",
    "instagram": "https://instagram.com/azbin"
  }
}
```

**فیلدها:**

| فیلد | نوع | توضیح |
|---|---|---|
| `headline` | `string[]` | خطوط عنوان (۳ خط) |
| `subtitle` | `string` | زیرعنوان |
| `cta_primary` | `string` | متن دکمه اصلی |
| `cta_secondary` | `string` | متن دکمه فرعی |
| `cta_primary_link` | `string` | لینک دکمه اصلی |
| `cta_secondary_link` | `string` | لینک دکمه فرعی |
| `trust_badges` | `string[]` | نشان‌های اعتماد |
| `footer_links` | `Array<{label, href}>` | لینک‌های فوتر |
| `social_links` | `object` | لینک شبکه‌های اجتماعی |

---

## ۳. نکات فنی

### خلاصه آندپوینت‌ها

| # | آندپوینت | Method | توضیح |
|---|---|---|---|
| 1 | `/landing/api/v1/services/` | GET | لیست خدمات |
| 2 | `/landing/api/v1/features/` | GET | لیست امکانات |
| 3 | `/landing/api/v1/properties/` | GET | نمونه املاک |
| 4 | `/landing/api/v1/stats/` | GET | آمار |
| 5 | `/landing/api/v1/testimonials/` | GET | نظرات مشتریان |
| 6 | `/landing/api/v1/cities/` | GET | شهرهای تحت پوشش |
| 7 | `/landing/api/v1/timeline/` | GET | مراحل کارشناسی |
| 8 | `/landing/api/v1/gallery/` | GET | پیش‌نمایش پلتفرم |
| 9 | `/landing/api/v1/property-types/` | GET | انواع املاک |
| 10 | `/landing/api/v1/hero/` | GET | محتوای بنر اصلی |
| 11 | `/landing/api/v1/cta/` | GET | فراخوان نهایی و فوتر |

### نکات مهم

1. **تمام آندپوینت‌ها GET هستند** — صفحه اصلی فقط خواندنی است.
2. **فیلدهای `*_raw`** برای محاسبات و انیمیشن‌ها هستند (مثلاً شمارنده Stats).
3. **فیلدهای `order`** برای کنترل ترتیب نمایش از سمت سرور.
4. **فیلدهای `color`** برای استایل‌بندی داینامیک هستند — در API باید باقی بمانند.
5. **فیلدهای `icon`** تعیین‌کننده کامپوننت بصری هستند (مقدار رشته‌ای).
6. **نقشه ایران (IRAN_OUTLINE)** ثابت است و نیازی به API ندارد.
7. **داده‌های تزئینی** (بک‌گراند، پارتیکل، کارسرسور) ثابت می‌مانند.
8. **Responsive بودن** در سمت فرانت‌اند مدیریت می‌شود — API نیازی به ارسال داده متفاوت ندارد.

### TypeScript Types پیشنهادی

```typescript
interface ApiResponse<T> {
  count: number;
  results: T[];
}

interface LandingService {
  id: number;
  title: string;
  description: string;
  color: string;
  features: string[];
  building_floors: number;
  order: number;
}

interface LandingFeature {
  id: string; // "report" | "match" | "track" | "secure"
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
}

interface LandingProperty {
  id: number;
  type: string;
  price: string;
  price_raw: number;
  area: string;
  area_raw: number;
  rooms: string;
  location: string;
  city: string;
  district: string;
  color: string;
  features: string[];
  expert_score: string;
  expert_score_raw: number;
  status: "verified" | "pending";
  order: number;
}

interface LandingStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  color: string;
  icon: "building" | "expert" | "satisfaction" | "city";
  order: number;
}

interface LandingTestimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  property_type: string;
  avatar_url: string | null;
  order: number;
}

interface LandingCity {
  id: number;
  name: string;
  count: string;
  count_raw: number;
  x: number;
  y: number;
  color: string;
  size: "lg" | "md" | "sm";
  order: number;
}

interface LandingTimeline {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: "form" | "analyze" | "expert" | "inspect" | "report";
  order: number;
}

interface LandingGallery {
  id: number;
  title: string;
  description: string;
  color: string;
  grid_col_span: number;
  grid_row_span: number;
  order: number;
}

interface LandingPropertyType {
  id: number;
  name: string;
  order: number;
}

interface LandingHero {
  badge: string;
  headline: string[];
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  cta_primary_link: string;
  cta_secondary_link: string;
  trust_badges: string[];
}

interface LandingCTA {
  headline: string[];
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  cta_primary_link: string;
  cta_secondary_link: string;
  trust_badges: string[];
  footer_links: Array<{ label: string; href: string }>;
  social_links: {
    telegram?: string;
    linkedin?: string;
    instagram?: string;
  };
}
```

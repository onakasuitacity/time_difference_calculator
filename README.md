# Time Difference Calculator

## Demo
![timediff](https://github.com/user-attachments/assets/301c68ca-f2aa-40b4-9cbb-5186c003b7af)

## Overview
This is an author's practice application in React with TypeScript. This is the author's first time using these languages, so it may not follow the best practices. Please let me know if you detect room for improvement.

## Quick Start
You can try it: https://time-difference-calculator.monipy.workers.dev/

This is deployed on Cloudflare Workers.

## For Developers

### Dependencies
- npm >= 10.0.0

### Setup
1. Install necessary Node.js packages
   - Run `npm ci`.
   - Run `npm run dev` for development, and you can access it at http://localhost:3000

## For Testing

### Register for APIs
This project depends on [Geonames API](https://www.geonames.org/export/web-services.html) and [Timezone DB API](https://timezonedb.com/api), both of which are free but require registration. Please make sure that you obtain the username for Geonames and the API key for Timezone DB.

### Place `.env` file
Place your .env file on root directory. Your .env file looks like:

```
GEONAMES_USERNAME=(your Geonames username)
TIMEZONE_DB_API_KEY=(your Timezone DB API key)
```

## License
The source code is licensed under CC0. The website content is licensed under MIT.

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://YOUR_CLOUDFRONT.net' : '';

module.exports = baseUrl;
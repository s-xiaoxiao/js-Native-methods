const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

function parseParam(url) {

  return url
    .split('?')[1]
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value
        ? !isNaN(value)
          ? (acc[key] || []).concat(Number(value))
          : decodeURIComponent(value)
        : true

      return acc;
    }, {})
}

parseParam(url)

/*
{
    "user": "anonymous",
    "id": [
        123,
        456
    ],
    "city": "北京",
    "enabled": true
}
*/
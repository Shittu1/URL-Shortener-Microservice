# URL-Shortener-Microservice
FreeCodeCamp's URL Shortener Microservice Project - https://shittu1.github.io/URL-Shortener-Microservice/views/

## User Stories
1. I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON      response. Example : {"original_url":"www.google.com","short_url":1}
2. If I pass an invalid URL that doesn't follow the valid http(s)://www.example.com(/more/routes)         format, the JSON response will contain an error like {"error":"invalid URL"}. HINT: to be sure that    the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns    core module.
3. When I visit the shortened URL, it will redirect me to my original link.

## Creation Example:
    POST [project_url]/api/shorturl/new - body (urlencoded) : url=https://www.google.com

## Usage:
    [this_project_url]/api/shorturl/3

## Will redirect to:
    http://forum.freecodecamp.com

## Acknowledgement/ Resources
1. https://www.youtube.com/watch?v=5T1YDRWaa3k
2. https://www.youtube.com/watch?v=nSVzUH9NvSw
3. https://codeforgeek.com/2015/01/render-html-file-expressjs/
4. http://www.tutorialsteacher.com/nodejs/expressjs-web-application
5. https://www.regextester.com/94502

## Technologies
    Node.js, Express.js, MongoDB, Mongoose, JavaScript, HTML, CSS, Bootstrap
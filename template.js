export default ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
     <link rel="stylesheet" href="/assets/index.css" />
     <link rel="stylesheet" href="/static/css/bootstrap.min.css">

      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};
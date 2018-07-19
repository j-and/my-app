export default ({body, title}) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
<link rel="stylesheet" href="/assets/index.css"/>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="/assets/custom-styles.css"/>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
      <script src="/assets/bundle.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js"></script>
    </html>
  `;
};
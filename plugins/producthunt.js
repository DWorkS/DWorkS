/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  // if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Hotjar Script
  */
  window.productHuntUpcoming = {
    appId: 2366,
    position: 'bottomLeft',
  };

  (function(doc, scr, src, a, b) {
    a = doc.createElement(scr);
    b = doc.getElementsByTagName(scr)[0];
    a.async = true;
    a.src = src;
    b.parentNode.insertBefore(a, b);
  })(document, 'script', 'https://assets.producthunt.com/assets/upwigloader.js');
}

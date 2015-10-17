window.html2canvas = window.html2canvas || require('html2canvas');
module.exports = function(element, options) {
  return new Promise(function(resolve, reject) {
      window.html2canvas(element, options).then(function(canvas) {
        resolve(canvas.toDataURL('image/png'));
    });
  });
};

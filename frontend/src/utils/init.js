const init = () => {
  if (typeof HTMLCanvasElement !== "undefined" &&
      !HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var canvas = this;
        setTimeout(function() {
          var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
              len = binStr.length,
              arr = new Uint8Array(len);
          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback( new Blob( [arr], {type: type || 'image/png'} ) );
        });
      }
    });
  }

  if (!Object.entries) {
    Object.entries = function( obj ){
      var ownProps = Object.keys( obj ),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }

  if (!Object.values) {
    Object.values = function( obj ){
      var vals = Object.keys(obj).map(function(key) {
        return obj[key];
      });
      return vals;
    };
  }

  return;
};

export default init;

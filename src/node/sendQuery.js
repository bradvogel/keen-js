var rest = require('superagent');

function _sendQuery(url, params, success, error){
  var urlBase = url,
      urlQueryString = "",
      reqType = this.config.requestType,
      successCallback = success ? success : function() {},
      errorCallback = error ? error : function() {};

  success = null;
  error = null;

  if (urlBase.indexOf("extraction") > -1) {
    // Extractions do not currently support JSONP
    reqType = "xhr";
  }
  urlQueryString += "?api_key=" + this.readKey();
  urlQueryString += _getQueryString.call(this, params);

  rest
    .get(urlBase + urlQueryString)
    .set('Authorization', this.readKey())
    .end(function(err, res) {
      if(err) {
        // console.log('ERR', err);
        errorCallback(err);
      } else {
        // console.log('SUCCESS', res);
        successCallback(res.body);
      }
    });

  // if (reqType !== "xhr") {
  //   if ( String(urlBase + urlQueryString).length < Keen.urlMaxLength ) {
  //     _sendJsonp(urlBase + urlQueryString, null, successCallback, errorCallback);
  //     return;
  //   }
  // }

  // if (Keen.canXHR) {
  //   _sendXhr("GET", urlBase + urlQueryString, null, null, successCallback, errorCallback);
  // } else {
  //   Keen.log("Event not sent: URL length exceeds current browser limit, and XHR (POST) is not supported.");
  // }
  // successCallback = errorCallback = null;
  return;
}

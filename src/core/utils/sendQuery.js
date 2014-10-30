function _sendQuery(url, params, success, error){
  var urlBase = url,
      urlQueryString = "",
      reqType = this.config.requestType,
      successCallback = success,
      errorCallback = error;

  success = null;
  error = null;

  if (urlBase.indexOf("extraction") > -1) {
    // Extractions do not currently support JSONP
    reqType = "xhr";
  }
  urlQueryString += "?api_key=" + this.readKey();
  urlQueryString += _getQueryString.call(this, params);

  if (reqType !== "xhr") {
    if ( String(urlBase + urlQueryString).length < Keen.urlMaxLength ) {
      _sendJsonp(urlBase + urlQueryString, null, successCallback, errorCallback);
      return;
    }
  }

  if (Keen.canXHR) {
    _sendXhr("GET", urlBase + urlQueryString, null, null, successCallback, errorCallback);
  } else {
    Keen.log("Event not sent: URL length exceeds current browser limit, and XHR (POST) is not supported.");
  }
  successCallback = errorCallback = null;
  return;
}

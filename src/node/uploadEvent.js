var rest = require('superagent');

function _uploadEvent(eventCollection, payload, success, error) {
  var urlBase = this.url("/projects/" + this.projectId() + "/events/" + eventCollection),
      urlQueryString = "",
      reqType = this.config.requestType,
      data = {};

  success = success ? success : function() {};
  error = error ? error : function() {};

  // Add properties from client.globalProperties
  if (this.config.globalProperties) {
    data = this.config.globalProperties(eventCollection);
  }

  // Add properties from user-defined event
  _each(payload, function(value, key){
    data[key] = value;
  });

  console.log(urlBase);
  urlQueryString += "?api_key="  + encodeURIComponent( this.writeKey() );
  urlQueryString += "&data="     + encodeURIComponent( Keen.Base64.encode( JSON.stringify(data) ) );
  urlQueryString += "&modified=" + encodeURIComponent( new Date().getTime() );

  rest
    .post(urlBase + urlQueryString)
    .set('Authorization', this.writeKey())
    .set('Content-Type', 'application/json')
    .send(data || {})
    .end(function(err, res) {
      if(err) {
        error(err);
      } else {
        success(res.body);
      }
    });

  return;
};

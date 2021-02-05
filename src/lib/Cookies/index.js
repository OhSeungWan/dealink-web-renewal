export const getCookie = cookie_name => {
  var x, y;
  var val = document.cookie.split(`;`);

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf(`=`));
    y = val[i].substr(val[i].indexOf(`=`) + 1);
    x = x.replace(/^\s+|\s+$/g, '');

    if (x === cookie_name) {
      return unescape(y);
    }
  }
};

export const setCookie = (name, value, days) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  let cookie_value =
    escape(value) + (days == null ? '' : `; expires =` + exdate.toUTCString());
  document.cookie = name + `=` + cookie_value;
};

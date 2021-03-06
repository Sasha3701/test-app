export const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value) => {
  const options = {
    secure: true,
    samesite: "strict",
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getBreakpoint = (innerWidth) => {
  let size = "xs";
  if (innerWidth >= 768 && innerWidth < 992) {
    size = "sm";
  } else if (innerWidth >= 992 && innerWidth < 1200) {
    size = "md";
  } else if (innerWidth >= 1200) {
    size = "lg";
  }
  return size;
};

export const validate = (type, value) => {
  if (type === "email") {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value);
  }
  return true;
};

export const range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

export const getArrPage = (count, limit, page, countButton) => {
  const last = Math.trunc(count / limit);
  const start = countButton - page <= 0 ? 3 + page - countButton : 1;
  const end =
    countButton - page <= 0 ? (page === last ? last : 3 + page) : countButton;
  return range(start, end);
};

import request from 'request';

const getNumberFromRandomORG = "https://www.random.org/integers/?num=1&min=1&max=3&format=plain&col=1&base=10"

export const addSubMultDivAsyncCallback = (a, mult, cb) =>
  request(getNumberFromRandomORG, function(errorAdd, responseAdd, add) {
    if (errorAdd) {
      cb(errorAdd);
      return;
    }
    request(getNumberFromRandomORG, function(errorSub, responseSub, sub) {
      if (errorSub) {
        cb(errorSub);
        return;
      }
      request(getNumberFromRandomORG, function(errorDiv, responseDiv, div) {
        if (errorDiv) {
          cb(errorDiv);
          return;
        }
        cb(null, (a + parseInt(add) - parseInt(sub)) * mult / parseInt(div));
      });
    });
  });
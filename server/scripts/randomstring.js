module.exports = function () {

  let randomString = (Math.random().toString(36)+'00000000000000000').slice(2, 6+2);
  return randomString;

}
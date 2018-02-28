function getFrequencyof(string, cutOff) {
  var cleanString = string.trim().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
      words = cleanString.split(' '),
      frequencies = {},
      word, frequency, i;

  for( i=0; i<words.length; i++ ) {
    word = words[i];
    frequencies[word] = frequencies[word] || 0;
    frequencies[word]++;
  }
  
  words = Object.keys( frequencies );
  return words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,cutOff).toString();
}

  module.exports = getFrequencyof;
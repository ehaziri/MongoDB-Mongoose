var dictionary = require('./dictionary')
function search(word, dictionary){
  for(w in dictionary){
    if(dictionary[w] == word){
      return true;
    }
  }
  return false;
}
console.log(search('peanut', dictionary));

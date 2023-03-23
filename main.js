let names;
let order = 3;
let ngrams = {};
let beginnings = [];
let button;

function preload() {
    names = loadStrings('names.txt');
    console.log(names);
  }
  
  function setup() {
    noCanvas();
    for (let j = 0; j < names.length; j++) {
      let txt = names[j];
      for (let i = 0; i <= txt.length - order; i++) {
        let gram = txt.substring(i, i + order);
        if (i == 0) {
          beginnings.push(gram);
        }
  
        if (!ngrams[gram]) {
          ngrams[gram] = [];
        }
        ngrams[gram].push(txt.charAt(i + order));
      }
    }
    button = createButton("generate");
    button.mousePressed(markovIt);
    console.log(ngrams);
  }
  
  function markovIt() {
  
    let currentGram = random(beginnings);
    let result = currentGram;
  
    for (let i = 0; i < 20; i++) {
      let possibilities = ngrams[currentGram];
      if (!possibilities) {
        break;
      }
      let next = random(possibilities);
      result += next;
      let len = result.length;
      currentGram = result.substring(len - order, len);
    }
  
    createP(result);
  }
console.log('Content Script ready!');

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, sendResponse){
  let direction = 0; 
  if(message.direction == 'up'){
    direction = -500;
  } else if(message.direction == 'down'){
    direction = +500;
  }
  window.scrollBy({ 
    top: direction,
    left: 0, 
    behavior: 'smooth' 
  });

}
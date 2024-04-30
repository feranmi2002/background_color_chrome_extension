function randomColor() {
  const colors = ['red', 'green', 'black', 'white', 'yellow', 'blue']
  let currentColor = window.document.body.style.backgroundColor
  let colorIndex = Math.floor(Math.random() * colors.length)
  if (colors[colorIndex] === currentColor) {
    randomColor()
  } else {
    document.body.style.backgroundColor = colors[colorIndex]
  }
}

function defaultColor() {
  document.body.style.backgroundColor = 'unset';
}

function changeColor() {
  console.log("changecolor")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: randomColor,
    });
  });
}

function restoreColor() {
  console.log("restore")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: defaultColor,
    });
  });
}

function setClickListeners() {
  document.getElementById('changeButton').addEventListener('click', changeColor)

  document.getElementById('restoreButton').addEventListener('click', restoreColor)
}

if (document.readyState !== 'loading') {
  setClickListeners()
} else {
  setClickListeners()
}
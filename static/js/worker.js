console.log(self)
// self.postMessage('hello ~')
self.addEventListener(
  "message",
  function (e) {
    self.postMessage("You said: " + e.data);
  },
  false
);

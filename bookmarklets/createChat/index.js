(function createChat() {
  let even = 0;
  document.body.style = 'height: 100%;';
  document.getElementsByTagName('html')[0].style = 'height: 100%;';
  document.body.innerHTML = '';
  const root = document.createElement('div');
  root.style = 'display:flex;     height: 100%;';
  root.id = 'app';
  root.innerHTML = `
  <div id='sidebar' style='background-color: black; width: 150px;'></div>
  <div id='chat' style='width: -webkit-fill-available;'>
    <div id='chats' style='width: 100%; padding: 8px; display: flex; flex-direction: column; justify-content: flex-end; height: 90%;'></div>
    <div id='chat-input-wrapper' style='width: 100%;background-color: #d8b1d8;padding: 8px;display: flex;justify-content: center;'>
      <input autofocus id='chat-input' placeholder='Type a chat...' style='padding: 4px 8px; font-size: 1em; width: 95%; margin: 4px;'></input>
    </div>
  </div>
  `;
  document.body.appendChild(root);
  const chatInput = document.getElementById('chat-input');
  const chats = document.getElementById('chats');
  const savedConsole = window.console;
  const newConsole = Object.keys(savedConsole).reduce((acc, func) => {
    acc[func] = function() {
      const newChat = document.createElement('div');
      newChat.style = `font-family: sans-serif; padding: 2px 0px; ${
        even % 2 ? 'background-color: #ececec;' : ''
      }`;
      even++;
      newChat.innerHTML = arguments[0];
      chats.append(newChat);
      savedConsole[func].apply(window, arguments);
    };
    return acc;
  }, {});
  chatInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log(chatInput.value);
      chatInput.value = '';
    }
  });
  window.console = newConsole;
})();

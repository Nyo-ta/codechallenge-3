document.addEventListener('DOMContentLoaded', main);

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  const url = "http://localhost:3000/posts";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const list = document.getElementById('post-list');
      list.innerHTML = "";
      data.forEach(function (post) {
        const listContainer = document.createElement('li');
        listContainer.textContent = post.title;
        listContainer.addEventListener('click', function () {
          handlePostClick(post);
        });
        list.appendChild(listContainer);
        if(index === 0){
            handlePostClick(post);
        }
      });
    });
}

function handlePostClick(post) {
  const detailsContainer = document.getElementById('post-details');
  detailsContainer.innerHTML = "";
  const divCont = document.createElement('div');
  divCont.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>Content:</strong> ${post.content}</p>
    <p><strong>Author:</strong> ${post.author}</p>
  `;
  detailsContainer.appendChild(divCont);
}

function addNewPostListener() {
  const getform = document.getElementById('new-post-form');
  getform.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const author = document.getElementById('post-author').value;

    fetch("http://localhost:3000/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content,
        author: author
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (newpost) {
        displayPosts();
        getform.reset();
      })
      .catch(function (error) {
        console.log('Error encountered:', error);
      });
  });
}


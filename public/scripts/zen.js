function emptyContainer(title, isCenterAligned) {
  const c = document.getElementById('container');

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.getElementById('title').innerText = title;

  c.innerHTML = '';

  if (isCenterAligned === true) {
    if (c.classList.contains('top-aligned')) {
      c.classList.replace('top-aligned', 'center-aligned');
    }
  } else {
    if (c.classList.contains('center-aligned')) {
      c.classList.replace('center-aligned', 'top-aligned');
    }
  }

  return c;
}

function createCenteredItem(item) {
  const transbox = document.createElement('div');

  transbox.className = 'rounded transbox transbox-bg';
  transbox.appendChild(item);

  return transbox;
}

function showCenteredItem(title, item) {
  emptyContainer(title, true).appendChild(createCenteredItem(item));
}

function toggleMenu() {
  document.getElementById('topnav').classList.toggle('displayed');

  const link = document.getElementById('toggle-link');
  const rotate = document.getElementById('rotate');

  if (rotate.classList.contains('up')) {
    rotate.classList.remove('up');
    link.title = 'Show menu';
  } else {
    rotate.classList.add('up');
    link.title = 'Hide menu';
  }

  link.classList.toggle('bg');
}

function showMessage(message, title) {
  const div = document.createElement('div');

  div.innerHTML = '<p>' + message + '</p>';

  showCenteredItem(title, div);
}

function createAuthorLink(author, noTitle = false) {
  const a = document.createElement('a');

  a.href = 'javascript:void(0)';
  a.title = noTitle ? '' : 'Quotes by author';
  a.innerText = author;
  a.addEventListener('click', function () { showQuotesByAuthor(author); });

  return a;
}

function createAuthor(item) {
  const div = document.createElement('div');

  div.className = 'rounded item author';
  div.appendChild(createAuthorLink(item.author, true));

  return div;
}

function createSingleQuoteToolbar() {
  let s = document.createElement('span');

  s.className = 'toolbar';

  let a = document.createElement('a');
  a.href = 'javascript:void(0)';
  a.title = 'Random quote';
  a.addEventListener('click', function () { showRandomQuote(); });

  let i = document.createElement('i');
  i.className = 'fas fa-random fa-fw';

  a.appendChild(i);
  s.appendChild(a);

  return s;
}

function createQuoteItem(quote, item) {
  let p = document.createElement('p');

  p.appendChild(document.createTextNode(item.quote));

  quote.appendChild(p);

  p = document.createElement('p');
  p.innerHTML = '&ndash; ';

  p.appendChild(createAuthorLink(item.author));

  return p;
}

function createQuote(item) {
  const quote = document.createElement('div');

  quote.className = 'rounded item';
  quote.addEventListener('click', function () { void (0); }); // fix for mobile devices
  quote.appendChild(createQuoteItem(quote, item));

  return quote;
}

function createSingleQuote(item) {
  const quote = document.createElement('div');

  quote.className = 'quote';

  let p = createQuoteItem(quote, item);

  p.appendChild(createSingleQuoteToolbar());

  quote.appendChild(p);

  return createCenteredItem(quote);
}

function populateData(data, callback, title) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showMessage('Nothing found', title);
    return;
  }

  if (Array.isArray(data)) {
    const container = emptyContainer(title);
    data.forEach((item) => container.appendChild(callback(item)));
  } else {
    const container = emptyContainer(title, true);
    container.appendChild(callback(data));
  }
}

function callAPI(path, callback, title, errorMessage) {
  const API_URL = 'api' + path;

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => populateData(data, callback, title))
    .catch(() => showMessage(errorMessage, title));
}

function searchQuotes(form) {
  const query = form.q.value.trim();

  form.q.value = query;

  // no input
  if (!query) {
    return;
  }

  const path = '/quotes' + (query ? '?q=' + query : '');
  callAPI(path, createQuote, 'Search quotes', 'Could not find quotes');
}

function getQuoteId() {
  return typeof URLSearchParams !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : null;
}

function showQuote(id = null) {
  const path = '/quotes/' + (id || getQuoteId() || 'random');
  callAPI(path, createSingleQuote, 'Zen Quote', 'Could not find quote');
}

function showRandomQuote() {
  showQuote('random');
}

function showAuthors() {
  callAPI('/authors', createAuthor, 'Authors', 'Could not find authors');
}

function showQuotesByAuthor(author = null) {
  const path = '/quotes' + (author ? ('?author=' + author) : '');
  callAPI(path, createQuote, 'Quotes by author', 'Could not find quotes');
}

function showAbout() {
  const div = document.createElement('div');
  div.innerHTML = '<p>&copy; 2020 Magnus Leksell</p><p><a href="https://sajberspejs.com/">https://sajberspejs.com</a></p>';
  showCenteredItem('About', div);
}

window.addEventListener('DOMContentLoaded', showQuote());
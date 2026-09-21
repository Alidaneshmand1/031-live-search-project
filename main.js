const search = document.querySelector("#search");
const results = document.querySelector("#results");
const main = document.querySelector("#main");

let ready = true;
let lastValue = "";

search.addEventListener("keyup", handle);

async function handle() {
  

if (!ready) {
  return;
}else{
  ready = false
}

if (this.value === "") {
  main.innerHTML = ""
  results.innerHTML = "Not Found"
  ready = true
  return
}
  lastValue = this.value;
  const find = encodeURIComponent(this.value);
  const response = await fetch(
    "https://localhost/test/search.php?find=" + find,
  );
  const books = await response.json();
  if (books.length) {
    let html = "";
    for (let book of books) {
      html += ` <article>
                    <h2 class="title">${book.title}</h2>
                    <div class="description">${book.description}</div>
                </article>;
           `;
    }
    main.innerHTML = html;
    results.innerHTML = books.length + "Result(s) found.";
  } else {
    main.innerHTML = "";
    results.innerHTML = "Not found";
  }
  ready = true;
  if (this.value != lastValue) {
     handle.call(this)
  }
}

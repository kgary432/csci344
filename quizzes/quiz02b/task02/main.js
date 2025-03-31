const ENDPOINT_WIKIPEDIA = "https://en.wikipedia.org/api/rest_v1/page/summary";

async function getWikipediaArticle(searchTerm) {
  try {
    const url = `${ENDPOINT_WIKIPEDIA}/${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json(); // Convert response to JSON
  } catch (error) {
    console.error("Error fetching Wikipedia article:", error);
    return null;
  }
}

function dataToHTML(wikiArticle) {
  return `
    <section class="card">
      <img src="${wikiArticle.thumbnail?.source}">
      <div>
          <h2>${wikiArticle.title}</h2>
          ${wikiArticle.extract_html}
      </div>
    </section>
  `;
}

// Uncomment these functions when you're ready to test:
testGetWikipediaArticles(); // Part A
testDisplayArticles(); // Part B

// Please do not modify the testGetWikipediaArticles() function
async function testGetWikipediaArticles() {
  const western = await getWikipediaArticle("Western Carolina University");
  const unca = await getWikipediaArticle("UNC Asheville");
  const app = await getWikipediaArticle("Appalachian State University");
  const charlotte = await getWikipediaArticle("UNC Charlotte");
  console.log(western);
  console.log(unca);
  console.log(app);
  console.log(charlotte);
  return [western, unca, app, charlotte];
}

// Please do not modify the testDisplayArticles() function
async function testDisplayArticles() {
  const container = document.querySelector("#wiki-previews");
  const pages = await testGetWikipediaArticles();
  pages.forEach((page) => {
    container.insertAdjacentHTML("beforeend", dataToHTML(page));
  });
}

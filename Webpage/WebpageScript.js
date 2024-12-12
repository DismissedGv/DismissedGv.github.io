//-----------------------------------------------------------------Searchbar
const htmlCardTemplate = document.querySelector("[data-card-template]")
const htmlCardContainer = document.querySelector("[data-cards-container]")
const searchInput = document.querySelector("[data-search]")

const htmlFiles = [
  { name: "Monobehaviour", content: "<p>This is the content of file1.html</p>", url: "cs/cs_monobehaviour.html" },
  { name: "Hashset", content: "<p>This is the content of file2.html</p>", url: "cs/cs_hashset.html" },
  // Add more HTML files to this array as needed
];

htmlFiles.forEach(file => {
  const card = htmlCardTemplate.content.cloneNode(true)
  const cardHeader = card.children[0].querySelector("[data-header]")
  const cardBody = card.children[0].querySelector("[data-body]")
  const cardLink = card.querySelector("a")
  console.log(cardLink)

  cardHeader.textContent = file.name
  cardBody.innerHTML = file.content
  cardLink.href = file.url
  
  htmlCardContainer.append(card)

  file.element = card
})

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  htmlFiles.forEach(file => {
    const isVisible = 
    file.name.toLowerCase().includes(value) || 
    file.content.toLowerCase().includes(value)
    file.element.classList.toggle("hide", !isVisible)
  })
})
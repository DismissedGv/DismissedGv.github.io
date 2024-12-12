//-----------------------------------------------------------------References
const htmlCardTemplate = document.querySelector("[data-card-template]")
const htmlCardContainer = document.querySelector("[data-cards-container]")
const searchInput = document.querySelector("[data-search]")

//-----------------------------------------------------------------Searchable Cards
const htmlFiles = [
  { name: "Monobehaviour", keywords: "C#", url: "cs/cs_monobehaviour.html" },
  { name: "List", keywords: "C#", url: "cs/cs_list.html" },
  { name: "Arrays", keywords: "C#", url: "cs/cs_arrays.html" },
  { name: "Dictionary", keywords: "", url: "cs/cs_dictionary.html" },
  { name: "Hashset", keywords: "C#", url: "cs/cs_hashset.html" },
  { name: "For Loop", keywords: "C#", url: "cs/cs_for_loop.html" },
  { name: "While Loop", keywords: "C#", url: "cs/cs_while_loop.html" },
  // Add more HTML files to this array as needed
];

//-----------------------------------------------------------------Add Cards
htmlFiles.forEach(file => {
  const card = htmlCardTemplate.content.cloneNode(true).children[0]
  const cardHeader = card.querySelector("[data-header]")
  const cardUrl = card.parentNode.querySelector("[data-url]")
  console.log(card)
  console.log(cardUrl)

  cardHeader.textContent = file.name
  cardUrl.href = file.url
  
  htmlCardContainer.append(card)

  file.element = card
})

//-----------------------------------------------------------------Search Input
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  htmlFiles.forEach(file => {
    const isVisible = 
    file.name.toLowerCase().includes(value) || 
    file.keywords.toLowerCase().includes(value)
    file.element.classList.toggle("hide", !isVisible)
  })
})
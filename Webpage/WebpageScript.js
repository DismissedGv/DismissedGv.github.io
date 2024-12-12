//-----------------------------------------------------------------References
const htmlCardTemplate = document.querySelector("[data-card-template]")
const htmlCardContainer = document.querySelector("[data-cards-container]")
const searchInput = document.querySelector("[data-search]")

//-----------------------------------------------------------------Searchable Cards
const htmlFiles = [
  { name: "Monobehaviour", content: "", url: "cs/cs_monobehaviour.html" },
  { name: "List", content: "", url: "cs/cs_list.html" },
  { name: "Arrays", content: "", url: "cs/cs_arrays.html" },
  { name: "Dictionary", content: "", url: "cs/cs_dictionary.html" },
  { name: "Hashset", content: "", url: "cs/cs_hashset.html" },
  { name: "For Loop", content: "", url: "cs/cs_for_loop.html" },
  { name: "While Loop", content: "", url: "cs/cs_while_loop.html" },
  // Add more HTML files to this array as needed
];

//-----------------------------------------------------------------Add Cards
htmlFiles.forEach(file => {
  const card = htmlCardTemplate.content.cloneNode(true).children[0]
  const cardHeader = card.querySelector("[data-header]")
  const cardBody = card.querySelector("[data-body]")
  const cardUrl = card.parentNode.querySelector("[data-url]")
  console.log(card)
  console.log(cardUrl)

  cardHeader.textContent = file.name
  cardBody.innerHTML = file.content
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
    file.content.toLowerCase().includes(value)
    file.element.classList.toggle("hide", !isVisible)
  })
})
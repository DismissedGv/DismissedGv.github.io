//-----------------------------------------------------------------for small screens
function openmenu()
{
    sidemenu.style.right = "0px";
}
function closemenu()
{
    sidemenu.style.right = "-200px";
}

//-----------------------------------------------------------------Navigation bar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height)
        {
            navLinks.forEach(links => {
                links.classList.remove('active-link');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active-link');
            });
        };
    });
};

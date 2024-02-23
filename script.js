var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname)
    {
        for(tablink of tablinks)
        {
            tablink.classList.remove("active-link");
        }
        for(tabcontent of tabcontents)
        {
            tabcontent.classList.remove("active-tab");
        }

        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

    var sidemenu = document.getElementById("sidemenu");

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
    let navLinks = document.querySelectorAll('header nav ul a');

    window.onscroll = () => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
    
        if(top >= offset && top < offset + height)
        {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav a[href*=' + id + ']').classList.add('active');
            })
        }
    }

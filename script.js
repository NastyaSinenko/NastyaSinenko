
let burgerName = "Стандарт";
let burgerImgSrc = "./image/burger.png";


document.querySelector(".content").innerHTML = `
  <div class="burger-card text-center">
    <h2>${burgerName}</h2>
    <img src="${burgerImgSrc}" alt="${burgerName}" class="img-fluid" style="max-width: 300px;">
  </div>
`;
import heroe from "./partials/heroes-module";

(async() => {
  await heroe();
  
  const grid = document.querySelector("#grid");
  const slider = document.querySelector("#slider");
  const dropdown = document.querySelector("#dropdown");

  let ul1 = content.lastElementChild.firstElementChild;
  ul1.setAttribute('class', 'ul');

  let div1 = document.createElement("div");
  div1.classList.add("hide");
  content.firstElementChild.append(div1);

  let input = document.createElement("input");
  input.id = "inp";
  input.type = "text";
  input.placeholder = "input";
  div1.append(input);

  let btn = document.createElement("input");
  btn.type = "button";
  btn.id = "btn";
  btn.value = "search";
  div1.append(btn);

  const text = document.createElement('p');
  text.classList.add("notFound","hide");
  text.innerHTML = "Not found";
  content.firstElementChild.append(text);

  const btnsSlider = document.createElement('div');
  btnsSlider.classList.add("hide");
  content.append(btnsSlider);

  const btnPrevious = document.createElement('button');
  btnPrevious.innerHTML = "<";
  btnsSlider.append(btnPrevious);

  const btnNext = document.createElement('button');
  btnNext.innerHTML = ">";
  btnsSlider.append(btnNext);

  const btnDropdown = document.createElement('button');
  btnDropdown.classList.add('hide', 'btnDropdown');
  document.querySelector('.ul').before(btnDropdown);

  let items = document.querySelectorAll(".ul div");

  function divAddClass(nameClass){
    for(let elem of items){
      elem.classList.add(nameClass)
    }
  }
  function divRemoveClass(...nameClass){
    for(let elem of items){
      elem.classList.remove(...nameClass)
    }
  }

  for (let elem of items){
    elem.classList.add('hide')
  }

  function reverseImgTxt () {
    for(let elem of items){
      let replacedNode = elem.replaceChild(elem.children[1], elem.children[0]);
      elem.append(replacedNode);
    }
  }

  //Реализация GRID
  grid.addEventListener("click", function(){
    if(ul1.firstElementChild.children[1].hasAttribute('src')){
      reverseImgTxt();
    };
    items.forEach(item => {
      item.removeEventListener('click', listener);
    })
    divRemoveClass("gridResult", "hide");
    text.classList.add('hide');
    div1.classList.remove("hide");
    div1.classList.add("div1");
    ul1.classList.remove('ul2', 'ul3');
    ul1.classList.add('ul1');
    btnsSlider.classList.add('hide');
    divForSlider.classList.remove('divForSlider');
    btnsSlider.classList.add('hide');
    btnsSlider.classList.remove("btnsSlider");
    btnDropdown.classList.add('hide');
    btnDropdown.classList.remove('div3');
  });

  input.addEventListener("input", function(){
    let value = this.value.trim();
    btn.addEventListener('click', function(){
      for(let elem of items){
        if(elem.lastElementChild.innerText.toLowerCase() != value.toLowerCase()){
          elem.classList.add("hide");
        }
        else{
          elem.classList.add("gridResult");
          elem.classList.remove("hide");
        }
      }
      if(Array.from(items).every(elem => elem.lastElementChild.innerText.toLowerCase() != value.toLowerCase())){
        text.classList.remove("hide");
      }
      else{
        text.classList.add("hide");
      }
      if(value == ''){
        for(let elem of items){
          elem.classList.remove("hide", "gridResult");
          text.classList.add("hide");
        }
      }
    })
  })

  //Реализация SLIDER
  let divForSlider = content.children[1];
  slider.addEventListener('click', function clickSlider(){
    if(ul1.firstElementChild.children[1].hasAttribute('src')){
      reverseImgTxt();
    };
    items.forEach(item => {
      item.removeEventListener('click', listener);
    })
    divRemoveClass("gridResult", "hide");
    btnsSlider.classList.remove('hide');
    text.classList.add('hide');
    div1.classList.remove('div1');
    div1.classList.add('hide');
    ul1.classList.remove('ul1', 'ul3');
    ul1.classList.add('ul2');
    divForSlider.classList.add('divForSlider');
    btnsSlider.classList.add("btnsSlider");
    btnDropdown.classList.add('hide');
    btnDropdown.classList.remove('div3');
  });

  let offset = 0;
  btnNext.addEventListener('click', () => {
    offset += items[0].clientWidth + 4;
    if(offset > (items[0].clientWidth + 4) * (items.length-1)){
      offset = 0;
    }
    document.querySelector('.ul2').style.left = -offset + "px";
  })
  btnPrevious.addEventListener('click', () => {
    offset -= items[0].clientWidth + 4;
    if(offset < 0){
      offset = (items[0].clientWidth + 4) * (items.length-1);
    }
    document.querySelector('.ul2').style.left = -offset + "px";
  })

  //Реализация DROPDOWN
  dropdown.addEventListener('click', () => {
    if(!ul1.firstElementChild.children[1].hasAttribute('src')){
      reverseImgTxt();
    };
    divRemoveClass("gridResult", "hide");
    divAddClass('hide');
    btnsSlider.classList.add('hide');
    text.classList.add('hide');
    div1.classList.remove('div1');
    div1.classList.add('hide');
    ul1.classList.remove('ul1','ul2', 'ul3');
    divForSlider.classList.remove('divForSlider');
    btnsSlider.classList.remove("btnsSlider");
    btnDropdown.classList.remove('hide');
    btnDropdown.innerHTML = 'Choose a hero';
    ul1.setAttribute('aria-expanded', 'false');
  });

  let listener = function(){
    btnDropdown.innerHTML = this.innerHTML;
    btnDropdown.classList.add('div3');
    ul1.classList.add('hide');
    btnDropdown.classList.remove('active');
    ul1.classList.remove('ul3');
  }

    btnDropdown.addEventListener('click', () => {
      ul1.classList.toggle('ul3');
      if(ul1.classList.contains('ul3')){
        btnDropdown.classList.add('active');
        ul1.classList.remove('hide');
      }else{
        btnDropdown.classList.remove('active');
      }

      items.forEach(item => {
        item.addEventListener('click', listener);
      })
    });

  document.addEventListener('click', (event) => {
    if (event.target !== btnDropdown) {
			ul1.classList.add('hide');
      btnDropdown.classList.remove('active');
      ul1.classList.remove('ul3')
		}
  })
})();
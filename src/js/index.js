/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
function getCanvas(){
  const canvas = document.querySelector('#draw');
  const context = canvas.getContext('2d');
  return {
    canvas,
    context,
  }
}
const framesContainer = [];
// ///////////////////////////////////////////////
// ///FRAME MANIPULATIONS/////
/* add frame */
function addFrame (){
  const dataURI = document.getElementById('draw').toDataURL('image/png', 1.0);
  document.getElementById('canvas-samples').src = dataURI;
  
};

/* delete a frame */
function deleteFrame() {
  const del = document.getElementById('canvas-samples');
  del.parentNode.removeChild(del);
};


/* drag and drop frame */
function dragAndDropFrame(){
  const  takeFrame = document.getElementById('canvas-samples');
  takeFrame.onmousedown = function(e) {
    const takeFrame = document.getElementById('canvas-samples');
    const coords = getCoords(takeFrame);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;
  
    takeFrame.style.position = 'absolute';
    document.body.appendChild(takeFrame);
    moveAt(e);
  
    takeFrame.style.zIndex = 1000;
  
    function moveAt(e) {
      takeFrame.style.left = `${e.pageX - shiftX  }px`;
      takeFrame.style.top = `${e.pageY - shiftY  }px`;
    }

    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    takeFrame.onmouseup = function() {
      document.onmousemove = null;
      takeFrame.onmouseup = null;
    };
  
  }
  takeFrame.ondragstart = function() {
    return false;
  };
};


// ////////////////////////
function duplF(){
  const  duplFrame = document.getElementById('dupl-container');
  duplFrame.onmousedown = function(e) {
    const coords = getCoords(duplFrame);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;
  
    duplFrame.style.position = 'absolute';
    document.body.appendChild(duplFrame);
    moveAt(e);
  
    duplFrame.style.zIndex = 1000;
  
    function moveAt(e) {
      duplFrame.style.left = `${e.pageX - shiftX  }px`;
      duplFrame.style.top = `${e.pageY - shiftY  }px`;
    }
  
    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    duplFrame.onmouseup = function() {
      document.onmousemove = null;
      duplFrame.onmouseup = null;
    };
  
  }
  
  duplFrame.ondragstart = function() {
    return false;
  };
  
  function getCoords(elem) {   
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
}

/* duplicate frame */
function duplicateFrame(){
  const dupl = document.getElementById('canvas-samples');
  const clone = dupl.cloneNode( false );
  document.getElementById('dupl-container').appendChild(clone);
  framesContainer.push(clone.src);
};

// ///////////////////////////////////////////////////
// ///ANIMATION MANIPULATION/////
/* start animation */
// ////////////////

let img_index = 0;
function change_image() {
  if(framesContainer.length){
    const imagesLength = framesContainer.length;
    const img = document.getElementById("myImg");
    img_index = ++img_index % imagesLength;
    img.src = framesContainer[img_index];
    
  }
  
}


function showNext(){
  let step = 1;
  function counter() {
      return step++;
  };
  return counter;
}
setInterval(change_image, 1000/showNext());


// /////////////////
/* full screen mode */
const elem = document.getElementById("myImg");

function openFullscreen(elem) {
  if(elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if(elem.webkitrequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if(elem.mozRequestFullscreen) {
    elem.mozRequestFullScreen();
  }
}
function Fullscreen(){
  openFullscreen(elem);
}
// //////////////////////////////////////////////////
window.onload = async function localStorageGet() {
  const canvasObject = getCanvas()
  const save = localStorage.getItem('save');
  const image = new Image(60, 45);
  image.src = save;
  await image.decode();
  canvasObject.context.drawImage(image, 0, 0);
};



// F's WHICH CHANGES THE SIZE OF CANVAS BY CLICK
function canvasSizeA() {
  const canvasObject = getCanvas()
  canvasObject.canvas = document.getElementById('draw');
  canvasObject.canvas.width = 64;
  canvasObject.canvas.height = 64;
  canvasObject.context.save();
}

canvasSizeA();
function canvasSizeB() {
  const canvasObject = getCanvas()
  canvasObject.canvas = document.getElementById('draw');
  canvasObject.canvas.width = 32;
  canvasObject.canvas.height = 32;
  canvasObject.context.save();
}
canvasSizeB();
function canvasSizeC() {
  const canvasObject = getCanvas()
  canvasObject.canvas = document.getElementById('draw');
  canvasObject.canvas.width = 128;
  canvasObject.canvas.height = 128;
  canvasObject.context.save();
}
canvasSizeC();
let currentColor = "black";
document.getElementById('colorpicker').addEventListener('change', function() {
    currentColor = this.value;
});
document.getElementById('bgcolorpicker').addEventListener('change', function() {
  const canvasObject = getCanvas()
  canvasObject.context.fillStyle = this.value;
  canvasObject.context.fillRect(0, 0, canvasObject.canvas.width, canvasObject.canvas.height);
   
    currentBg = canvasObject.context.fillStyle;
});
// // KEY's OF KEYBOARD BINDS
function kp (e) {
    if (e) keyCode = e.which
    else if (event) keyCode=event.keyCode
    else return 
    if(keyCode === 66) document.getElementById("bgcolorpicker").click() // B
    if(keyCode === 67) document.getElementById("colorpicker").click() // C
    if(keyCode === 65) document.getElementById("framesWork_add").click() // A
    if(keyCode === 68) document.getElementById("framesWork_delete").click() // D
    if(keyCode === 70) document.getElementById("framesWork_duplicate").click() // F
    if(keyCode === 82) document.getElementById("framesWork_eraser").click() // R
    if(keyCode === 84) document.getElementById("framesWork_stroke").click() // T
    if(keyCode === 49) document.getElementById("canvas-sizeB").click() // 1
    if(keyCode === 50) document.getElementById("canvas-sizeA").click() // 2
    if(keyCode === 51) document.getElementById("canvas-sizeC").click() // 3
    if(keyCode === 76) document.getElementById("drop-pen").click() // L
    if(keyCode === 52) document.getElementById("pen").click() // 4
    if(keyCode === 53) document.getElementById("pen-A").click() // 5
    if(keyCode === 54) document.getElementById("pen-B").click() // 6
    if(keyCode === 55) document.getElementById("pen-C").click() // 7

}
document.onkeypress=kp;
// /////////////////////////////////////////////////////////////



// //CONTROL BUTTONS/////
/* pen */
function pen() {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function () {;
    const sizeA = 1;
    const sizeB = 1;
    canvasObject.canvas.onmousemove = function  (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.fillRect (x-5, y-5, sizeA, sizeB);
        canvasObject.context.fillStyle = currentColor;
        canvasObject.context.fill ();
    }
    canvasObject.canvas.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.canvas.toDataURL());
        canvasObject.canvas.onmousemove = null;
    }
  }
 }
 function penA() {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function () {;
    const sizeA = 2;
    const sizeB = 2;
    canvasObject.canvas.onmousemove = function  (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.fillRect (x-5, y-5, sizeA, sizeB);
        canvasObject.context.fillStyle = currentColor;
        canvasObject.context.fill ();
    }
    canvasObject.canvas.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.canvas.toDataURL());
        canvasObject.canvas.onmousemove = null;
    }
  }
 }
 function penB() {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function () {;
    const sizeA = 3;
    const sizeB = 3;
    canvasObject.canvas.onmousemove = function  (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.fillRect (x-5, y-5, sizeA, sizeB);
        canvasObject.context.fillStyle = currentColor;
        canvasObject.context.fill ();
    }
    canvasObject.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.toDataURL());
        canvasObject.onmousemove = null;
    }
  }
 }
 function penC() {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function () {;
    const sizeA = 4;
    const sizeB = 4;
    canvasObject.canvas.onmousemove = function  (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.fillRect (x-5, y-5, sizeA, sizeB);
        canvasObject.context.fillStyle = currentColor;
        canvasObject.context.fill ();
    }
    canvasObject.canvas.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.canvas.toDataURL());
        canvasObject.canvas.onmousemove = null;
    }
  }
 }


/* eraser */ 
function eraser () {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function() {
    const sizeA = 5;
    const sizeB = 5;
    canvasObject.canvas.onmousemove = function (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.clearRect (x-5, y-5, sizeA, sizeB);
        canvasObject.context.fillStyle = currentColor;
        canvasObject.context.fill ();
    }
    canvasObject.canvas.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.canvas.toDataURL());
        canvasObject.canvas.onmousemove = null;
    }
  }
}
/* stroke */
function stroke () {
  const canvasObject = getCanvas()
  canvasObject.canvas.onmousedown = function() {
    canvasObject.canvas.onmousemove = function (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        canvasObject.context.beginPath();
        canvasObject.context.moveTo(x, y);
        canvasObject.context.lineTo(x*2, y*2);
        canvasObject.context.closePath();
        canvasObject.context.stroke();
        canvasObject.context.fillStyle = currentColor;
    }
    canvasObject.canvas.onmouseup = function () {
        localStorage.removeItem('save');
        localStorage.setItem('save', canvasObject.canvas.toDataURL());
        canvasObject.canvas.onmousemove = null;
    }
  }
}

// ///////////////////////////////////////////////////
// ///px of pen switch////////////////////////////////
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    const dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// //////////////////////

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Get array of all time blocks
  let hoursArr = document.getElementsByClassName("time-block");

  // Listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  //
  const saveItem = (event) => {    
    let block = {}

    if (event.target.classList[0] == 'btn') {
      block = event.target.parentElement;
    } else {
      block = event.target.parentElement.parentElement;
    }

    let item = block.childNodes[3].value;
    localStorage.setItem(block.id.toString(), item);

  }

  for(var i=0; i < hoursArr.length; i++) {
    hoursArr[i].lastElementChild.addEventListener("click",saveItem);
  };

  // Code to apply the past, present, or future class
  for(var i=0; i < hoursArr.length; i++) {
    let nowHour = dayjs().hour();
    let blockHour = Number(hoursArr[i].id.slice(5));
    if (blockHour<9) {
      blockHour = blockHour + 12
    }

    if (blockHour < nowHour) {
      hoursArr[i].classList.add("past")
    } else if (blockHour === nowHour) {
      hoursArr[i].classList.add("present")
    } else {
      hoursArr[i].classList.add("future")
    }
  }


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

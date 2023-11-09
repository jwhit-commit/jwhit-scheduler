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

  const renderItems = () => {
    for(var i=0; i < hoursArr.length; i++) {
      var item = localStorage.getItem(hoursArr[i].id);
    
      if (item) {
          hoursArr[i].childNodes[3].value = item
        }
  }
};

  renderItems();

  //
  // TODO: Add code to display the current date in the header of the page.
  const weekDay = () => {
    dayNum = dayjs().day();
    if (dayNum == 0) {
      return "Sunday"
    } else if (dayNum == 1) {
      return "Monday"
    } else if (dayNum == 2) {
      return "Tuesday"
    } else if (dayNum == 3) {
      return "Wednesday"
    } else if (dayNum == 4) {
      return "Thursday"
    } else if (dayNum == 5) {
      return "Friday"
    } else if (dayNum == 6) {
      return "Saturday"
    }
  };

  const month = () => {
    monNum = dayjs().month();
    if (monNum == 0) {
      return "January"
    } else if (monNum == 1) {
      return "February"
    } else if (monNum == 2) {
      return "March"
    } else if (monNum == 3) {
      return "April"
    } else if (monNum == 4) {
      return "May"
    } else if (monNum == 5) {
      return "June"
    } else if (monNum == 6) {
      return "July"
    } else if (monNum == 7) {
      return "August"
    } else if (monNum == 8) {
      return "September"
    } else if (monNum == 9) {
      return "October"
    } else if (monNum == 10) {
      return "November"
    } else if (monNum == 11) {
      return "December"
    }
  }

  document.getElementById("currentDay").textContent = weekDay().concat(", ",month()).concat(" ", dayjs().date());

});
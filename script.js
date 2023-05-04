const localeSettings = {};
dayjs.locale(localeSettings);
// Wait until the DOM is fully loaded before executing the code inside the function.
$(function () {
  // Get the current hour of the day 
  const currentHour = dayjs().format('H');
// The function below changes the color of each time block based on whether it's in the "past, present, or future" relative to the current hour.
function hourlyColor() {
  $('.time-block').each(function() {
    const blockHour = parseInt(this.id);
    $(this).toggleClass('past', blockHour < currentHour);
    $(this).toggleClass('present', blockHour === currentHour);
    $(this).toggleClass('future', blockHour > currentHour);
  });
}

  // Function to save the users input to localStorage
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  // Function to refresh color based on current time
  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to get user input from localStorage and set values for the block time
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  // Function to refresh time every second 
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  hourlyColor();
  textEntry();                
  refreshColor();

 
  setInterval(updateTime, 1000);
});
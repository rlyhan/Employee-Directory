
/* When ready, generate 12 random users through the Random User API */
$(document).ready(function() {
  for (let i = 0; i < 12; i++) {
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data) {
        displayEmployee(data, i);
      }
    });
  }
});

/* Creates HTML displaying an individual employee block, appends the HTML,
   calls a function to create an overlay displaying extra information, and
   adds a click event listener to the block that opens this overlay */
function displayEmployee(data, index) {
  // Build HTML string of employee's information
  var text = JSON.stringify(data);
  var imageHTML = '<div class="avatar"><img class="icon" ';
  var employeeDetailsHTML = '<div class="details"><div class="details-text">'
  var nameHTML = '';
  var emailHTML = '<h2>';
  var cityHTML = '<h2 style="text-transform: capitalize;">';
  var phoneHTML = '<h2>';
  var streetHTML = '<h2>';
  var dobHTML = '<h2>';
  var employeeDetails = JSON.parse(text, function (key, value) {
    if (key == 'large') {
      imageHTML += 'src="' + value + '"></div>';
    } else if (key == 'first') {
      nameHTML += value + ' ';
    } else if (key == 'last') {
      nameHTML += value;
    } else if (key == 'email') {
      if (value.length >= 32) {
        emailHTML = '<h2 style="font-size: 0.8em;">';
      }
      emailHTML += value + "</h2>";
    } else if (key == 'city') {
      cityHTML += value + "</h2>";
    } else if (key == 'cell') {
      phoneHTML += value + "</h2>";
    } else if (key == 'street') {
      streetHTML += value + "</h2>";
    }
  });
  if (nameHTML.length >= 17) {
    nameHTML = '<h1 style="font-size: 1.2em;">' + nameHTML + '</h1>';
  } else {
    nameHTML = '<h1>' + nameHTML + '</h1>';
  }
  var dob = JSON.parse(text).results[0]['dob']['date'];
  dobHTML += "Birthday: " + dob.substring(8, 10) + '/' + dob.substring(5, 7)
          + '/' + dob.substring(2, 4) + "</h3>";
  employeeDetailsHTML += nameHTML + emailHTML + cityHTML + '</div></div>';
  var employeeHTML = '<div class="employee">' + imageHTML + employeeDetailsHTML + '</div>';
  // Append HTML to employee list in current HTML
  $('#employee-list').append(employeeHTML);
  // Create an overlay displaying extra information about this employee
  // Pass in all employee HTML
  createOverlay(imageHTML, nameHTML, emailHTML, cityHTML, phoneHTML, streetHTML, dobHTML);
  // Add click event listener to this employee at given index which
  // displays more information about the employee
  var employees = document.getElementById('employee-list').children;
  employees[index].addEventListener('click', (e) => {
    showOverlay(index);
  });
  // Add click event listener to exit button for this employee's overlay
  // which exits out of the overlay
  var overlays = document.getElementById('overlay-list').children;
  var buttons = document.querySelectorAll('#button');
  buttons[index].addEventListener('click', (e) => {
    overlays[index].style.display = 'none';
  });
}

/* HTML is combined so image, name, email, city is in top half of overlay and
   phone, street and DOB are in bottom half of overlay, also creates
   an exit button */
function createOverlay(image, name, email, city, phone, street, dob) {
  // Create exit button
  var buttonHTML = '<div id="button">x</div>';
  // Create top half
  var topHTML = image + '<div class="basic">' + name + email + city + '</div>';
  // Create bottom half
  var bottomHTML = '<div class="extra">' + phone + street + dob + '</div>';
  // Combine all HTML into a div
  var employeeHTML = '<div class="employee-content">' + topHTML +
                 '<p></p>' + bottomHTML + '</div>';
  // Append the combined HTML into the overlay div
  $('#overlay-list').append('<div class="overlay"><div class="box">' +
                            buttonHTML + employeeHTML + '</div></div>');
}

/* Makes an employee at given index visible */
function showOverlay(index) {
  var overlays = document.getElementById('overlay-list').children;
  overlays[index].style.display = 'block';
}

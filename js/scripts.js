contacts = []

//backend logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
  this.index = contacts.length;
  contacts.push(this);
};

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
};

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
};

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

// function addAddress(aContact, anAddress) {
//   aContact.addresses.push(anAddress);
// };

//frontend logic
$(document).ready(function() {

  $("#add-address").click(function(){
    var addressDiv = ('<div class="new-address hide-me">' +
    '<div class="form-group">' +
    '<label for="new-street">Street</label>' +
    '<input type="text" class="form-control new-street">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="new-city">City</label>' +
    '<input type="text" class="form-control new-city">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="new-state">State</label>' +
    '<input type="text" class="form-control new-state">' +
    '</div>' +
    '</div>');
    $("#new-addresses").append(addressDiv);
  });

  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact (inputtedFirstName, inputtedLastName);
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      console.log(newAddress);
      newContact.addresses.push(newAddress);
      console.log(newContact);
      $(".hide-me").remove();
    });


    $("ul#contacts").append("<li><span id='"+newContact.index+"' class='contact'>" + newContact.fullName() + "</span></li>");

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $(".new-street").val("");
    $(".new-city").val("");
    $(".new-state").val("");

    $(".contact").last().click(function(){
      $("#show-contact").show();
      console.log(newContact);
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("#address-list").html(""); //keeps list from getting longer with every click
      newContact.addresses.forEach(function(address) {
        $("#address-list").append("<li>" + address.street + ", " + address.city + ", " + address.state + "</li>");
      });
    });
  });


});

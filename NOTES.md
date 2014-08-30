8/30/14 - approx video chapter 52

## Elements vs selectors

You can initialize Raphael by passing it either a DOM element that
should contain the paper OR by passing it a string that is the id for
the DOM element you want to contain the paper. Either should be fine
but you need to keep track of which you are using. In the videos,
James Shore chose to pass a DOM element. But I didn't see a lot of
point to that so I stuck with the original code that just passed the
string for the id. However, this means that I sometimes need to
convert from the id to a jQuery element using jQuery's $() function,
e.g. `var drawingArea = $('#'+drawingAreaId);`


    # Convert a vanilla DOM object to a jQuery object:
    var domObject = document.getElementById('mydiv');
    $(domObject);  // is now a jQuery object.

    # To get the DOM element from a jQuery element, you just need it's '0' attribute
    // next line returns only one element because selector is an id
    var jqElement = $('#selector');
    domObject1 = jqElement.get(0);
    domObject2 = jqElement[0];


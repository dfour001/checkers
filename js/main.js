// Globals

// Current player:
var currentPlayer = 'black';

// An object that keeps track of where each piece is on the board.
var locator;

// Objects that will hold game pieces and spaces
var board;
var spaces;
var pieces;

// Default zoom based on screen resolution, calculated after adding board
// to map in main().
var defaultZoom = 4;

function main() {
    // Set up game board
    board = boardcon.create_board(); // The map element
    spaces = boardcon.create_spaces(); // The spaces that pieces can be placed on

    spaces.addTo(board);
    board.fitExtent(spaces.getExtent(), -0.5);

    // Get default zoom.  Wait a little bit to make sure zoom animation has completed
    setTimeout(function () {
        defaultZoom = board.getZoom();
    }, 2000);

    ///////////////////
    // TEMP - DELETE //
    ///////////////////
    // These markers act as space labels and can be deleted later
    /*
    let midpointMarkers = new maptalks.VectorLayer('midpointMarkers');
    spaces.forEach(function (p) {
        if (p.black == true) {
            let midMarker = new maptalks.Marker([p.midpoint[0]-0.25, p.midpoint[1]], {
                symbol: {
                    'textFaceName': 'serif',
                    'textName': p.id,
                    'textFill': 'white',
                    'textHorizontalAlignment': 'right',
                    'textSize': 20
                }
            })

            midMarker.addTo(midpointMarkers);
        };
    })
    midpointMarkers.addTo(board);
    */
    //////////////
    // END TEMP //
    //////////////

    // Create locator.  This object keeps track of where each piece is on the board.
    locator = gamecon.create_locator();

    // Put pieces on the board
    pieces = boardcon.create_pieces(spaces);
    pieces.addTo(board);

}

$(document).ready(main());

// Globals

// Player names
var p1Name = 'Black Player';
var p2Name = 'Red Player';

// Current player:
//     true = black (p1)
//     false = red (p2)
var currentPlayer = true;



function main() {
    // Set up game board
    let board = boardcon.create_board(); // The map element
    let spaces = boardcon.create_spaces(); // The spaces that pieces can be placed on

    spaces.addTo(board);
    board.fitExtent(spaces.getExtent(), -0.5);

    let midpointMarkers = new maptalks.VectorLayer('midpointMarkers');
    spaces.forEach(function (p) {
        if (p.black == true) {
            let midMarker = new maptalks.Marker([p.midpoint[0]-0.25, p.midpoint[1]], {
                symbol: {
                    'textFaceName': 'serif',
                    'textName': p.location,
                    'textFill': 'white',
                    'textHorizontalAlignment': 'right',
                    'textSize': 20
                }
            })

            midMarker.addTo(midpointMarkers);
        };
    })
    midpointMarkers.addTo(board);

    // Put pieces on the board
    let pieces = boardcon.create_pieces();

    // Set up game controller

}

$(document).ready(main());

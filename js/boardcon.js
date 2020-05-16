// A collection of functions that controls the board

var boardcon = {
    // create_board() creates the "board" (a maptalks map object) that the game is played on.
    create_board: function () {
        let board = new maptalks.Map("board", {
            center: [0, 0],
            zoom: 4,
            pitch: 45
        });

        return board
    },

    // create_spaces() creates white and black polygons representing spaces on the board.
    // Each space includes the following attributes:
    //    id: (int) A unique id for each space
    //    midpoint: (coordinates) The coordinates for the midpoint of the space, used to place pieces
    //    black: (bool) Used to indicate if the space is black (true) or white (false)
    create_spaces: function () {
        let row = 1;
        let col = 1;

        // Create spaces layer
        let spaces = new maptalks.VectorLayer('spaces');

        // Space styles
        blackPolyStyle = {
            lineWidth: 0,
            polygonFill: 'rgb(5,5,5)'
        };

        whitePolyStyle = {
            lineWidth: 0,
            polygonFill: 'rgb(255,255,255)'
        };

        // Create spaces polygons
        let black = true;
        let id = 1;

        for (let rowI = 0; rowI < 9; rowI++) {
            for (let colI = 0; colI < 9; colI++) {
                let style = black ? blackPolyStyle : whitePolyStyle;
                let poly = new maptalks.Polygon([
                [
                    [col, row],
                    [col + 1, row],
                    [col + 1, row + 1],
                    [col, row + 1]
                ]
                ], {
                    symbol: style,
                    cursor: 'default'
                });

                // Set current space attributes
                poly.id = id;
                poly.location = [col, row]
                poly.midpoint = [col + 0.5, row + 0.5]
                poly.black = black;
                
                // Controls if the space is currently selectable for piece movement
                poly.selectable = false;
                
                // The source space ID that activated this space as selectable, ie the
                // piece located in the source space can potentially move to this space
                poly.sourceSpace;

                // Event listener
                poly.on('click', function () {
                    console.log(poly.id, poly.location, locator[poly.id]);
                })

                // Add space to spaces layer
                poly.addTo(spaces);

                // Prepare variables for next space
                black = !black;
                id++;
                col++;
            };

            // Return to the first column
            col = 1;
            // Move to next row
            row++;
        };



        return spaces
    },


    // create_pieces(spaces) creates the pieces, 12 for each player, and places them on the board
    // based on the information in the global locator object.
    create_pieces: function (spaces) {
        // Create vector layer to store pieces
        let pieces = new maptalks.VectorLayer('pieces', {
            enableAltitude: true
        });

        // Piece styles
        let blackStyle = {
            'lineColor': 'black',
            'lineWidth': 2,
            'polygonFill': 'rgb(40,40,40)',
            'polygonOpacity': 0.75
        }

        let redStyle = {
            'lineColor': 'black',
            'lineWidth': 2,
            'polygonFill': 'rgb(255,0,0)',
            'polygonOpacity': 0.75
        }

        // For each space, check if it is black and that it has a piece in the locator.
        // The check if the space should have a red or black piece, create the appropriate
        // piece, then add to the pieces vector layer.
        spaces.forEach(function (s) {
            if (s.black == true && locator[s.id] != undefined) {
                let color = locator[s.id];

                let style;
                if (color == 'black') {
                    style = blackStyle;
                } else {
                    style = redStyle;
                };



                let piece = new maptalks.Circle(s.midpoint, 40000, {
                    color: color,
                    symbol: style,
                    cursor: 'pointer',
                    properties: {
                        altitude: 10000
                    }
                });

                piece.locID = s.id;
                piece.on('click', function() {gamecon.find_valid_moves(piece.locID, spaces, color)});
                piece.addTo(pieces);
            };
        });

        return pieces
    }
};

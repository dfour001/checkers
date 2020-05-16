// A collection of functions that controls the flow of the game

var gamecon = {
    // Creates the object that keeps track of where each piece is on the board.
    // The create_locator function sets up the pieces to their default location.
    // The locator numbers represent the space polygon's id values.
    create_locator: function () {
        let locator = {
            1: 'black',
            3: 'black',
            5: 'black',
            7: 'black',
            9: 'black',
            11: 'black',
            13: 'black',
            15: 'black',
            17: 'black',
            19: 'black',
            21: 'black',
            23: 'black',
            25: 'black',
            27: 'black',
            29: null,
            31: null,
            33: 'red',
            35: null,
            37: null,
            39: null,
            41: null,
            43: null,
            45: null,
            47: null,
            49: null,
            51: null,
            53: null,
            55: 'red',
            57: 'red',
            59: 'red',
            61: 'red',
            63: 'red',
            65: 'red',
            67: 'red',
            69: 'red',
            71: 'red',
            73: 'red',
            75: 'red',
            77: 'red',
            79: 'red',
            81: 'red'
        };

        return locator
    },

    find_valid_moves: function (locID, spaces, color, isKing = false) {
        let oppositeColor;
        if (color == "black") {
            oppositeColor = "red";
        } else {
            oppositeColor = "black";
        };


        function get_space_coordinates(locID, spaces) {
            let locCoord;
            spaces.forEach(function (s) {
                if (s.id == locID) {
                    locCoord = s.location;
                };
            });

            return locCoord
        };


        function get_space_id(locCoord, spaces) {
            let locID;

            spaces.forEach(function (s) {
                if (s.location[0] == locCoord[0] && s.location[1] == locCoord[1]) {
                    locID = s.id;
                }
            })

            return locID;
        };


        function find_potential_moves(coords) {
            // Spaces that can potentially be moved to in the following format:
            // [space ID that piece can move to, space ID that is jumped over (or null)]
            // Invalid moves are null (space occupied) or undefined (off the board)
            let potentialMoves = {
                upperLeft: [null, null],
                upperRight: [null, null],
                lowerLeft: [null, null],
                lowerRight: [null, null]
            };


            // Find upper-left move
            if (color == 'black' || isKing) {
                let upperLeft = get_space_id([curCoords[0] - 1, curCoords[1] + 1], spaces);
                if (locator[upperLeft] == null) {
                    potentialMoves.upperLeft = [upperLeft, null];
                };

                // Check for jump opportunity
                if (locator[upperLeft] == oppositeColor) {
                    let upperLeftJump = get_space_id([curCoords[0] - 2, curCoords[1] + 2], spaces);
                    if (locator[upperLeftJump] == null) {
                        potentialMoves.upperLeft = [upperLeftJump, upperLeft];
                    };
                };
            };

            // Find upper-right move
            if (color == 'black' || isKing) {
                let upperRight = get_space_id([curCoords[0] + 1, curCoords[1] + 1], spaces);
                if (locator[upperRight] == null) {
                    potentialMoves.upperRight = [upperRight, null];
                };
                
                // Check for jump opportunity
                if (locator[upperRight] == oppositeColor) {
                    let upperRightJump = get_space_id([curCoords[0] + 2, curCoords[1] + 2], spaces);
                    if (locator[upperRightJump] == null) {
                        potentialMoves.upperRight = [upperRightJump, upperRight];
                    };
                };
            };

            // Find lower-left move
            if (color == 'red' || isKing) {
                let lowerLeft = get_space_id([curCoords[0] - 1, curCoords[1] - 1], spaces);
                if (locator[lowerLeft] == null) {
                    potentialMoves.lowerLeft = [lowerLeft, null];
                };
                
                // Check for jump opportunity
                if (locator[lowerLeft] == oppositeColor) {
                    let lowerLeftJump = get_space_id([curCoords[0] - 2, curCoords[1] - 2], spaces);
                    if (locator[lowerLeftJump] == null) {
                        potentialMoves.lowerLeft = [lowerLeftJump, lowerLeft];
                    };
                };
            };

            // Find lower-right move
            if (color == 'red' || isKing) {
                let lowerRight = get_space_id([curCoords[0] + 1, curCoords[1] - 1], spaces);
                if (locator[lowerRight] == null) {
                    potentialMoves.lowerRight = [lowerRight, null];
                };
                
                // Check for jump opportunity
                if (locator[lowerRight] == oppositeColor) {
                    let lowerRightJump = get_space_id([curCoords[0] - 2, curCoords[1] - 2], spaces);
                    if (locator[lowerRightJump] == null) {
                        potentialMoves.lowerRight = [lowerRightJump, lowerRight];
                    };
                };
            };

            return potentialMoves
        }

        function set_spaces_selectable(spaces, potentialMoves) {
            spaces.forEach(function (s) {
                s.updateSymbol({
                    lineWidth: 0
                });

                s.options.cursor = 'default'
                if (s.id == potentialMoves.lowerLeft[0] || s.id == potentialMoves.lowerRight[0] || s.id == potentialMoves.upperLeft[0] || s.id == potentialMoves.upperRight[0]) {
                    s.updateSymbol({
                        lineWidth: 5,
                        lineColor: 'red'
                    });

                    s.options.cursor = 'pointer'

                    s.sourceSpace = locID;
                    s.selectable = true;

                };
            });
        };

        // Coordinates of the space that the piece is currently
        // located in
        let curCoords = get_space_coordinates(locID, spaces);

        let potentialMoves = find_potential_moves(curCoords);

        set_spaces_selectable(spaces, potentialMoves);



    }
}

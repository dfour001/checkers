// A collection of functions that controls the flow of the game

var gamecon = {

    // create_locator()
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
            33: null,
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

            console.log(coords);

            // Find upper-left move
            if (color == 'black' || isKing) {
                let upperLeft = gamecon.get_space_id([curCoords[0] - 1, curCoords[1] + 1], spaces);
                if (locator[upperLeft] == null) {
                    potentialMoves.upperLeft = [upperLeft, null];
                };

                // Check for jump opportunity
                if (locator[upperLeft] == oppositeColor) {
                    let upperLeftJump = gamecon.get_space_id([curCoords[0] - 2, curCoords[1] + 2], spaces);
                    if (locator[upperLeftJump] == null) {
                        potentialMoves.upperLeft = [upperLeftJump, upperLeft];
                    };
                };
            };

            // Find upper-right move
            if (color == 'black' || isKing) {
                let upperRight = gamecon.get_space_id([curCoords[0] + 1, curCoords[1] + 1], spaces);
                if (locator[upperRight] == null) {
                    potentialMoves.upperRight = [upperRight, null];
                };

                // Check for jump opportunity
                if (locator[upperRight] == oppositeColor) {
                    let upperRightJump = gamecon.get_space_id([curCoords[0] + 2, curCoords[1] + 2], spaces);
                    if (locator[upperRightJump] == null) {
                        potentialMoves.upperRight = [upperRightJump, upperRight];
                    };
                };
            };

            // Find lower-left move
            if (color == 'red' || isKing) {
                let lowerLeft = gamecon.get_space_id([curCoords[0] - 1, curCoords[1] - 1], spaces);
                if (locator[lowerLeft] == null) {
                    potentialMoves.lowerLeft = [lowerLeft, null];
                };

                // Check for jump opportunity
                if (locator[lowerLeft] == oppositeColor) {
                    let lowerLeftJump = gamecon.get_space_id([curCoords[0] - 2, curCoords[1] - 2], spaces);
                    if (locator[lowerLeftJump] == null) {
                        potentialMoves.lowerLeft = [lowerLeftJump, lowerLeft];
                    };
                };
            };

            // Find lower-right move
            if (color == 'red' || isKing) {
                let lowerRight = gamecon.get_space_id([curCoords[0] + 1, curCoords[1] - 1], spaces);
                if (locator[lowerRight] == null) {
                    potentialMoves.lowerRight = [lowerRight, null];
                };

                // Check for jump opportunity
                if (locator[lowerRight] == oppositeColor) {
                    let lowerRightJump = gamecon.get_space_id([curCoords[0] + 2, curCoords[1] - 2], spaces);
                    if (locator[lowerRightJump] == null) {
                        potentialMoves.lowerRight = [lowerRightJump, lowerRight];
                    };
                };
            };

            return potentialMoves
        }



        // Coordinates of the space that the piece is currently
        // located in
        let curCoords = gamecon.get_space_coordinates(locID, spaces);

        let potentialMoves = find_potential_moves(curCoords);

        return potentialMoves
    },


    get_space_coordinates: function (locID, spaces) {
        let locCoord;
        spaces.forEach(function (s) {
            if (s.id == locID) {
                locCoord = s.location;
            };
        });

        return locCoord
    },


    get_space_id: function (locCoord, spaces) {
        let locID;

        spaces.forEach(function (s) {
            if (s.location[0] == locCoord[0] && s.location[1] == locCoord[1]) {
                locID = s.id;
            }
        })

        return locID;
    },

    get_piece_by_locID: function (locID) {
        let output;

        pieces.forEach(function (p) {
            if (p.locID == locID) {
                output = p;
            };
        })

        console.log(output);

        return output
    },

    reset_spaces: function (spaces) {
        spaces.forEach(function (s) {
            s.updateSymbol({
                lineWidth: 0
            });

            s.setZIndex(0);
            s.options.cursor = 'default';
            s.sourceSpace = null;
            s.selectable = false;
            s.jumpSpace = null;

        });
    },


    set_spaces_selectable: function (spaces, potentialMoves, locID) {
        // Reset each space to default
        gamecon.reset_spaces(spaces);

        // Set selectable spaces to selectable
        spaces.forEach(function (s) {
            if (s.id == potentialMoves.lowerLeft[0] || s.id == potentialMoves.lowerRight[0] || s.id == potentialMoves.upperLeft[0] || s.id == potentialMoves.upperRight[0]) {
                s.updateSymbol({
                    lineWidth: 5,
                    lineColor: 'red'
                });

                s.options.cursor = 'pointer'
                s.setZIndex(1);
                s.sourceSpace = locID;
                s.selectable = true;

            };
        });

        // Set selectable spaces as jumpable if they are a jumping move
        for (move in potentialMoves) {
            if (potentialMoves[move][1] != null) {
                spaces.forEach(function (s) {
                    if (s.id == potentialMoves[move][0]) {
                        s.jumpSpace = potentialMoves[move][1];
                    }
                })
            }
        }
    },

    end_turn: function () {
        if (currentPlayer == 'black') {
            currentPlayer = 'red';
        } else {
            currentPlayer = 'black';
        };

        // Set piece cursors for the correct player
        pieces.forEach(function (p) {
            if (currentPlayer == p.options.color) {
                p.options.cursor = 'pointer';
            } else {
                p.options.cursor = 'default';
            }
        })
    },

    move_piece: function (piece, sourceSpace, targetSpace, targetCoords, jumpSpace) {
        // Move marker from source space coordinates to target space coordinates
        //piece.setCoordinates(targetCoords);

        let sourceCoords = gamecon.get_space_coordinates(sourceSpace, spaces);

        let xOffset = targetCoords[0] - (sourceCoords[0] + 0.5); // Add 0.5 to get midpoint
        let yOffset = targetCoords[1] - (sourceCoords[1] + 0.5); // Add 0.5 to get midpoint
        console.log([xOffset, yOffset]);
        piece.animate({
            translate: [xOffset, yOffset]
        }, {
            duration: 500,
            easing: 'inAndOut'
        });


        // Change locator[sourceSpace] to null
        locator[sourceSpace] = null;

        // Change locator[targetSpace] to piece color
        locator[targetSpace] = piece.options.color;

        // Update piece locID
        piece.locID = targetSpace;

        if (jumpSpace != null) {
            // If jumping, remove piece in jumpSpace coordinates
            let jumpPiece = gamecon.get_piece_by_locID(jumpSpace);

            // If jumping, set locator[jumpSpace] to null
            //jumpPiece.remove();
            jumpPiece.animate({
                    symbol: {
                        polygonOpacity: 0
                    }
                }, {
                    duration: 250,
                    easing: 'inAndOut'
                },
                function (frame) {
                    if (frame.state.playState === 'finished') {
                        jumpPiece.remove();
                    }
                });
        locator[jumpSpace] = null;
    };

    // Reset spaces to unselectable
    gamecon.reset_spaces(spaces);
        
    // Check if piece is now king
        console.log(piece.isKing, piece.options.color, targetCoords[1]);
    if (!piece.isKing && piece.options.color == 'black' && targetCoords[1] == 9.5) {
        alert('King me!');
        piece.isKing = true;
        piece.updateSymbol( {
            lineColor: 'rgb(255,255,255)'
        });
    };
        
    if (!piece.isKing && piece.options.color == 'red' && targetCoords[1] == 1.5) {
        alert('King me!');
        piece.isKing = true;
        piece.updateSymbol( {
            lineColor: 'rgb(255,255,255)'
        });
    };

    // Check if turn is done


    // Change turn
    gamecon.end_turn();
    console.log("Done");
}
}

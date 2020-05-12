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
    }
}

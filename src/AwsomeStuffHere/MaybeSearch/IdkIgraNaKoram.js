import { useEffect, useState, Component } from "react"
import "./IdkCSS.css";

export default function IdkIgraNaKoram() {

    const [isOpen, setIsOpen] = useState(false);
    const [gameTiles, setGameTiles] = useState(gameArr)
    const [isPlayerOneTurn, setPlayerOneTurn] = useState(true)
    const [turnsRemaining, setTurnsRemaining] = useState({ playerOne: 9, playerTwo: 9 })
    const [millActive, setMillActive] = useState(false)
    const [indexesInMill, setIndexesInMill] = useState([])

    let gameTileGroups = []
    let draggables = [0, 0]
    const verticalMillIndexes = [0, 9, 21, 3, 10, 18, 6, 11, 15, 1, 4, 7, 16, 19, 22, 8, 12, 17, 5, 13, 20, 2, 14, 23]

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1000px',
            marginBottom: 30
        },
        button: {
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'background-color 0.2s ease'
        },
        buttonHover: {
            backgroundColor: '#2563eb'
        },
        drawerWrapper: {
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '6px',
        },
        drawer: {
            width: '100%',
            backgroundColor: 'white',
            transition: 'max-height 0.3s ease-in-out',
            maxHeight: isOpen ? '1000px' : '0px',
            overflow: 'hidden'
        },
        content: {
            display: 'flex',
            gap: 50,
            padding: '16px'
        },
    };

    useEffect(() => {
        setActiveMillGroups(gameTiles)
        isGameFinished()
    })

    const handleMakred = (id, color) => {
        if (!millActive) {
            if (turnsRemaining.playerOne >= 0 && turnsRemaining.playerTwo > 0 && color === "white") {
                setGameTiles(prevTiles => {
                    return prevTiles.map((tile) => {
                        if (isPlayerOneTurn)
                            return tile.id === id ? { ...tile, backgroundColor: "black" } : tile
                        else
                            return tile.id === id ? { ...tile, backgroundColor: "lightgray" } : tile
                    })
                })
                setPlayerOneTurn(prevState => !prevState)
                setTurnsRemaining(prevState => {
                    return isPlayerOneTurn ? { ...prevState, playerOne: prevState.playerOne - 1 } : { ...prevState, playerTwo: prevState.playerTwo - 1 }
                })
            }
        }
        else {
            setIndexesInMill(getAllIndexesInMill())
            if ((!isPlayerOneTurn && color === "lightgray") || (isPlayerOneTurn && color === "black")) {
                if (!indexesInMill.includes(id)) {
                    setGameTiles(prevTiles => {
                        return prevTiles.map((tile) => {
                            return tile.id === id ? { ...tile, backgroundColor: "white" } : tile
                        })
                    })
                    setMillActive(false)
                }
            }
        }
    }

    const getCurrentTile = (id) => {
        const currentTile = gameTiles.filter(tile => tile.id === id)
        return currentTile[0]
    }

    function setGameTileGroups(gameTiles) {
        let localGameTileGroups = []
        let verticalSortingArray = []

        //horizontal group of mills
        for (let i = 0; i < gameTiles.length; i += 3) {
            localGameTileGroups.push(gameTiles.slice(i, i + 3));
        }

        //vertical group of mills
        for (let i = 0; i < verticalMillIndexes.length; i++) {
            verticalSortingArray.push(gameTiles.at(verticalMillIndexes[i]))
        }
        for (let i = 0; i < verticalSortingArray.length; i += 3) {
            localGameTileGroups.push(verticalSortingArray.slice(i, i + 3))
        }

        return localGameTileGroups
    }

    const setActiveMillGroups = (gameTiles) => {
        gameTileGroups = setGameTileGroups(gameTiles)
        gameTileGroups.map((tileGroup, index) => {
            const flag = []
            flag[0] = tileGroup.every((tile) => tile.backgroundColor === "black")
            flag[1] = tileGroup.every((tile) => tile.backgroundColor === "lightgray")

            if (!flag[0] && !flag[1]) {
                activeMillGroups[index].hasMill = false
            }

            else if ((flag[0] || flag[1]) && !activeMillGroups[index].hasMill) {
                console.log(isPlayerOneTurn ? "Player two has MILL" : "Player one has MILL")
                setMillActive(true)
                activeMillGroups[index].hasMill = true
            }
        })
    }

    const getAllIndexesInMill = () => {
        const localIndexesInMill = []
        gameTileGroups.map((tileGroup, index) => {
            if (activeMillGroups[index].hasMill) {
                tileGroup.forEach(tile => localIndexesInMill.push(tile.id))
            }
        })
        return localIndexesInMill
    }

    const dragInitialElement = (id) => {
        draggables[0] = id
    }

    const dragLastElementEntered = (id) => {
        draggables[1] = id
    }

    const dragFinished = () => {
        setIndexesInMill(getAllIndexesInMill())
        const [fromTileId, toTileId] = draggables

        if ((isPlayerOneTurn && getNumberOfTilesOnBoard()[0] < 4) || (!isPlayerOneTurn && getNumberOfTilesOnBoard()[1] < 4) || dragableToIndexes[fromTileId].find(element => element === toTileId) !== undefined) {
            if (((!isPlayerOneTurn && getCurrentTile(fromTileId).backgroundColor === "lightgray") || (isPlayerOneTurn && getCurrentTile(fromTileId).backgroundColor === "black")) && getCurrentTile(toTileId).backgroundColor === "white") {
                setPlayerOneTurn(prevState => !prevState)
                setGameTiles(prevTiles => {
                    return prevTiles.map((tile) => {
                        if (isPlayerOneTurn)
                            return tile.id === toTileId ? { ...tile, backgroundColor: "black" } : tile
                        else
                            return tile.id === toTileId ? { ...tile, backgroundColor: "lightgray" } : tile
                    })
                })
                setGameTiles(prevTiles => {
                    return prevTiles.map((tile) => {
                        return tile.id === fromTileId ? { ...tile, backgroundColor: "white" } : tile
                    })
                })
            }
        }
    }

    const getNumberOfTilesOnBoard = () => {
        const numberOfTiles = [0, 0]
        if (turnsRemaining.playerOne === 0 && turnsRemaining.playerTwo === 0) {
            gameTiles.map((tile) => {
                if (tile.backgroundColor === "black") {
                    numberOfTiles[0] += 1
                }
                if (tile.backgroundColor === "lightgray") {
                    numberOfTiles[1] += 1
                }
            })
        }
        return numberOfTiles
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const isGameFinished = () => {
        const [blackNumberOfTiles, lightgrayNumberOfTiles] = getNumberOfTilesOnBoard()
        if (blackNumberOfTiles === 2) window.location.href = 'https://stock.adobe.com/search?filters%5Bcontent_type%3Aphoto%5D=1&filters%5Bcontent_type%3Aillustration%5D=1&filters%5Bcontent_type%3Azip_vector%5D=1&filters%5Bcontent_type%3Avideo%5D=1&filters%5Bcontent_type%3Atemplate%5D=1&filters%5Bcontent_type%3A3d%5D=1&filters%5Bcontent_type%3Aimage%5D=1&k=muscular+white+man&order=relevance&search_page=1&search_type=usertyped&acp=&aco=muscular+white+man&get_facets=0';
        else if (lightgrayNumberOfTiles === 2) window.location.href = 'https://stock.adobe.com/search?k=muscular+black+man';
    }

    const renderGameTiles = gameTiles.map((tile) => {
        return <GameTile key={tile.id}
            tile={tile}
            isPlayerOneTurn={isPlayerOneTurn}
            turnsRemaining={turnsRemaining}
            millActive={millActive}
            indexesInMill={indexesInMill}
            mark={handleMakred}
            dragInitialElement={dragInitialElement}
            dragLastElementEntered={dragLastElementEntered}
            dragFinished={dragFinished} />
    })

    return (
        <div style={styles.container}>
            <button
                className="gay-button"
                onClick={toggleDrawer}
            >
                {isOpen ? 'Затвори 😔' : 'Или тук 🥺'}
            </button>

            <div style={styles.drawerWrapper}>
                <div style={styles.drawer}>
                    <div style={styles.content}>
                        <Counter turnsRemaining={turnsRemaining} />
                        <div className='template'>
                            {renderGameTiles}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class GameTile extends Component {

    shouldComponentUpdate(nextProps) {

        if (nextProps.millActive || this.props.millActive)
            return true
        if (nextProps.turnsRemaining.playerOne === 0 && nextProps.turnsRemaining.playerTwo === 0)
            return true
        if (this.props.tile.backgroundColor === nextProps.tile.backgroundColor)
            return false
        else
            return true
    }

    render() {

        let gameTileStyle = {
            border: "4px solid transparent",
            borderImage: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
            borderImageSlice: 1,
            height: "20px",
            width: "20px",
            borderRadius: '50%',
            margin: "35px",
            gridArea: `item${this.props.tile.id}`,
        }

        let duplicateTileStyle = {
            border: "none",
            width: '45px',
            height: '45px',
            backgroundColor: "transparent",
            borderRadius: "50%",
            margin: "22.5px",
            gridArea: `item${this.props.tile.id}`,
            transform: "translate(-35px, -35px)",
            position: "absolute",
        }

        let horizontalLines = {
            height: '2px',
            width: "46px",
            background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
            marginLeft: "34px",
            transform: "translate(0, 10px)",
        }

        let verticalLines = {
            width: "2px",
            height: "46px",
            marginTop: "34px",
            transform: "translate(10px, 0)",
            background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
        }

        switch (this.props.tile.id) {
            case 0: case 1: case 21: case 22:
                horizontalLines = { ...horizontalLines, width: "232px" }
                break;
            case 3: case 4: case 18: case 19:
                horizontalLines = { ...horizontalLines, width: "140px" }
                break;
            case 2: case 5: case 8: case 11: case 14: case 17: case 20: case 23:
                horizontalLines = {}
                break;
            default:
                horizontalLines = { ...horizontalLines }
        }

        switch (this.props.tile.id) {
            case 0: case 2: case 9: case 14:
                verticalLines = { ...verticalLines, height: "232px" }
                break;
            case 3: case 5: case 10: case 13:
                verticalLines = { ...verticalLines, height: "140px" }
                break;
            case 7: case 15: case 17: case 18: case 20: case 21: case 22: case 23:
                verticalLines = {}
                break;
            default:
                verticalLines = { ...verticalLines }
        }

        if (this.props.tile.backgroundColor === "black" || this.props.tile.backgroundColor === "lightgray") {
            duplicateTileStyle = { ...duplicateTileStyle, backgroundColor: this.props.tile.backgroundColor }
        }

        if (!this.props.millActive && this.props.turnsRemaining.playerOne === 0 && this.props.turnsRemaining.playerTwo === 0 && ((this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "black") || (!this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "lightgray"))) {
            duplicateTileStyle = { ...duplicateTileStyle, width: "41px", height: "41px", border: "4px solid green" }
        }

        if (this.props.millActive && !this.props.indexesInMill.includes(this.props.tile.id) && ((this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "black") || (!this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "lightgray"))) {
            duplicateTileStyle = { ...duplicateTileStyle, width: "41px", height: "41px", border: "4px solid red" }
        }

        return (
            <div style={gameTileStyle} onClick={() => this.props.mark(this.props.tile.id, this.props.tile.backgroundColor)}>
                <div style={duplicateTileStyle}
                    draggable={!this.props.millActive && this.props.turnsRemaining.playerOne === 0 && this.props.turnsRemaining.playerTwo === 0 && ((this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "black") || (!this.props.isPlayerOneTurn && this.props.tile.backgroundColor === "lightgray"))}
                    onDragStart={() => this.props.dragInitialElement(this.props.tile.id)}
                    onDragEnter={() => this.props.dragLastElementEntered(this.props.tile.id)}
                    onDragEnd={() => this.props.dragFinished()} />
                <div style={horizontalLines} />
                <div style={verticalLines} />
            </div>
        )
    }
}

function Counter(props) {
    return (

        <div style={{color: '#FF1493', fontSize: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> Оставащи ходове:
            <div style={{ marginTop: "10px" }}>
                <div>Черен: {props.turnsRemaining.playerOne}</div>
                <div>Бял: {props.turnsRemaining.playerTwo}</div>
                <button className="fancy-button" style={{ width: 100, height: 50, fontSize: 15, padding: 0 }} onClick={() => window.location.reload(false)}>Нова игра</button>
            </div>
        </div>

    )
}

const gameArr = [
    { id: 0, backgroundColor: "white" },
    { id: 1, backgroundColor: "white" },
    { id: 2, backgroundColor: "white" },
    { id: 3, backgroundColor: "white" },
    { id: 4, backgroundColor: "white" },
    { id: 5, backgroundColor: "white" },
    { id: 6, backgroundColor: "white" },
    { id: 7, backgroundColor: "white" },
    { id: 8, backgroundColor: "white" },
    { id: 9, backgroundColor: "white" },
    { id: 10, backgroundColor: "white" },
    { id: 11, backgroundColor: "white" },
    { id: 12, backgroundColor: "white" },
    { id: 13, backgroundColor: "white" },
    { id: 14, backgroundColor: "white" },
    { id: 15, backgroundColor: "white" },
    { id: 16, backgroundColor: "white" },
    { id: 17, backgroundColor: "white" },
    { id: 18, backgroundColor: "white" },
    { id: 19, backgroundColor: "white" },
    { id: 20, backgroundColor: "white" },
    { id: 21, backgroundColor: "white" },
    { id: 22, backgroundColor: "white" },
    { id: 23, backgroundColor: "white" },
]

const activeMillGroups = [
    { id: 0, hasMill: false },
    { id: 1, hasMill: false },
    { id: 2, hasMill: false },
    { id: 3, hasMill: false },
    { id: 4, hasMill: false },
    { id: 5, hasMill: false },
    { id: 6, hasMill: false },
    { id: 7, hasMill: false },
    { id: 8, hasMill: false },
    { id: 9, hasMill: false },
    { id: 10, hasMill: false },
    { id: 11, hasMill: false },
    { id: 12, hasMill: false },
    { id: 13, hasMill: false },
    { id: 14, hasMill: false },
    { id: 15, hasMill: false },
]

const dragableToIndexes = [
    [1, 9],
    [0, 2, 4],
    [1, 14],
    [3, 10],
    [1, 3, 5, 7],
    [4, 13],
    [7, 11],
    [4, 6, 8],
    [7, 12],
    [0, 10, 21],
    [3, 9, 11, 18],
    [6, 10, 15],
    [8, 13, 17],
    [5, 12, 14, 20],
    [2, 13, 23],
    [11, 16],
    [15, 17, 19],
    [12, 16],
    [10, 19],
    [16, 18, 20, 22],
    [13, 19],
    [9, 22],
    [19, 21, 23],
    [14, 22]
];
